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
  <a href="https://uxkin.com">Website</a> ·
  <a href="https://uxkin.com/docs">Docs</a> ·
  <a href="https://claude.ai/directory/uxkin">Claude directory</a> ·
  <a href="https://uxkin.com/pricing">Pricing</a> ·
  <a href="https://uxkin.com/contact">Support</a>
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
| [**`no-ui-slop` skill**](#1-install-the-free-no-ui-slop-skill) | Rules that keep your agent from shipping generic, AI-looking UI | Free, no account |
| [**UXKIN MCP server**](#2-connect-the-uxkin-mcp-server) | Your agent searches real screens, journeys and design systems while it builds | [UXKIN plan](https://uxkin.com/pricing) |
| [**UI Check GitHub Action**](https://github.com/uxkin/ui-check) | Flags dead buttons, missing states, one-off colors and accessibility basics in every pull request | Free |
| [**AI Slop Detector**](https://uxkin.com/tools/ai-slop-detector) | See how AI-generated your website looks, and what to change | Free |
| **UXKIN for Figma** | Search UXKIN, place screens and whole flows on the canvas, import a site's colors and type | Coming soon to Figma Community |
| **Browser extension** | Copy any website's colors, fonts and sizes as a DESIGN.md | Coming soon to the Chrome Web Store |

### 1. Install the free no-ui-slop skill

```sh
npx skills add uxkin/agent
```

Or copy [`skills/no-ui-slop/SKILL.md`](skills/no-ui-slop/SKILL.md) into
your agent's skills folder. It works on its own, with no account. With
the UXKIN server connected, it also tells your agent when to look up a
real reference.

### 2. Connect the UXKIN MCP server

The server is hosted at `https://uxkin.com/mcp` (Streamable HTTP). Most
apps sign in with your UXKIN account: no token to copy.

| App | How |
| :- | :- |
| **Claude** (web, desktop, mobile) | Open [UXKIN in Claude's directory](https://claude.ai/directory/uxkin), click **Connect**, log in and click **Allow** |
| **Claude Code** | `claude mcp add --scope user --transport http uxkin https://uxkin.com/mcp`, then `/mcp` → uxkin → **Authenticate** |
| **Cursor** | One-click install on [uxkin.com/cursor-ui-design](https://uxkin.com/cursor-ui-design), then **Login** next to uxkin |
| **Codex** | `codex mcp add uxkin --url https://uxkin.com/mcp`, then `codex mcp login uxkin` (or install the [Codex plugin](#use-it-as-a-codex-plugin)) |
| **GitHub Copilot** (VS Code) | Command Palette → **MCP: Add Server** → HTTP → `https://uxkin.com/mcp`, then sign in when asked ([guide](https://uxkin.com/github-copilot-ui-design)) |
| **Lovable, Bolt, Devin Desktop** | Add a custom MCP server with the URL above ([Lovable](https://uxkin.com/lovable-ui-design), [Bolt](https://uxkin.com/bolt-ui-design), [Devin Desktop / Windsurf](https://uxkin.com/windsurf-ui-design)) |
| **Any other MCP client** | Use the setup prompt from [uxkin.com](https://uxkin.com) (a token sent as `Authorization: Bearer <token>`) |

Searching needs a UXKIN plan ([Monthly or Lifetime](https://uxkin.com/pricing)).
You can disconnect any app from your [account](https://uxkin.com/account).

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

## What's in this repository

- **The `no-ui-slop` skill** ([`skills/no-ui-slop`](skills/no-ui-slop)).
- **The UXKIN plugin** for Claude ([`.claude-plugin`](.claude-plugin)),
  Cursor ([`.cursor-plugin`](.cursor-plugin)) and Codex
  ([`.codex-plugin`](.codex-plugin)): the skill and the MCP server in one
  install.
- **The MCP server listing** ([`server.json`](server.json)), published to the
  [official MCP Registry](https://registry.modelcontextprotocol.io).
- **Examples** ([`examples`](examples)): config files for each app, project
  instructions for your `AGENTS.md` or `CLAUDE.md`, and example prompts.

### Use it as a Claude plugin

One install adds the skill and the UXKIN server. The skill works right
away; to search the library, connect the server (Claude opens a UXKIN page
where you log in and click **Allow**). In Claude Code, type `/mcp`, pick
`uxkin` and choose **Authenticate**.

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

## What it sends

The skill runs locally and sends nothing. The MCP server receives only the
search text your agent sends (for example "onboarding for a meditation
app"), the result limit and your sign-in, and returns matching references
from uxkin.com. It doesn't read your code, files or conversation. See the
[privacy policy](https://uxkin.com/privacy).

## Documentation and support

- [Documentation](https://uxkin.com/docs): setup for every app, and what each tool returns.
- [Guides](https://uxkin.com/guides): better UI with Claude Code, Cursor, Codex, Copilot, Lovable, Bolt and more.
- [Support](https://uxkin.com/contact), or email support@uxkin.com.
- [Affiliate program](https://uxkin.com/affiliates): earn 30% of every payment from people you bring to UXKIN.

## Contributing and security

Fixes to the skill, setup steps and examples are welcome: see
[CONTRIBUTING.md](CONTRIBUTING.md). To report a security problem, see
[SECURITY.md](SECURITY.md).

## License

The skill and the files in this repository are MIT licensed. The UXKIN
library itself is a hosted service: see the [terms](https://uxkin.com/terms).
