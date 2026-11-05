#!/usr/bin/env node
import { readFile, writeFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { parseArgs } from "node:util";

import { callTool } from "../lib/api.mjs";
import { CREDENTIALS_FILE, UXKIN_URL, isSignedIn, signIn, signOut } from "../lib/auth.mjs";
import { PLUGIN_IDS, addPlugin, listPlugins } from "../lib/plugins.mjs";
import { TOOL_IDS, setup } from "../lib/setup.mjs";
import { UserError, bold, confirm, dim, fail, ok, purple, truncate } from "../lib/ui.mjs";

const { version } = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

const HELP = `${bold("uxkin")} ${dim(`v${version}`)} · real UI references for you and your AI

${bold("Usage")}
  npx uxkin <command> [options]

${bold("Commands")}
  setup [tool…]          Connect UXKIN to the AI coding tools on this computer
                         (${TOOL_IDS.join(", ")})
  add <plugin>           Add a design plugin's skills to your AI tools and connect UXKIN
                         (${PLUGIN_IDS.join(", ")})
  design <site>          Save a real website's DESIGN.md into this folder
  search <words>         Search real app screens, user journeys and websites
  collections [name]     List your collections, or show what's in one
  login                  Sign in to UXKIN in your browser
  logout                 Sign out on this computer
  status                 Show whether you're signed in

${bold("Options")}
  --json                 Print results as JSON (for scripts and AI agents)
  --limit <n>            How many results to show (search, design)
  --out <file>           Where to save DESIGN.md (default: ./DESIGN.md)
  --stdout               Print DESIGN.md instead of saving it
  --force                Replace an existing DESIGN.md without asking
  --yes                  Don't ask before connecting tools (setup)
  --dry-run              Show what setup would do, change nothing
  --skills-only          Add a plugin's skills without connecting UXKIN (add)
  -v, --version          Show the version
  -h, --help             Show this help

${bold("Examples")}
  npx uxkin setup
  npx uxkin add website-design
  npx uxkin design linear
  npx uxkin search "onboarding paywall"
  npx uxkin search duolingo --json

Searching needs a UXKIN plan: ${UXKIN_URL}/choose-plan`;

const COMMANDS = new Set(["setup", "add", "design", "search", "collections", "login", "logout", "status", "help"]);

function parse(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      json: { type: "boolean", default: false },
      limit: { type: "string" },
      out: { type: "string" },
      stdout: { type: "boolean", default: false },
      force: { type: "boolean", default: false },
      yes: { type: "boolean", short: "y", default: false },
      "dry-run": { type: "boolean", default: false },
      "skills-only": { type: "boolean", default: false },
      version: { type: "boolean", short: "v", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });
  const limit = values.limit === undefined ? undefined : Number(values.limit);
  if (limit !== undefined && !(Number.isInteger(limit) && limit > 0 && limit <= 50)) {
    throw new UserError("--limit must be a whole number from 1 to 50.");
  }
  return { options: { ...values, limit }, command: positionals[0], rest: positionals.slice(1) };
}

const printJson = (value) => console.log(JSON.stringify(value, null, 2));

const TYPE_LABEL = { app: "App", journey: "Journey", screen: "Screen", web: "Website" };

async function search(words, options) {
  const query = words.join(" ").trim();
  if (!query) throw new UserError('What should UXKIN look for? For example: npx uxkin search "paywall"');
  const { results = [] } = (await callTool("find_ui_references", { query, limit: options.limit ?? 10 })) ?? {};
  if (options.json) return printJson(results);
  if (!results.length) {
    console.log("No references found. Try other words, like a flow name (onboarding, paywall) or an app.");
    return;
  }
  for (const [index, reference] of results.entries()) {
    const title = reference.type === "journey" ? reference.subtitle || reference.title : reference.title;
    const detail =
      reference.type === "journey"
        ? reference.title
        : reference.type === "screen"
          ? (reference.context ?? []).join(", ") || reference.subtitle
          : reference.description || reference.subtitle;
    console.log(`${dim(String(index + 1).padStart(2))}  ${bold(title)} ${purple(TYPE_LABEL[reference.type] || "")}`);
    if (detail) console.log(`    ${truncate(detail, 90)}`);
    console.log(`    ${dim(reference.href)}`);
  }
}

const fileExists = (path) =>
  access(path).then(
    () => true,
    () => false,
  );

