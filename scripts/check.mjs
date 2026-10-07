/*
 * Checks that keep this repository's packaging consistent:
 *   node scripts/check.mjs            the files themselves (runs on every change)
 *   node scripts/check.mjs --live     also compares the library numbers quoted
 *                                     in the README and manifests with uxkin.com
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const read = path => readFileSync(join(root, path), "utf8");
const json = path => JSON.parse(read(path));
const MCP_URL = "https://uxkin.com/mcp";
let failures = 0;
const check = (name, fn) => {
  try {
    fn();
    console.log(`ok    ${name}`);
  } catch (error) {
    failures++;
    console.log(`FAIL  ${name}\n      ${error.message.split("\n").join("\n      ")}`);
  }
};

// Every file in the repository except .git.
const files = (dir = root) =>
  readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    if (name === ".git" || name === "node_modules") return [];
    return statSync(path).isDirectory() ? files(path) : [relative(root, path)];
  });
const all = files();

check("every JSON file parses", () => {
  for (const file of all.filter(f => f.endsWith(".json"))) {
    try {
      JSON.parse(read(file));
    } catch (error) {
      throw new Error(`${file}: ${error.message}`);
    }
  }
});

const MANIFESTS = [
  ".claude-plugin/plugin.json",
  ".cursor-plugin/plugin.json",
  ".codex-plugin/plugin.json",
  ".github/plugin/plugin.json",
  "gemini-extension.json",
  "server.json"
];
check("all plugin manifests and server.json share one version", () => {
  const versions = Object.fromEntries(MANIFESTS.map(file => [file, json(file).version]));
  for (const file of [".claude-plugin/marketplace.json", ".github/plugin/marketplace.json"]) {
    const market = json(file);
    versions[`${file} (metadata)`] = market.metadata.version;
    for (const plugin of market.plugins) versions[`${file} (${plugin.name})`] = plugin.version;
  }
  const distinct = new Set(Object.values(versions));
  assert.equal(distinct.size, 1, `versions differ: ${JSON.stringify(versions, null, 2)}`);
  assert.match([...distinct][0], /^\d+\.\d+\.\d+$/);
});

check("every MCP config points at the UXKIN server, with no credentials", () => {
  const configs = {
    ".mcp.json": json(".mcp.json").mcpServers.uxkin,
    "mcp.json": json("mcp.json").mcpServers.uxkin,
    "mcp_config.json": json("mcp_config.json").mcpServers.uxkin,
    "gemini-extension.json": json("gemini-extension.json").mcpServers.uxkin
  };
  for (const [file, config] of Object.entries(configs)) {
    assert.ok(config, `${file}: no "uxkin" server`);
    const url = config.url || config.httpUrl || config.serverUrl;
    assert.equal(url, MCP_URL, `${file}: points at ${url}`);
    assert.equal(config.headers, undefined, `${file}: plugins sign in with OAuth, never a stored header`);
    assert.equal(config.command, undefined, `${file}: use the remote server, not a local command`);
  }
  const remote = json("server.json").remotes[0];
  assert.equal(remote.url, MCP_URL);
});

check("no tokens or secrets anywhere", () => {
  const patterns = [
    [/uxkin_[A-Za-z0-9_-]{20,}/, "a UXKIN agent token"],
    [/Bearer\s+(?!\$\{|<|YOUR|your)[A-Za-z0-9._-]{16,}/, "a literal Bearer token"],
    [/gh[pousr]_[A-Za-z0-9]{30,}/, "a GitHub token"],
    [/sk-[A-Za-z0-9]{20,}/, "an API key"]
  ];
  for (const file of all.filter(f => !/\.(png|jpg|webp|gif|ico|woff2?)$/.test(f))) {
    const text = read(file);
    for (const [pattern, what] of patterns) {
      assert.ok(!pattern.test(text), `${file} contains ${what}`);
    }
  }
});

check("skills: folder name matches the skill name, and each has a license", () => {
  for (const name of readdirSync(join(root, "skills"))) {
    const skill = read(`skills/${name}/SKILL.md`);
    const front = skill.match(/^---\n([\s\S]*?)\n---/);
    assert.ok(front, `skills/${name}: no frontmatter`);
    assert.match(front[1], new RegExp(`^name: ${name}$`, "m"), `skills/${name}: name doesn't match the folder`);
    assert.match(front[1], /^description: .{40,}/m, `skills/${name}: description missing or too short`);
    assert.ok(existsSync(join(root, `skills/${name}/LICENSE`)), `skills/${name}: no LICENSE`);
  }
});

check("files the manifests point to exist", () => {
  const codex = json(".codex-plugin/plugin.json");
  const paths = [
    codex.skills,
    codex.mcpServers,
    codex.interface.logo,
    codex.interface.composerIcon,
    ...(codex.interface.screenshots || []),
    json(".github/plugin/plugin.json").skills,
    json(".github/plugin/plugin.json").mcpServers,
    json(".cursor-plugin/plugin.json").logo,
    json("gemini-extension.json").contextFileName
  ].filter(Boolean);
  for (const path of paths) assert.ok(existsSync(join(root, path)), `missing: ${path}`);
});

check("Kiro power: required fields, its server exists, steering files exist", () => {
  const power = read("POWER.md");
  const front = power.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(front, "POWER.md: no frontmatter");
  for (const field of ["name", "displayName", "description", "keywords", "author"]) {
    assert.match(front[1], new RegExp(`^${field}: .+`, "m"), `POWER.md: missing ${field}`);
  }
  assert.match(front[1], /^name: "uxkin"$/m, "POWER.md: name must stay \"uxkin\" (changing it forces a reinstall)");
  assert.ok(json("mcp.json").mcpServers.uxkin, "mcp.json: no uxkin server for the power");
  for (const [, file] of power.matchAll(/`(steering\/[^`]+\.md)`/g)) {
    assert.ok(existsSync(join(root, file)), `POWER.md mentions ${file}, which doesn't exist`);
  }
});

// --live: the numbers we quote must not be bigger than the library
// (never overclaim) or noticeably smaller (stale).
if (process.argv.includes("--live")) {
  const response = await fetch("https://uxkin.com/api/status");
  const library = (await response.json()).library;
  check("library numbers quoted here match uxkin.com", () => {
    assert.ok(library, "uxkin.com/api/status has no library counts yet");
    const quoted = [
      ["README.md", read("README.md")],
      [".codex-plugin/plugin.json", read(".codex-plugin/plugin.json")]
    ];
    const kinds = [
      [/([\d,]+)\s+(?:real\s+)?iOS screens/g, library.screens, "screens"],
      [/([\d,]+)\s+user journeys/g, library.journeys, "journeys"],
      [/([\d,]+)\s+website design systems/g, library.websites, "websites"]
    ];
    for (const [file, text] of quoted) {
      for (const [pattern, live, kind] of kinds) {
        for (const match of text.matchAll(pattern)) {
          const number = Number(match[1].replace(/,/g, ""));
          assert.ok(number <= live, `${file} says ${match[1]} ${kind}, but uxkin.com has ${live}`);
          assert.ok(number >= live * 0.95, `${file} says ${match[1]} ${kind}; uxkin.com now has ${live}: update it`);
        }
      }
    }
  });
}

if (failures) {
  console.log(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll checks passed.");
