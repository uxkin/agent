#!/usr/bin/env node
/*
 * Builds the UXKIN VS Code extensions (vscode/<id>/) from the skills in
 * this repository: the main skills on this branch and each design
 * plugin's skills from its own branch (pinned below). Run from the
 * repository root:
 *
 *   node vscode/build.mjs            # writes vscode/<id>/
 *   node vscode/build.mjs --package  # also makes vscode/dist/<id>-<version>.vsix
 *
 * Each extension adds its skills to Copilot Chat (contributes.chatSkills)
 * and registers the UXKIN MCP server (extension.js), so VS Code handles
 * the sign-in. Nothing else: no settings, keys or background process.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "vscode");
const PUBLISHER = process.env.VSCE_PUBLISHER || "uxkin";
const REPO = "https://github.com/uxkin/agent";
// Listing images live on main, so the Marketplace and Open VSX pages can load them.
const IMAGE_BASE = "https://raw.githubusercontent.com/uxkin/agent/main/assets";
const imageUrl = name => `${IMAGE_BASE}/${name.startsWith("vscode/") ? name : `screenshots/${name}`}.png`;

const git = (...args) => execFileSync("git", args, { cwd: ROOT, maxBuffer: 64 * 1024 * 1024 });

// One entry per extension. `from` is a git ref (branch@commit) and the
// plugin folder on it; null means the main skills in ./skills.
const EXTENSIONS = [
  {
    id: "uxkin",
    images: ["1-references", "2-journeys", "3-materials"],
    displayName: "UXKIN: Real UI References",
    version: "1.0.1",
    from: null,
    skills: ["no-ui-slop", "uxkin-research"],
    mcpUrl: "https://uxkin.com/mcp",
    serverLabel: "UXKIN",
    description:
      "Real UI references for Copilot: skills that build UI from the product's own design system and real apps, plus UXKIN's library of real iOS screens, user journeys and website design systems.",
    intro:
      "Copilot designs better when it can look at how real products solve the same problem. This extension adds two UXKIN skills to Copilot Chat and connects UXKIN's library of real app screens, complete user journeys and website design systems.",
    rows: [
      ["**no-ui-slop** skill", "Builds UI that fits the product instead of generic AI defaults: works from the existing design system, designs every state, checks the rendered result"],
      ["**uxkin-research** skill", "Looks up how real apps and websites handle a screen or flow before designing it, and says which decisions it's adopting"],
      ["UXKIN MCP server", "Real iOS app screens, complete user journeys, website design systems with a DESIGN.md, and your saved collections"]
    ],
    keywords: ["ui", "ux", "design", "ui design", "design system", "frontend", "copilot", "mcp", "ui references", "landing page", "mobile app", "ios"]
  },
  {
    id: "website-design",
    images: ["vscode/website-design", "3-materials"],
    displayName: "Website Design",
    version: "1.0.1",
    from: { ref: "07e8f5f", dir: "plugins/website-design" },
    skills: ["web-design-system", "landing-page", "web-review"],
    mcpUrl: "https://uxkin.com/mcp",
    serverLabel: "UXKIN (Website Design)",
    description:
      "Design and build websites and landing pages that look like a real product, not AI output: a design direction from real websites written as a DESIGN.md, responsive pages, and reviews.",
    intro:
      "Websites built by AI tend to look alike. These skills give Copilot a design direction taken from real websites, write it down as a DESIGN.md, build pages that work on phone and desktop, and review what you already have.",
    rows: [
      ["**web-design-system** skill", "Chooses colors with their roles, typography, spacing and components from how real websites in the same space look, and writes them into a DESIGN.md and the project's tokens"],
      ["**landing-page** skill", "Builds landing, home, pricing and feature pages with specific copy and no invented proof, following the DESIGN.md, checked on phone, tablet and desktop"],
      ["**web-review** skill", "Reviews an existing site or page and lists what to fix, most important first"],
      ["UXKIN MCP server (optional)", "15k+ design systems taken from real websites, each with a DESIGN.md"]
    ],
    keywords: ["website", "web design", "landing page", "design system", "design.md", "frontend", "ui", "responsive", "copilot", "tailwind", "css"]
  },
  {
    id: "mobile-app-design",
    images: ["vscode/mobile-app-design", "2-journeys"],
    displayName: "Mobile App Design",
    version: "1.0.1",
    from: { ref: "0c44dd6", dir: "plugins/mobile-app-design" },
    skills: ["ios-screens", "ios-flows", "ios-review"],
    mcpUrl: "https://uxkin.com/mcp/mobile",
    serverLabel: "UXKIN (Mobile App Design)",
    description:
      "Design and build iPhone app screens and flows that feel native: onboarding, sign-up, paywalls, permissions and settings, checked against Apple's conventions and real iOS apps.",
    intro:
      "These skills help Copilot build iPhone screens and flows that feel native, in SwiftUI, UIKit, React Native, Expo or Flutter, planned from how real iOS apps handle the same flow.",
    rows: [
      ["**ios-screens** skill", "Builds native-feeling iPhone screens: navigation, sheets, Dynamic Type, dark mode, permissions, paywalls, checked on small and large iPhones"],
      ["**ios-flows** skill", "Plans a multi-step flow (onboarding, sign-up, paywall, permissions, cancellation, account deletion, settings) from how real apps handle it"],
      ["**ios-review** skill", "Reviews an existing screen or flow and lists what to fix, most important first"],
      ["UXKIN MCP server (optional)", "300+ real iOS apps with their screens and complete user journeys"]
    ],
    keywords: ["ios", "iphone", "mobile app", "app design", "swiftui", "react native", "expo", "flutter", "onboarding", "paywall", "ui"]
  },
  {
    id: "ui-design-review",
    images: ["vscode/ui-design-review", "1-references"],
    displayName: "UI Design Review",
    version: "1.0.1",
    from: { ref: "ebd88d2", dir: "plugins/ui-design-review" },
    skills: ["ui-review", "ui-polish", "ui-compare"],
    mcpUrl: "https://uxkin.com/mcp",
    serverLabel: "UXKIN (UI Design Review)",
    description:
      "Review any app or website screen like a senior designer: check the rendered result on phone and desktop, list what to fix most important first, fix it in your app's own style, and compare with real products.",
    intro:
      "Ask Copilot to review a screen and it often just restates the code. These skills make it look at the rendered result, rank what's wrong, fix what you pick in your app's own style, and compare with how real products solve the same thing.",
    rows: [
      ["**ui-review** skill", "Looks at the rendered screen on phone and desktop and lists what to fix, most important first"],
      ["**ui-polish** skill", "Fixes the issues you pick, in the app's own components and style"],
      ["**ui-compare** skill", "Compares a screen with how real products handle the same thing"],
      ["UXKIN MCP server (optional)", "Real iOS app screens and user journeys, and design systems from real websites"]
    ],
    keywords: ["ui review", "design review", "ux", "ui", "accessibility", "polish", "frontend", "design", "copilot", "audit"]
  },
  {
    id: "dashboard-design",
    images: ["vscode/dashboard-design", "3-materials"],
    displayName: "Dashboard Design",
    version: "1.0.1",
    from: { ref: "4137430", dir: "plugins/dashboard-design" },
    skills: ["dashboard-layout", "data-display", "dashboard-review"],
    mcpUrl: "https://uxkin.com/mcp",
    serverLabel: "UXKIN (Dashboard Design)",
    description:
      "Design and build dashboards and admin panels people can read: clear layout and navigation, the key numbers on top, charts and tables that fit the data, filters, and every loading, empty and error state.",
    intro:
      "Dashboards built by AI usually show everything at once. These skills help Copilot pick the few numbers that matter, lay out navigation, choose charts and tables that fit the data, and design every state.",
    rows: [
      ["**dashboard-layout** skill", "Plans the layout and navigation, with the few numbers that matter on top"],
      ["**data-display** skill", "Chooses charts and tables that fit the data, with filters and loading, empty and error states"],
      ["**dashboard-review** skill", "Reviews an existing dashboard and lists what to fix, most important first"],
      ["UXKIN MCP server (optional)", "Real app screens and design systems from real SaaS websites"]
    ],
    keywords: ["dashboard", "admin panel", "saas", "data table", "charts", "analytics", "ui", "design", "frontend", "copilot"]
  },
  {
    id: "swiftui-app-design",
    images: ["vscode/swiftui-app-design", "2-journeys"],
    displayName: "SwiftUI App Design",
    version: "1.0.1",
    from: { ref: "0d9eef2", dir: "plugins/swiftui-app-design" },
    skills: ["swiftui-screens", "swiftui-flows", "swiftui-review"],
    mcpUrl: "https://uxkin.com/mcp",
    serverLabel: "UXKIN (SwiftUI App Design)",
    description:
      "Build SwiftUI screens and flows that feel like a real iPhone app: native navigation, lists, forms and sheets, Dynamic Type, dark mode and accessibility, checked in previews on small and large iPhones.",
    intro:
      "These skills help Copilot write SwiftUI that feels like a real iPhone app: native navigation and controls, Dynamic Type, dark mode and accessibility, with onboarding, paywalls and settings planned from how real apps do them.",
    rows: [
      ["**swiftui-screens** skill", "Builds native SwiftUI screens: navigation, lists, forms, sheets, Dynamic Type, dark mode, accessibility"],
      ["**swiftui-flows** skill", "Plans onboarding, paywalls, settings and other flows from how real apps handle them"],
      ["**swiftui-review** skill", "Reviews existing SwiftUI screens in previews and lists what to fix, most important first"],
      ["UXKIN MCP server (optional)", "300+ real iOS apps with their screens and complete user journeys"]
    ],
    keywords: ["swiftui", "swift", "ios", "iphone", "xcode", "app design", "ui", "mobile", "design", "copilot"]
  },
  {
    id: "paywall-pricing-design",
    images: ["vscode/paywall-pricing-design", "1-references"],
    displayName: "Paywall & Pricing Design",
    version: "1.0.1",
    from: { ref: "ddf2946", dir: "plugins/paywall-pricing-design" },
    skills: ["app-paywall", "pricing-page-layout", "paywall-review"],
    mcpUrl: "https://uxkin.com/mcp",
    serverLabel: "UXKIN (Paywall & Pricing Design)",
    description:
      "Design and build paywalls, upgrade screens and pricing pages that are clear and honest: value first, real prices and renewal terms, one obvious choice, and every loading, error and already-subscribed state.",
    intro:
      "These skills help Copilot build paywalls and pricing pages people trust: the value first, real prices and renewal terms that match checkout, one obvious choice, and Restore Purchases and close where they're needed.",
    rows: [
      ["**app-paywall** skill", "Builds in-app paywalls and upgrade screens with clear prices, trials and renewal terms"],
      ["**pricing-page-layout** skill", "Builds website pricing pages with one obvious choice and honest terms"],
      ["**paywall-review** skill", "Reviews an existing paywall or pricing page and lists what to fix, most important first"],
      ["UXKIN MCP server (optional)", "Real app paywalls, trial flows and design systems from real websites"]
    ],
    keywords: ["paywall", "pricing page", "subscription", "in-app purchase", "upgrade", "saas", "storekit", "revenuecat", "ui", "copilot"]
  }
];

function readFrom(ext, rel) {
  if (!ext.from) return fs.readFileSync(path.join(ROOT, rel));
  return git("show", `${ext.from.ref}:${ext.from.dir}/${rel}`);
}

function skillSource(ext, skill, file) {
  return ext.from ? readFrom(ext, `skills/${skill}/${file}`) : fs.readFileSync(path.join(ROOT, "skills", skill, file));
}

function iconSource(ext) {
  return ext.from ? readFrom(ext, ".claude-plugin/icon.png") : fs.readFileSync(path.join(ROOT, "assets", "logo-400.png"));
}

const EXTENSION_JS = (ext) => `const vscode = require("vscode");

// UXKIN's MCP server: real UI references (read-only). VS Code asks the
// person to sign in with their UXKIN account the first time it's used.
const SERVER_URL = ${JSON.stringify(ext.mcpUrl)};
const SERVER_LABEL = ${JSON.stringify(ext.serverLabel)};
const PROVIDER_ID = ${JSON.stringify(`${ext.id}.mcp`)};

function activate(context) {
  // VS Code: MCP server definition provider (stable API).
  if (vscode.lm && typeof vscode.lm.registerMcpServerDefinitionProvider === "function" && vscode.McpHttpServerDefinition) {
    const changed = new vscode.EventEmitter();
    context.subscriptions.push(
      changed,
      vscode.lm.registerMcpServerDefinitionProvider(PROVIDER_ID, {
        onDidChangeMcpServerDefinitions: changed.event,
        provideMcpServerDefinitions: () => [
          new vscode.McpHttpServerDefinition(SERVER_LABEL, vscode.Uri.parse(SERVER_URL), {}, ${JSON.stringify(ext.version)})
        ]
      })
    );
    return;
  }
  // Cursor: its own extension API for MCP servers.
  const cursorMcp = vscode.cursor && vscode.cursor.mcp;
  if (cursorMcp && typeof cursorMcp.registerServer === "function") {
    const name = ${JSON.stringify(ext.id === "uxkin" ? "uxkin" : `uxkin-${ext.id}`)};
    cursorMcp.registerServer({ name, server: { url: SERVER_URL } });
    context.subscriptions.push({ dispose: () => cursorMcp.unregisterServer(name) });
  }
}

function deactivate() {}

module.exports = { activate, deactivate };
`;

function readme(ext) {
  const rows = ext.rows.map(([what, does]) => `| ${what} | ${does} |`).join("\n");
  const skillList = ext.skills.map(s => `\`/${s}\``).join(", ");
  return `# ${ext.displayName}

${ext.intro} By [UXKIN](https://uxkin.com).

${ext.images.map(name => `![${ext.displayName}](${imageUrl(name)})`).join("\n\n")}

## What's inside

| | What it does |
|---|---|
${rows}

The skills work on their own, with no account. The UXKIN server is optional: Copilot can use it to look up real references, and searching the library needs a UXKIN plan.

## How to use it

1. Open **Copilot Chat** and switch to **Agent** mode.
2. Ask for what you want, for example "build a pricing page" or "review this screen". Copilot picks the right skill on its own, or type ${skillList} to use one by name.
3. The first time Copilot uses UXKIN, VS Code asks you to sign in. Log in with your UXKIN account and click **Allow**. No API key to copy.

Check the connection under **MCP Servers** in the Extensions view: **${ext.serverLabel}** should be running.

Requires VS Code 1.109 or later with GitHub Copilot for the skills.

## What it sends

The skills run inside Copilot and send nothing anywhere. When the UXKIN server is used, Copilot sends its search words to \`${ext.mcpUrl}\` and receives references; the tools only read. See the [privacy policy](https://uxkin.com/privacy).

## Support

Email support@uxkin.com or open an issue on [GitHub](${REPO}/issues).

## License

MIT. The UXKIN library itself is a hosted service, not part of this extension: see the [terms](https://uxkin.com/terms).
`;
}

function manifest(ext) {
  return {
    name: ext.id,
    displayName: ext.displayName,
    description: ext.description,
    version: ext.version,
    publisher: PUBLISHER,
    license: "MIT",
    icon: "icon.png",
    galleryBanner: { color: "#141414", theme: "dark" },
    homepage: "https://uxkin.com",
    repository: { type: "git", url: REPO },
    bugs: { url: `${REPO}/issues`, email: "support@uxkin.com" },
    engines: { vscode: "^1.96.0" },
    categories: ["AI", "Chat", "Other"],
    keywords: ext.keywords.slice(0, 30),
    // Nothing here runs workspace code, so it also works in Restricted Mode.
    capabilities: { untrustedWorkspaces: { supported: true }, virtualWorkspaces: true },
    activationEvents: ["onStartupFinished"],
    main: "./extension.js",
    contributes: {
      chatSkills: ext.skills.map(skill => ({ path: `./skills/${skill}/SKILL.md` })),
      mcpServerDefinitionProviders: [{ id: `${ext.id}.mcp`, label: ext.serverLabel }]
    }
  };
}

function write(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
}

const LICENSE = fs.readFileSync(path.join(ROOT, "LICENSE"));
const packageAll = process.argv.includes("--package");

for (const ext of EXTENSIONS) {
  const dir = path.join(OUT, ext.id);
  fs.rmSync(dir, { recursive: true, force: true });
  write(path.join(dir, "package.json"), JSON.stringify(manifest(ext), null, 2) + "\n");
  write(path.join(dir, "extension.js"), EXTENSION_JS(ext));
  write(path.join(dir, "README.md"), readme(ext));
  write(path.join(dir, "CHANGELOG.md"), `# Changelog\n\n## 1.0.1\n\nAdded pictures to the listing.\n\n## 1.0.0\n\nFirst release: ${ext.skills.join(", ")} and the UXKIN MCP server.\n`);
  write(path.join(dir, "LICENSE"), LICENSE);
  write(path.join(dir, "icon.png"), iconSource(ext));
  write(path.join(dir, ".vscodeignore"), "**/*.vsix\n");
  for (const skill of ext.skills) {
    for (const file of ["SKILL.md", "LICENSE"]) write(path.join(dir, "skills", skill, file), skillSource(ext, skill, file));
  }
  console.log(`built vscode/${ext.id}`);

  if (packageAll) {
    fs.mkdirSync(path.join(OUT, "dist"), { recursive: true });
    const target = path.join(OUT, "dist", `${ext.id}-${ext.version}.vsix`);
    execFileSync("npx", ["--yes", "@vscode/vsce@4.1.0", "package", "--no-dependencies", "-o", target], { cwd: dir, stdio: "inherit" });
  }
}
