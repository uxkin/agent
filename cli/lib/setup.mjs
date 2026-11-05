import { execFile } from "node:child_process";
import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { promisify } from "node:util";

import { MCP_URL } from "./auth.mjs";
import { UserError, bold, confirm, dim, fail, ok, skip } from "./ui.mjs";

const execFileAsync = promisify(execFile);
// npm-installed commands are .cmd files on Windows, which need a shell.
// The arguments passed here have no spaces or quotes.
const run = (command, args) => execFileAsync(command, args, { shell: process.platform === "win32" });
const home = homedir();

// ~/.cursor/mcp.json instead of the full path, to keep lines short.
const tilde = (path) => (path.startsWith(home) ? `~${path.slice(home.length)}` : path);

const exists = (path) =>
  access(path).then(
    () => true,
    () => false,
  );

async function hasCommand(command) {
  try {
    await execFileAsync(process.platform === "win32" ? "where" : "which", [command]);
    return true;
  } catch {
    return false;
  }
}

function vscodeUserDir() {
  if (process.platform === "darwin") return join(home, "Library", "Application Support", "Code", "User");
  if (process.platform === "win32") return join(process.env.APPDATA || join(home, "AppData", "Roaming"), "Code", "User");
  return join(process.env.XDG_CONFIG_HOME || join(home, ".config"), "Code", "User");
}

/*
 * A JSON settings file that lists MCP servers under one key. UXKIN is
 * added under that key and nothing else is touched. A file that isn't
 * plain JSON (comments, trailing commas) is left alone, with the lines
 * to add shown instead. The original is kept next to it the first time.
 */
function jsonTarget({ id, name, file, detect, key, entry, signIn }) {
  return {
    id,
    name,
    signIn,
    where: tilde(file),
    detect,
    async connected() {
      const text = await readFile(file, "utf8").catch(() => "");
      try {
        return Boolean((text.trim() ? JSON.parse(text) : {})?.[key]?.uxkin);
      } catch {
        return /"uxkin"\s*:/.test(text);
      }
    },
    async connect() {
      let config = {};
      if (await exists(file)) {
        try {
          config = await readJson(file);
        } catch {
          throw new UserError(
            `${tilde(file)} has comments or isn't plain JSON, so it was left untouched. Add this under "${key}":\n` +
              JSON.stringify({ uxkin: entry }, null, 2),
          );
        }
        if (config === null || typeof config !== "object" || Array.isArray(config)) {
          throw new UserError(`${tilde(file)} isn't a settings object, so it was left untouched.`);
        }
        const backup = `${file}.uxkin-backup`;
        if (!(await exists(backup))) await copyFile(file, backup);
      }
      const servers = config[key] && typeof config[key] === "object" ? config[key] : {};
      config[key] = { ...servers, uxkin: entry };
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, `${JSON.stringify(config, null, 2)}\n`);
    },
  };
}

async function readJson(file) {
  const text = await readFile(file, "utf8");
  return text.trim() ? JSON.parse(text) : {};
}

const TARGETS = [
  {
    id: "claude-code",
    name: "Claude Code",
    where: "claude mcp add (your user settings)",
    signIn: "In Claude Code, type /mcp, choose uxkin and sign in.",
    detect: () => hasCommand("claude"),
    async connected() {
      try {
        await run("claude", ["mcp", "get", "uxkin"]);
        return true;
      } catch {
        return false;
      }
    },
    async connect() {
      await run("claude", ["mcp", "add", "--scope", "user", "--transport", "http", "uxkin", MCP_URL]);
    },
  },
  {
    id: "codex",
    name: "Codex",
    where: "codex mcp add",
    signIn: "Run: codex mcp login uxkin",
    detect: () => hasCommand("codex"),
    async connected() {
      const config = await readFile(join(process.env.CODEX_HOME || join(home, ".codex"), "config.toml"), "utf8").catch(() => "");
      return /^\s*\[mcp_servers\.uxkin\]/m.test(config);
    },
    async connect() {
      await run("codex", ["mcp", "add", "uxkin", "--url", MCP_URL]);
    },
  },
  jsonTarget({
    id: "cursor",
    name: "Cursor",
    file: join(home, ".cursor", "mcp.json"),
    detect: () => exists(join(home, ".cursor")),
    key: "mcpServers",
    entry: { url: MCP_URL },
    signIn: "In Cursor, open Settings → MCP and click Connect next to uxkin.",
  }),
  vscodeTarget(),
  jsonTarget({
    id: "windsurf",
    name: "Windsurf",
    file: join(home, ".codeium", "windsurf", "mcp_config.json"),
    detect: () => exists(join(home, ".codeium", "windsurf")),
    key: "mcpServers",
    entry: { serverUrl: MCP_URL },
    signIn: "In Windsurf, open the MCP servers panel, refresh, and sign in to uxkin.",
  }),
  jsonTarget({
    id: "antigravity",
    name: "Antigravity",
    file: join(home, ".gemini", "config", "mcp_config.json"),
    detect: async () => (await exists(join(home, ".gemini", "config"))) || (await exists(join(home, ".gemini", "antigravity"))),
    key: "mcpServers",
    entry: { serverUrl: MCP_URL },
    signIn: "In Antigravity, open Manage MCP Servers, refresh, and sign in to uxkin.",
  }),
  jsonTarget({
    id: "kiro",
    name: "Kiro",
    file: join(home, ".kiro", "settings", "mcp.json"),
    detect: () => exists(join(home, ".kiro")),
    key: "mcpServers",
    entry: { url: MCP_URL },
    signIn: "In Kiro, open the MCP servers panel and sign in to uxkin.",
  }),
];

