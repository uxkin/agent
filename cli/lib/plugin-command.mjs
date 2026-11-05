import { readFile } from "node:fs/promises";
import { parseArgs } from "node:util";

import { PLUGINS, addPlugin } from "./plugins.mjs";
import { UserError, bold, fail } from "./ui.mjs";

/*
 * The command behind each design plugin's own npm package
 * (npx website-design, npx mobile-app-design, …): the same as
 * npx uxkin add <plugin>.
 */
export async function runPluginCommand(id, packageJsonUrl) {
  const plugin = PLUGINS[id];
  try {
    const { values } = parseArgs({
      args: process.argv.slice(2),
      options: {
        yes: { type: "boolean", short: "y", default: false },
        "skills-only": { type: "boolean", default: false },
        version: { type: "boolean", short: "v", default: false },
        help: { type: "boolean", short: "h", default: false },
      },
    });
    if (values.version) {
      console.log(JSON.parse(await readFile(packageJsonUrl, "utf8")).version);
      return;
    }
    if (values.help) {
      console.log(`${bold(`npx ${id}`)} · ${plugin.name} by UXKIN

${plugin.about}

Adds the ${plugin.name} skills to the AI coding tools on this computer,
then connects UXKIN so they can use real app screens, flows and website
design systems.

Options
  --skills-only   Add the skills without connecting UXKIN
  --yes           Don't ask (all your AI tools, for your user)
  -h, --help      Show this help

More UXKIN commands: npx uxkin --help`);
      return;
    }
    await addPlugin(id, { yes: values.yes, skillsOnly: values["skills-only"] });
  } catch (error) {
    fail(error instanceof UserError || error?.code === "ERR_PARSE_ARGS_UNKNOWN_OPTION" ? error.message : `Something went wrong: ${error?.message || error}`);
    process.exitCode = 1;
  }
}