async function design(words, options) {
  const query = words.join(" ").trim();
  if (!query) throw new UserError("Which website? For example: npx uxkin design linear   (or a style: \"dark fintech\")");
  const { results = [] } = (await callTool("find_ui_materials", { query, limit: options.limit ?? 5 })) ?? {};
  if (options.json) return printJson(results);
  const [top, ...others] = results;
  if (!top) throw new UserError("No design systems matched. Try a website's name, an industry or a style.");
  if (!top.designMarkdown) throw new UserError(`DESIGN.md isn't available for ${top.name}. See ${top.href}`);

  if (options.stdout) {
    process.stdout.write(top.designMarkdown.endsWith("\n") ? top.designMarkdown : `${top.designMarkdown}\n`);
    return;
  }
  const out = resolve(options.out || "DESIGN.md");
  if (!options.force && (await fileExists(out)) && !(await confirm(`${out} already exists. Replace it?`, { defaultYes: false }))) {
    console.log("Kept your existing file.");
    return;
  }
  await writeFile(out, top.designMarkdown.endsWith("\n") ? top.designMarkdown : `${top.designMarkdown}\n`);
  ok(`Saved ${bold(top.name)}'s design system to ${out}`);
  console.log(dim(`   ${truncate(top.summary, 100)}`));
  console.log(dim(`   ${top.href}`));
  console.log(`\nTell your AI: “Follow DESIGN.md for colors, type and components.”`);
  if (others.length) console.log(dim(`\nNot the one? Also matched: ${others.map((system) => system.name).join(", ")}`));
}

async function collections(words, options) {
  const { collections: list = [] } = (await callTool("list_collections")) ?? {};
  const name = words.join(" ").trim();
  if (!name) {
    if (options.json) return printJson(list);
    if (!list.length) {
      console.log(`No collections yet. Save screens, apps and websites on ${UXKIN_URL} and they show up here.`);
      return;
    }
    for (const collection of list) {
      console.log(`${bold(collection.name)} ${dim(`· ${collection.itemCount} ${collection.itemCount === 1 ? "item" : "items"}`)}`);
    }
    console.log(dim(`\nShow one: npx uxkin collections "${list[0].name}"`));
    return;
  }
  const match =
    list.find((collection) => collection.name.toLowerCase() === name.toLowerCase()) ||
    list.find((collection) => collection.name.toLowerCase().includes(name.toLowerCase()));
  if (!match) throw new UserError(`No collection called "${name}". Run npx uxkin collections to see them all.`);
  const collection = await callTool("get_collection", { collection: match.id });
  if (options.json) return printJson(collection);
  console.log(`${bold(collection.name)} ${dim(`· ${collection.items.length} ${collection.items.length === 1 ? "item" : "items"}`)}\n`);
  for (const item of collection.items) {
    console.log(`${bold(item.title)}${item.subtitle ? ` ${dim("·")} ${truncate(item.subtitle, 70)}` : ""}`);
    console.log(`  ${dim(item.href)}`);
  }
}

async function main() {
  const { options, command, rest } = parse(process.argv.slice(2));
  if (options.version) return console.log(version);
  if (options.help || !command || command === "help") return console.log(HELP);
  if (!COMMANDS.has(command)) throw new UserError(`Unknown command "${command}". Run npx uxkin --help to see them all.`);

  switch (command) {
    case "setup":
      return setup({ only: rest, yes: options.yes, dryRun: options["dry-run"] });
    case "add":
      if (!rest.length) return listPlugins();
      return addPlugin(rest[0], { yes: options.yes, skillsOnly: options["skills-only"] });
    case "design":
      return design(rest, options);
    case "search":
      return search(rest, options);
    case "collections":
      return collections(rest, options);
    case "login":
      await signIn();
      return ok("You're signed in to UXKIN.");
    case "logout":
      return ok((await signOut()) ? "Signed out on this computer." : "You weren't signed in.");
    case "status":
      return console.log(
        (await isSignedIn())
          ? `Signed in to ${UXKIN_URL}. ${dim(`(${CREDENTIALS_FILE})`)}`
          : "Not signed in. Run npx uxkin login.",
      );
  }
}

main().catch((error) => {
  if (error instanceof UserError || error?.code === "ERR_PARSE_ARGS_UNKNOWN_OPTION") {
    fail(error.message);
  } else if (error?.cause?.code === "ENOTFOUND" || error?.cause?.code === "ECONNREFUSED" || error?.message === "fetch failed") {
    fail(`Couldn't reach ${UXKIN_URL}. Check your internet connection and try again.`);
  } else {
    fail(`Something went wrong: ${error?.message || error}`);
  }
  process.exitCode = 1;
});
