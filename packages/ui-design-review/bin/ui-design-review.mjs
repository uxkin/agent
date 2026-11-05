#!/usr/bin/env node
import { runPluginCommand } from "uxkin/lib/plugin-command.mjs";

await runPluginCommand("ui-design-review", new URL("../package.json", import.meta.url));
