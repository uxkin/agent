import { spawn } from "node:child_process";

import { setup } from "./setup.mjs";
import { UserError, bold, dim, ok } from "./ui.mjs";

// The design plugins, each read from its own branch of uxkin/agent.
// Only read: the plugin directories follow those branches.
export const PLUGINS = {
  "website-design": {
    name: "Website Design",
    branch: "website-design",
    folder: "plugins/website-design",
    about: "Websites and landing pages from real design systems: landing-page, web-design-system and web-review.",
  },
  "mobile-app-design": {
    name: "Mobile App Design",
    branch: "mobile-app-design",
    folder: "plugins/mobile-app-design",
    about: "iOS screens and flows from real apps: ios-screens, ios-flows and ios-review.",
  },
  "ui-design-review": {
    name: "UI Design Review",
    branch: "ui-review",
    folder: "plugins/ui-design-review",
    about: "Review and polish any interface against real products: ui-review, ui-compare and ui-polish.",
  },
  "dashboard-design": {
    name: "Dashboard Design",
    branch: "dashboard-design",
    folder: "plugins/dashboard-design",
    about: "Dashboards and data screens from real products: dashboard-layout, data-display and dashboard-review.",
  },
  "swiftui-app-design": {
    name: "SwiftUI App Design",
    branch: "swiftui-app-design",
    folder: "plugins/swiftui-app-design",
    about: "SwiftUI screens and flows from real iOS apps: swiftui-screens, swiftui-flows and swiftui-review.",
  },
  "paywall-pricing-design": {
    name: "Paywall & Pricing Design",
    branch: "paywall-pricing-design",
    folder: "plugins/paywall-pricing-design",
    about: "App paywalls and pricing pages from real products: app-paywall, pricing-page-layout and paywall-review.",
  },
};

export const PLUGIN_IDS = Object.keys(PLUGINS);

// The open skills installer (skills.sh), pinned: it knows where each AI
// coding tool keeps its skills.
const SKILLS_INSTALLER = "skills@1.7.6";

export const skillsUrl = (id) => `https://github.com/uxkin/agent/tree/${PLUGINS[id].branch}/${PLUGINS[id].folder}/skills`;

function runInstaller(args) {
  return new Promise((resolve, reject) => {
    // npx is a .cmd file on Windows, which needs a shell; the arguments
    // have no spaces or quotes.
    const child = spawn("npx", ["--yes", SKILLS_INSTALLER, ...args], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new UserError(`The skills installer stopped (exit code ${code}). Nothing else was changed.`)),
    );
  });
}

export function listPlugins() {
  console.log(bold("UXKIN design plugins\n"));
  for (const [id, plugin] of Object.entries(PLUGINS)) {
    console.log(`  ${bold(id.padEnd(24))}${plugin.name}`);
    console.log(`  ${" ".repeat(24)}${dim(plugin.about)}`);
  }
  console.log(`\nAdd one: ${bold("npx uxkin add website-design")}`);
}

/*
 * A design plugin outside the plugin stores: its skills go into the AI
 * coding tools on this computer (through the skills installer, which
 * asks where), then UXKIN is connected to them (setup). The skills work
 * on their own; the UXKIN connection adds the real references.
 */
export async function addPlugin(id, { yes = false, skillsOnly = false } = {}) {
  const plugin = PLUGINS[id];
  if (!plugin) throw new UserError(`Unknown plugin "${id}". Choose from: ${PLUGIN_IDS.join(", ")}.`);

  console.log(`${bold(plugin.name)} ${dim("by UXKIN")}\n${dim(plugin.about)}\n`);
  console.log(bold("1. Skills") + dim(" (the skills installer asks which AI tools to add them to)\n"));
  await runInstaller(["add", skillsUrl(id), ...(yes ? ["--global", "--yes"] : [])]);
  ok(`${plugin.name} skills added.`);

  if (skillsOnly) return;
  console.log(`\n${bold("2. UXKIN connection")} ${dim("(real app screens, flows and website design systems for those skills)")}\n`);
  await setup({ yes });
}