// VS Code's own "code --add-mcp" when the code command is installed:
// it understands the comments VS Code allows in its settings files.
function vscodeTarget() {
  const entry = { type: "http", url: MCP_URL };
  const file = jsonTarget({
    id: "vscode",
    name: "VS Code",
    file: join(vscodeUserDir(), "mcp.json"),
    detect: () => exists(vscodeUserDir()),
    key: "servers",
    entry,
    signIn: "In VS Code, run “MCP: List Servers”, choose uxkin, then Start and sign in.",
  });
  return {
    ...file,
    async connect() {
      // On Windows the JSON argument wouldn't survive the shell, so the file is edited instead.
      if (process.platform !== "win32" && (await hasCommand("code"))) {
        await run("code", ["--add-mcp", JSON.stringify({ name: "uxkin", ...entry })]);
        return;
      }
      await file.connect();
    },
  };
}

export const TOOL_IDS = TARGETS.map((target) => target.id);

export async function setup({ only = [], yes = false, dryRun = false } = {}) {
  const unknown = only.filter((id) => !TOOL_IDS.includes(id));
  if (unknown.length) throw new UserError(`Unknown tool: ${unknown.join(", ")}. Choose from: ${TOOL_IDS.join(", ")}.`);

  const chosen = only.length ? TARGETS.filter((target) => only.includes(target.id)) : TARGETS;
  console.log(bold("Looking for AI coding tools on this computer…\n"));

  const todo = [];
  const done = [];
  for (const target of chosen) {
    if (!(await target.detect())) {
      skip(`${target.name} ${dim("not found")}`);
    } else if (await target.connected()) {
      ok(`${target.name} ${dim("already connected")}`);
      done.push(target);
    } else {
      console.log(`${bold("+")} ${target.name} ${dim(`→ ${target.where}`)}`);
      todo.push(target);
    }
  }

  if (!todo.length) {
    console.log(done.length ? "\nEverything found is already connected to UXKIN." : "\nNo supported AI coding tools were found.");
    if (!done.length) console.log(dim(`Supported: ${TARGETS.map((target) => target.name).join(", ")}.`));
    return;
  }
  if (dryRun) {
    console.log(dim("\nDry run: nothing was changed."));
    return;
  }

  console.log(dim("\nOnly UXKIN is added. Your other settings stay as they are."));
  if (!yes && !(await confirm(`Connect UXKIN to ${todo.map((target) => target.name).join(", ")}?`))) {
    console.log(process.stdin.isTTY ? "Nothing was changed." : "Nothing was changed. Run npx uxkin setup --yes to connect them without asking.");
    return;
  }

  const connected = [];
  for (const target of todo) {
    try {
      await target.connect();
      ok(`Connected ${target.name}`);
      connected.push(target);
    } catch (error) {
      fail(`${target.name}: ${error instanceof UserError ? error.message : error.stderr?.trim() || error.message}`);
    }
  }

  if (connected.length) {
    console.log(bold("\nLast step: sign in to UXKIN once in each tool"));
    for (const target of connected) console.log(`  ${target.name}: ${target.signIn}`);
    console.log(dim("\nSearches need a UXKIN plan. Then ask your AI to “look at real apps on UXKIN first”."));
  }
}
