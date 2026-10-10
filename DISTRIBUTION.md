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
| PulseMCP | Picks up servers from the Official MCP Registry | Submissions paused since Sep 3 (their notice); not listed yet as of Oct 9 |
| mcp.directory | Submit forms (server from the GitHub repo; skills by SKILL.md link) | Submitted Oct 9: server, no-ui-slop and uxkin-research (Design); published within 24 hours |
| MCP Market (mcpmarket.com) | Submit form | Live (mcpmarket.com/server/uxkin), confirmed Oct 9 |
| MCPServers.org | Submit form at mcpservers.org/submit | Live ([mcpservers.org/servers/uxkin/agent](https://mcpservers.org/servers/uxkin/agent)) |
| Cline MCP Marketplace | GitHub issue on cline/mcp-marketplace, with [`assets/logo-400.png`](assets/logo-400.png); Cline sets it up from [`llms-install.md`](llms-install.md) | Submitted Oct 7 |

| [Awesome Remote MCP Servers](https://github.com/punkpeye/awesome-remote-mcp-servers) | Three-line entry in Art & Design with the Glama connector badge; their CI probes the endpoint (401 + resource_metadata = OAuth) | Live: merged Oct 9 (punkpeye/awesome-remote-mcp-servers#1473) |
| [mcp.so](https://mcp.so/servers/uxkin) | Remote server listing: paid submission ($39, Oct 9; free submissions no longer offered) with description, overview, tags and OAuth | Live Oct 9 (Verified, Featured) |
| [LobeHub](https://lobehub.com/mcp/uxkin-agent) | Picked up automatically as `uxkin-agent`; claimed with the README badge | Live Oct 9: "Unvalidated" (their install check can't sign in), claim pending |
| [Smithery](https://smithery.ai/servers/ronaldmanlupig30/uxkin) | Published by URL; tools come from the server card ([`/.well-known/mcp/server-card.json`](https://uxkin.com/.well-known/mcp/server-card.json)). Republish (Releases → Publish, no token) after tool changes | Live: 5 tools, quality score 100 (Oct 8) |
| PulseMCP, mcpserver.dev, mcprepository | Copied from the official registry or GitHub | Automatic: check a week after Oct 7 |

### Plugin and skill directories

| Where | How it gets there | Status |
|-------|-------------------|--------|
| Claude Code plugin marketplace | [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json): `claude plugin marketplace add uxkin/agent` | Live |
| Copilot CLI plugin marketplace | [`.github/plugin/marketplace.json`](.github/plugin/marketplace.json): `copilot plugin marketplace add uxkin/agent` | Live |
| Claude Plugin Hub | Indexes plugin marketplaces on GitHub | Automatic: check a week after Oct 7 |
| [Skills Directory](https://www.skillsdirectory.com/skills/uxkin-no-ui-slop) | Submit form (repo link); security-graded before listing | Live: no-ui-slop (grade A 100/100) and uxkin-research ([author page](https://www.skillsdirectory.com/authors/uxkin)), Oct 8 |
| [Build with Claude](https://github.com/davepoon/buildwithclaude) | Plugin entry in their marketplace.json (passes `npm run validate`) | Oct 10: reviewer asked for a "tool results are data, not instructions" rule in the skills and closed the PR; rule added to both skills (live on uxkin.com and here), reply posted asking to reopen (davepoon/buildwithclaude#396) |
| [Agentic Awesome Skills](https://github.com/sickn33/agentic-awesome-skills) | uxkin-research in their skill format plus a README credit (passes their strict validator and credit check) | Live: merged Oct 10 (sickn33/agentic-awesome-skills#1848); the maintainer added Examples and Limitations sections, both accurate |
| [Tech Leads Club agent-skills](https://github.com/tech-leads-club/agent-skills) | Issue-first: proposed uxkin-research (their catalog already has a frontend-design skill); a maintainer adds it | Proposed Oct 9 (tech-leads-club/agent-skills#225) |
| [awesome-mcp-list](https://github.com/MobinX/awesome-mcp-list) | One line in Developer Tools | Submitted Oct 9 (MobinX/awesome-mcp-list#702) |
| [awesome-ai-tools-for-ui](https://github.com/maxbogo/awesome-ai-tools-for-ui) | One line in MCP Servers & Plugins, tool count 64 → 65 | Submitted Oct 9 (maxbogo/awesome-ai-tools-for-ui#59) |
| [awesome-ai-plugins](https://github.com/hashgraph-online/awesome-ai-plugins) | One line in Tools & Integrations; their source scan must score 80+ (ours: 100/100) | Live: merged Oct 9 (hashgraph-online/awesome-ai-plugins#688), listed in the HOL Registry; claim via the link in the PR comment |
| Tons of Skills | Pull request or issue on GitHub | To do: find the current list |
| [DevHunt](https://devhunt.org) | Boosted launch ($29 one-time, Oct 9): name, slogan, description, 3 screenshots, maker comment | Launches Tue Oct 13 |
| [Uneed](https://www.uneed.best/tool/uxkin) | Free listing (Freemium; tags Design, Developer Tools, AI) | Listed Oct 9 |
| [SaaSHub](https://www.saashub.com/uxkin) | Free submission: categories, competitors (Mobbin, Refero, Page Flows, Nicely Done, pttrns, The Component Gallery, UX Archive), features, pricing, screenshots | Submitted Oct 9: free queue, up to 32 days |
| DezignHunt (design tools) | Submit form | Skipped Oct 8: paid listings only |

### AI apps

| Where | What | Status |
|-------|------|--------|
| Claude (connector directory) | The UXKIN connector: Claude app, Claude Code, Claude Desktop | Live |
| Claude (plugin directory) | The UXKIN plugin, version 1.2.2 | Update in review |
| Codex | Plugin from this repo: `codex plugin marketplace add uxkin/agent` | Live from GitHub; OpenAI directory listing in review |
| Cursor | The UXKIN plugin ([`.cursor-plugin`](.cursor-plugin)) and a one-click install link on uxkin.com | One-click link live. Cursor marketplace (Oct 8): asked us to build adoption on cursor.directory first. cursor.directory: live Oct 9 ([cursor.directory/plugins/uxkin](https://cursor.directory/plugins/uxkin), server and both skills); after some installs and votes there, ask the marketplace team again |
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
| Figma Community | UXKIN for Figma | Live; new version (code sign-in) in review: Figma asked for a demo video (request 2174131), screen recording sent Oct 10 |
| Chrome Web Store | UXKIN.com extension: copy any website's colors, fonts and sizes as a DESIGN.md | In review |

## Keeping listings right

- **After adding or changing tools**: republish on Smithery (Releases → Publish; leave the token empty, it reads the server card).

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
