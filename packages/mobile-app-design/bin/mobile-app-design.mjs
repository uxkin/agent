#!/usr/bin/env node
import { runPluginCommand } from "uxkin/lib/plugin-command.mjs";

await runPluginCommand("mobile-app-design", new URL("../package.json", import.meta.url));
