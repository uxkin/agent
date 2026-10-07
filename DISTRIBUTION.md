# Where UXKIN is distributed

Every place people can find or install UXKIN, and where each one stands.
This file is the checklist: when a listing goes live, changes or needs
updating, it changes here in the same commit.

## What gets distributed

| Piece | Source of truth | Mirrors |
|-------|-----------------|---------|
| MCP server | `https://uxkin.com/mcp` (sign in with UXKIN, or a UXKIN agent token) | [`server.json`](server.json), [`.well-known/mcp/server-card.json`](https://uxkin.com/.well-known/mcp/server-card.json) |
| `no-ui-slop` skill | [`uxkin.com/.well-known/agent-skills/`](https://uxkin.com/.well-known/agent-skills/index.json) | [`skills/no-ui-slop`](skills/no-ui-slop) (checked weekly by the *Skill matches uxkin.com* workflow) |
| Plugins | This repository | Claude, Cursor, Codex, Gemini CLI and Antigravity packaging below |
| Browser extension | The UXKIN site repository | Chrome Web Store |
| Figma plugin | The UXKIN site repository | Figma Community |

Production (uxkin.com) always wins: if a copy here differs from what
uxkin.com serves, the copy here is the one to fix.

## Status

**Live**: anyone can find or install it today. **In review**: submitted,
waiting for the store. **To do**: not submitted yet. **Automatic**: picked
up from another listing, nothing to submit, just confirm it appeared.

### Our own

| Where | What | Status |
|-------|------|--------|
| [uxkin.com](https://uxkin.com) | Setup steps for each app, the setup prompt, docs at [/docs](https://uxkin.com/docs) | Live |
| [GitHub: uxkin/agent](https://github.com/uxkin/agent) | Skill, plugins, `server.json`, `DESIGN.md`, examples | Live |
| [uxkin.com/status](https://uxkin.com/status) | Public status of the library, sign-in, the MCP server and payments | Live |

### MCP registries

| Where | How it gets there | Status |
|-------|-------------------|--------|
| [Official MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=io.github.uxkin) | `server.json`, published by the *Publish to MCP Registry* workflow | Live as `io.github.uxkin/uxkin` |
| GitHub MCP Registry (github.com/mcp) | Curated by GitHub from the official registry | To check |
| Glama | Reads the official registry | Live: claimed, OAuth health check passing |
| PulseMCP | Reads the official registry | Automatic: confirm |
| mcp.directory | Reads the official registry, or its submit form | Automatic: confirm |
| Smithery | Publish page at smithery.ai/new | Listed: confirm it's current |
| MCP Market (mcpmarket.com) | Submit form | Submitted Oct 7 (server and skill, free queue) |
| MCPServers.org | Submit form at mcpservers.org/submit | Live ([mcpservers.org/servers/uxkin/agent](https://mcpservers.org/servers/uxkin/agent)) |
| Cline MCP Marketplace | GitHub issue on cline/mcp-marketplace, with [`assets/logo-400.png`](assets/logo-400.png); Cline sets it up from [`llms-install.md`](llms-install.md) | Submitted Oct 7 |

| Smithery | Publish page (remote server URL) | To do |
| PulseMCP, LobeHub, mcpserver.dev, mcprepository | Copied from the official registry or GitHub | Automatic: check a week after Oct 7 |

### Plugin and skill directories

| Where | How it gets there | Status |
|-------|-------------------|--------|
| Claude Code plugin marketplace | [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json): `claude plugin marketplace add uxkin/agent` | Live |
| Copilot CLI plugin marketplace | [`.github/plugin/marketplace.json`](.github/plugin/marketplace.json): `copilot plugin marketplace add uxkin/agent` | Live |
| Claude Plugin Hub | Indexes plugin marketplaces on GitHub | Automatic: check a week after Oct 7 |
| Skills Directory (skillsdirectory.com) | Submit form; security-grades each skill | To do |
| Build with Claude, Tons of Skills, Agentic Awesome Skills, Tech Leads Club agent-skills | Pull request or issue on GitHub | To do |
| awesome-mcp-list, awesome-ai-tools-for-ui, awesome-ai-plugins | Pull request on GitHub | To do |
| DezignHunt (design tools) | Submit form | To do |

### AI apps

| Where | What | Status |
|-------|------|--------|
| Claude (connector directory) | The UXKIN connector: Claude app, Claude Code, Claude Desktop | Live |
| Claude (plugin directory) | The UXKIN plugin, version 1.2.2 | Update in review |
| Codex | Plugin from this repo: `codex plugin marketplace add uxkin/agent` | Live from GitHub; OpenAI directory listing in review |
| Cursor | The UXKIN plugin ([`.cursor-plugin`](.cursor-plugin)) and a one-click install link on uxkin.com | One-click link live; plugin directory in review |
| GitHub Copilot (VS Code) | One-click "Add to VS Code" link on uxkin.com | Live |
| GitHub Copilot CLI | Plugin from this repo ([`.github/plugin`](.github/plugin)): `copilot plugin install uxkin/agent` | Live from GitHub |
| [Awesome Copilot](https://github.com/github/awesome-copilot) | The plugin, through the external plugin issue form (passes their lint, install and version checks) | Submitted Oct 7 (github/awesome-copilot#4626): passed intake, waiting for maintainer review |
| Gemini CLI | `gemini extensions install https://github.com/uxkin/agent` | Live from GitHub; gallery topic added Oct 7 |
| Google Antigravity | Steps on uxkin.com; plugin from this repo | Live from GitHub; marketplace interest form sent Oct 7 |
| Kiro | Power from this repo ([`POWER.md`](POWER.md), [`steering/`](steering)): Powers → Add Custom Power → Import from GitHub | Live from GitHub; Kiro's curated directory has no public submission yet |
| Devin Desktop (Windsurf), Lovable, Bolt | Setup guides on uxkin.com | Live |

### Skills

| Where | What | Status |
|-------|------|--------|
| `npx skills add uxkin/agent` (skills.sh) | The skill, installable into most coding agents | Live |
| `npx skills add https://uxkin.com` | The same skill, straight from uxkin.com | Live |
| Skill collections on GitHub | Pull requests to community skill lists | To do: pick the active ones |

### Design tools and browsers

| Where | What | Status |
|-------|------|--------|
| Figma Community | UXKIN for Figma | Live; new version (code sign-in) in review |
| Chrome Web Store | UXKIN.com extension: copy any website's colors, fonts and sizes as a DESIGN.md | In review |

## Keeping listings right

- **Version bumps**: change `version` in `server.json` and the plugin
  manifests together; the registry workflow republishes on push.
- **Tool changes**: the server card, `server.json` description, README
  tool table and the store descriptions all name the five tools
  (`find_ui_references`, `find_ui_materials`, `get_journey`,
  `list_collections`, `get_collection`).
- **Wording**: every listing uses the same one-line description:
  *Real UI references for coding agents: iOS app screens, user journeys
  and website design systems.*
- **Links**: listings point to https://uxkin.com, never to a page that
  only exists for one store.
