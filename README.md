<p align="center">
  <img src="assets/logo.svg" alt="UXKIN" width="72" height="72">
</p>

<h1 align="center">UXKIN: real UI references for AI coding agents</h1>

<p align="center">
  Search real iOS app screens, complete user journeys and website design systems
  from Claude, Claude Code, Cursor, Codex, GitHub Copilot and any MCP client,
  so the UI your agent builds looks like a real product instead of AI defaults.
</p>

<p align="center">
  <strong>63,589 iOS screens</strong> from 303 apps ·
  <strong>1,991 user journeys</strong> ·
  <strong>1,288 website design systems</strong>, each with a DESIGN.md
</p>

<p align="center">
  <a href="https://github.com/uxkin/agent/actions/workflows/checks.yml"><img alt="Checks" src="https://github.com/uxkin/agent/actions/workflows/checks.yml/badge.svg"></a>
  <a href="https://github.com/uxkin/agent/actions/workflows/plugin-scan.yml"><img alt="Plugin scan" src="https://github.com/uxkin/agent/actions/workflows/plugin-scan.yml/badge.svg"></a>
  <a href="https://registry.modelcontextprotocol.io/v0/servers?search=io.github.uxkin/uxkin"><img alt="MCP Registry: io.github.uxkin/uxkin" src="https://img.shields.io/badge/MCP_Registry-io.github.uxkin%2Fuxkin-141414"></a>
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-C8F560"></a>
  <a href="https://mcpservers.org/servers/uxkin/agent"><img alt="Listed on mcpservers.org" src="https://mcpservers.org/badge.svg"></a>
  <a href="https://www.skillsdirectory.com/skills/uxkin-no-ui-slop"><img alt="Security: A (Skills Directory)" src="https://www.skillsdirectory.com/api/skills/uxkin-no-ui-slop/badge"></a>
</p>

<p align="center">

