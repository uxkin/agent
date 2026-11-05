#!/usr/bin/env node
import { runPluginCommand } from "uxkin/lib/plugin-command.mjs";

await runPluginCommand("dashboard-design", new URL("../package.json", import.meta.url));
