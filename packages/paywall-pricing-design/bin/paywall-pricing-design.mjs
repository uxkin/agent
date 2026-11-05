#!/usr/bin/env node
import { runPluginCommand } from "uxkin/lib/plugin-command.mjs";

await runPluginCommand("paywall-pricing-design", new URL("../package.json", import.meta.url));