[![MCP Badge](https://lobehub.com/badge/mcp/uxkin-agent)](https://lobehub.com/mcp/uxkin-agent)

</p>

<p align="center">
  <a href="https://uxkin.com/?utm_source=github&utm_medium=readme&utm_campaign=agent_repo"><strong>Explore UXKIN →</strong></a>
</p>

<p align="center">
  <a href="https://uxkin.com?utm_source=github&utm_medium=readme">Website</a> ·
  <a href="https://uxkin.com/docs?utm_source=github&utm_medium=readme">Docs</a> ·
  <a href="https://claude.ai/directory/uxkin">Claude directory</a> ·
  <a href="https://uxkin.com/pricing?utm_source=github&utm_medium=readme">Pricing</a> ·
  <a href="https://uxkin.com/contact?utm_source=github&utm_medium=readme">Support</a>
</p>

---

## Why

Ask a coding agent for a settings screen, a paywall or a landing page and
it fills every gap with the most common choices: the same gradients, card
grids and vague copy as everyone else. UXKIN gives it something better to
work from: how real, shipped products handle the same screen or flow, and
the actual colors, type and components of real websites.

## Quick start

| What | For | Cost |
| :- | :- | :- |
| [**`no-ui-slop` skill**](#1-install-the-free-skills) | Rules that keep your agent from shipping generic, AI-looking UI | Free, no account |
| [**`uxkin-research` skill**](#1-install-the-free-skills) | How your agent finds and compares real apps, flows and design systems before it designs | [UXKIN plan](https://uxkin.com/pricing?utm_source=github&utm_medium=readme) to search (the skill itself is MIT) |
| [**UXKIN MCP server**](#2-connect-the-uxkin-mcp-server) | Your agent searches real screens, journeys and design systems while it builds | [UXKIN plan](https://uxkin.com/pricing?utm_source=github&utm_medium=readme) |
| [**UI Check GitHub Action**](https://github.com/uxkin/ui-check) | Flags dead buttons, missing states, one-off colors and accessibility basics in every pull request | Free |
| [**AI Slop Detector**](https://uxkin.com/tools/ai-slop-detector?utm_source=github&utm_medium=readme) | See how AI-generated your website looks, and what to change | Free |
| **UXKIN for Figma** | Search UXKIN, place screens and whole flows on the canvas, import a site's colors and type | Coming soon to Figma Community |
| **Browser extension** | Copy any website's colors, fonts and sizes as a DESIGN.md | Coming soon to the Chrome Web Store |

### 1. Install the free skills

```sh
npx skills add uxkin/agent
```

That installs both, or copy them into your agent's skills folder:

- [`skills/no-ui-slop`](skills/no-ui-slop/SKILL.md): how to build UI that
  fits the product. Works on its own, with no account; with the UXKIN
  server connected, it also tells your agent when to look up a real
  reference.
- [`skills/uxkin-research`](skills/uxkin-research/SKILL.md): how to research
  before designing: search the UXKIN library in plain words, open whole
  journeys, compare several apps and report what they have in common.

### 2. Connect the UXKIN MCP server

The server is hosted at `https://uxkin.com/mcp` (Streamable HTTP). Most
apps sign in with your UXKIN account: no token to copy.

| App | How |
| :- | :- |
| **Claude** (web, desktop, mobile) | Open [UXKIN in Claude's directory](https://claude.ai/directory/uxkin), click **Connect**, log in and click **Allow** |
| **Claude Code** | `claude mcp add --scope user --transport http uxkin https://uxkin.com/mcp`, then `/mcp` → uxkin → **Authenticate** |
| **Cursor** | One-click install on [uxkin.com/cursor-ui-design](https://uxkin.com/cursor-ui-design?utm_source=github&utm_medium=readme), then **Login** next to uxkin |
| **Codex** | `codex mcp add uxkin --url https://uxkin.com/mcp`, then `codex mcp login uxkin` (or install the [Codex plugin](#use-it-as-a-codex-plugin)) |
| **GitHub Copilot** (VS Code) | Command Palette → **MCP: Add Server** → HTTP → `https://uxkin.com/mcp`, then sign in when asked ([guide](https://uxkin.com/github-copilot-ui-design?utm_source=github&utm_medium=readme)) |
| **Lovable, Bolt, Devin Desktop** | Add a custom MCP server with the URL above ([Lovable](https://uxkin.com/lovable-ui-design?utm_source=github&utm_medium=readme), [Bolt](https://uxkin.com/bolt-ui-design?utm_source=github&utm_medium=readme), [Devin Desktop / Windsurf](https://uxkin.com/windsurf-ui-design?utm_source=github&utm_medium=readme)) |
| **Any other MCP client** | Use the setup prompt from [uxkin.com](https://uxkin.com?utm_source=github&utm_medium=readme) (a token sent as `Authorization: Bearer <token>`) |

Searching needs a UXKIN plan ([Monthly or Lifetime](https://uxkin.com/pricing?utm_source=github&utm_medium=readme)).
You can disconnect any app from your [account](https://uxkin.com/account?utm_source=github&utm_medium=readme).

## Try it

Once connected, ask your agent things like:

- *"Use UXKIN to find onboarding flows from real meditation apps, and tell me what they have in common."*
- *"Use UXKIN to show me how real apps handle cancelling a subscription, then improve my cancel screen."*
- *"Find a light, minimal SaaS design system on UXKIN and build my landing page hero in that style."*
- *"Before you build the paywall, look up three real paywalls on UXKIN and say which decisions you're taking from each."*

## Tools

| Tool | Returns |
| :- | :- |
| `find_ui_references` | Real iOS app screens, user journeys (multi-screen flows like onboarding or cancelling a subscription) and websites |
| `find_ui_materials` | Design systems from real websites: colors with their roles, typography, components, and the full DESIGN.md for the top match |
| `get_journey` | Every screen of one journey, in order |
| `list_collections` / `get_collection` | The references you saved into collections on uxkin.com |

All tools are read-only.

It also offers ready-made prompts your app can show as commands (in
Claude Code: `/mcp__uxkin__research_flow` and so on):

| Prompt | What it asks your agent to do |
|--------|-------------------------------|
| `research_flow` | See how real apps handle a flow (onboarding, checkout, paywall…) and recommend one |
| `find_design_system` | Find real website design systems that fit your product and mood |
| `review_my_ui` | Compare a screen in your project with real apps and suggest fixes |
| `build_from_collection` | Start from references you saved on uxkin.com |

## What's in this repository

- **The `no-ui-slop` and `uxkin-research` skills** ([`skills`](skills)).
- **The UXKIN plugin** for Claude ([`.claude-plugin`](.claude-plugin)),
  Cursor ([`.cursor-plugin`](.cursor-plugin)) and Codex
  ([`.codex-plugin`](.codex-plugin)), the Kiro power ([`POWER.md`](POWER.md)),
  the Google Antigravity plugin
  ([`plugin.json`](plugin.json)) and the Gemini CLI extension
  ([`gemini-extension.json`](gemini-extension.json)): the skill and the MCP
  server in one install.
- **The MCP server listing** ([`server.json`](server.json)), published to the
  [official MCP Registry](https://registry.modelcontextprotocol.io).
- **UXKIN's own design system** ([`DESIGN.md`](DESIGN.md)): UXKIN exports a
  DESIGN.md for every website in its library, and UXKIN itself is built from
  one. Hand it to your agent to see the format in action.
- **Where UXKIN is listed** ([`DISTRIBUTION.md`](DISTRIBUTION.md)): every
  registry, app store and directory, and where each one stands.
- **Examples** ([`examples`](examples)): config files for each app, project
  instructions for your `AGENTS.md` or `CLAUDE.md`, example prompts, and
  worked examples (account deletion, subscription cancellation, mobile
  onboarding) showing what an agent does differently with UXKIN.

### Use it as a Claude plugin

One install adds the skill and the UXKIN server. The skill works right
away; to search the library, connect the server (Claude opens a UXKIN page
where you log in and click **Allow**). In Claude Code, type `/mcp`, pick
`uxkin` and choose **Authenticate**.


In Claude Code you can also add it from GitHub directly:

```sh
claude plugin marketplace add uxkin/agent
claude plugin install uxkin@uxkin
```

### Use it as a Cursor plugin

After installing, click **Login** next to uxkin in Cursor's MCP settings,
log in to UXKIN and click **Allow**.

### Use it as a Codex plugin

```sh
codex plugin marketplace add uxkin/agent
codex plugin add uxkin@uxkin
codex mcp login uxkin
```

The last command opens a UXKIN page where you log in and click **Allow**.

### Use it as a Google Antigravity plugin

```sh
git clone https://github.com/uxkin/agent uxkin
agy plugin install ./uxkin
```

Then type `/mcp`, pick `uxkin` and choose **Authenticate**: a UXKIN page
opens where you log in and click **Allow**. To add only the server, put
[`mcp_config.json`](mcp_config.json) in `~/.gemini/config/mcp_config.json`.

### Use it as a Kiro power

In Kiro, open the **Powers** panel → **Add Custom Power** → **Import power
from GitHub**, and enter `https://github.com/uxkin/agent`. When Kiro asks
to authenticate `uxkin`, click **Authenticate**, log in to UXKIN and click
**Allow**.

### Use it as a Gemini CLI extension

```sh
gemini extensions install https://github.com/uxkin/agent
```

Then start Gemini CLI and type `/mcp auth uxkin`: a UXKIN page opens where
you log in and click **Allow**.

## What it sends

The skill runs locally and sends nothing. The MCP server receives only the
search text your agent sends (for example "onboarding for a meditation
app"), the result limit and your sign-in, and returns matching references
from uxkin.com. It doesn't read your code, files or conversation. See the
[privacy policy](https://uxkin.com/privacy?utm_source=github&utm_medium=readme).

## Documentation and support

- [Documentation](https://uxkin.com/docs?utm_source=github&utm_medium=readme): setup for every app, and what each tool returns.
- [Guides](https://uxkin.com/guides?utm_source=github&utm_medium=readme): better UI with Claude Code, Cursor, Codex, Copilot, Lovable, Bolt and more.
- [Support](https://uxkin.com/contact?utm_source=github&utm_medium=readme), or email support@uxkin.com.
- [Affiliate program](https://uxkin.com/affiliates?utm_source=github&utm_medium=readme): earn 30% of every payment from people you bring to UXKIN.

## Contributing and security

Fixes to the skill, setup steps and examples are welcome: see
[CONTRIBUTING.md](CONTRIBUTING.md). To report a security problem, see
[SECURITY.md](SECURITY.md).

## License

The skill and the files in this repository are MIT licensed. The UXKIN
library itself (its screens, journeys and design systems) is a hosted
service, not part of this repository: see the
[terms](https://uxkin.com/terms?utm_source=github&utm_medium=readme). The MIT license covers the code and text
here; it doesn't grant use of the UXKIN name or logo.
