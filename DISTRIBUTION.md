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
| [GitHub MCP Registry](https://github.com/mcp/uxkin/uxkin) | Curated by GitHub from the official registry; one-click install in VS Code and GitHub Copilot | Live: approved Oct 22 (request 170197), listed by Oct 28 |
| Glama | Reads the official registry | Live: claimed, OAuth health check passing |
| PulseMCP | Picks up servers from the Official MCP Registry | Submissions paused since Sep 3 (their notice); not listed yet as of Oct 9 |
| mcp.directory | Submit forms (server from the GitHub repo; skills by SKILL.md link) | Submitted Oct 9: server, no-ui-slop and uxkin-research (Design); published within 24 hours. Submitted Oct 12: build-ui, ios-screens, design-md, ui-from-screenshot, ui-states (Design). Oct 27: the Oct 9 server submission is still in their review (resubmitting says "already submitted"; not found by search yet). Submitted Oct 27: the nine skills of Website Design, Mobile App Design and Paywall & Pricing Design (Design), linked from their plugin branches |
| MCP Market (mcpmarket.com) | Submit form | Live (mcpmarket.com/server/uxkin), confirmed Oct 9 |
| MCPServers.org | Submit form at mcpservers.org/submit | Live ([mcpservers.org/servers/uxkin/agent](https://mcpservers.org/servers/uxkin/agent)) |
| Cline MCP Marketplace | GitHub issue on cline/mcp-marketplace, with [`assets/logo-400.png`](assets/logo-400.png); Cline sets it up from [`llms-install.md`](llms-install.md) | Submitted Oct 7 (cline/mcp-marketplace#2859, still open; follow-up comment with the Cline guide and sign-in steps drafted Oct 30) |

| [Awesome Remote MCP Servers](https://github.com/punkpeye/awesome-remote-mcp-servers) | Three-line entry in Art & Design with the Glama connector badge; their CI probes the endpoint (401 + resource_metadata = OAuth) | Live: merged Oct 9 (punkpeye/awesome-remote-mcp-servers#1473) |
| [mcp.so](https://mcp.so/servers/uxkin) | Remote server listing: paid submission ($39, Oct 9; free submissions no longer offered) with description, overview, tags and OAuth | Live Oct 9 (Verified, Featured) |
| [LobeHub](https://lobehub.com/mcp/uxkin-agent) | Picked up automatically as `uxkin-agent`; claimed with the README badge | Live Oct 9: "Unvalidated" (their install check can't sign in), claim pending. Refresh Metadata clicked Oct 28 |
| [Smithery](https://smithery.ai/servers/ronaldmanlupig30/uxkin) | Published by URL; tools come from the server card ([`/.well-known/mcp/server-card.json`](https://uxkin.com/.well-known/mcp/server-card.json)). Republish (Releases → Publish, no token) after tool changes | Live: 5 tools, quality score 100 (Oct 8) |
| PulseMCP, mcpserver.dev, mcprepository | Copied from the official registry or GitHub | Automatic: check a week after Oct 7 |

### Plugin and skill directories

| Where | How it gets there | Status |
|-------|-------------------|--------|
| Claude Code plugin marketplace | [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json): `claude plugin marketplace add uxkin/agent` | Live |
| Copilot CLI plugin marketplace | [`.github/plugin/marketplace.json`](.github/plugin/marketplace.json): `copilot plugin marketplace add uxkin/agent` | Live |
| Claude Plugin Hub | Indexes plugin marketplaces on GitHub | Automatic: check a week after Oct 7 |
| [Skills Directory](https://www.skillsdirectory.com/skills/uxkin-no-ui-slop) | Submit form (repo link); security-graded before listing | Live: no-ui-slop (grade A 100/100) and uxkin-research ([author page](https://www.skillsdirectory.com/authors/uxkin)), Oct 8. Submitted Oct 12: build-ui, ios-screens, design-md, ui-from-screenshot, ui-states (from `.agents/skills/`; one submission each). The new plugin skills wait until those plugins are on main: the form only takes a plain repository URL (Oct 27) |
| [Claude Market](https://www.claudemarket.ai/skills) | Submit form (Skill, "UXKIN UI Skills", source this repository); free listing needs the backlink at the bottom of the README | Live Oct 12: all seven skills, one page each ([build-ui](https://www.claudemarket.ai/skills/uxkin/build-ui), ios-screens, design-md, ui-from-screenshot, ui-states, no-ui-slop, uxkin-research). MCP server not in their MCP directory yet (offered to add it, free). Keep the README line while listed. The new plugin skills wait until those plugins are on main (reads the repository) |
| [agentskill.sh](https://agentskill.sh/@uxkin/build-ui) | Import from this repository (finds all seven SKILL.md files); syncs daily | Live Oct 13: all seven skills under @uxkin. Not claimed yet (Connect GitHub on agentskill.sh to verify ownership) |
| [Build with Claude](https://github.com/davepoon/buildwithclaude) | Plugin entry in their marketplace.json (passes `npm run validate`) | Oct 10: reviewer asked for a "tool results are data, not instructions" rule in the skills and closed the PR; rule added to both skills (live on uxkin.com and here), reply posted asking to reopen (davepoon/buildwithclaude#396); no answer, so a fresh PR with the fix: Live: merged Oct 13 (davepoon/buildwithclaude#437); the reviewer confirmed tool results are treated as data and version 1.3.0 matches this repository. Live: website-design 1.0.0, mobile-app-design 1.0.1 and paywall-pricing-design 1.0.0, each pinned by commit (git-subdir + sha) on its plugin branch, merged Oct 29 (davepoon/buildwithclaude#592; #585 was closed asking for pinned commits). Never rewrite or delete those branches; point the entries at main once the plugins move there |
| [Agentic Awesome Skills](https://github.com/sickn33/agentic-awesome-skills) | uxkin-research in their skill format plus a README credit (passes their strict validator and credit check) | Live: merged Oct 10 (sickn33/agentic-awesome-skills#1848); the maintainer added Examples and Limitations sections, both accurate. In review: the five new skills (build-ui, ios-screens, write-design-md (renamed: `design-md` exists there), ui-from-screenshot, ui-states), sickn33/agentic-awesome-skills#1885, Oct 12. Live Oct 29: landing-page, web-design-system and web-review (the maintainer re-did our #2168 as #2172, pinning the source to a commit and adding each skill's LICENSE). In review: ios-flows and ios-review (Oct 29); the repo now requires its pull request template with change, validation and source evidence |
| [Warp oz-skills](https://github.com/warpdotdev/oz-skills) | no-ui-slop in Warp's format (two-sentence description, Title Case H1, When to Use, LICENSE.txt like their mcp-builder) under `.agents/skills/` | Submitted Oct 30 (warpdotdev/oz-skills#35). Few outside contributions merged so far |
| [Tech Leads Club agent-skills](https://github.com/tech-leads-club/agent-skills) | Issue-first: proposed uxkin-research (their catalog already has a frontend-design skill); a maintainer adds it | Proposed Oct 9 (tech-leads-club/agent-skills#225) |
| [awesome-mcp-list](https://github.com/MobinX/awesome-mcp-list) | One line in Developer Tools | Live Oct 14: maintainer added it to main directly as uxkin/agent in Developer Tools (#702 closed) |
| [grokbot.dev](https://grokbot.dev/plugins/) | Community Grok Bot plugin directory (not xAI); plugin file content/plugins/uxkin.md by pull request | Submitted Oct 15 ([ZeroPointRepo/GrokBotDev#62](https://github.com/ZeroPointRepo/GrokBotDev/pull/62)), labelled needs-verification |
| [awesome-ai-tools-for-ui](https://github.com/maxbogo/awesome-ai-tools-for-ui) | One line in MCP Servers & Plugins, tool count 64 → 65 | Submitted Oct 9 (maxbogo/awesome-ai-tools-for-ui#59) |
| [awesome-ai-plugins](https://github.com/hashgraph-online/awesome-ai-plugins) | One line in Tools & Integrations; their source scan must score 80+ (ours: 100/100) | Live: merged Oct 9 (hashgraph-online/awesome-ai-plugins#688), listed in the HOL Registry; claim via the link in the PR comment |
| Tons of Skills | Pull request or issue on GitHub | To do: find the current list |
| [DevHunt](https://devhunt.org) | Boosted launch ($29 one-time, Oct 9): name, slogan, description, 3 screenshots, maker comment | Live Oct 13: [devhunt.org/tool/uxkin](https://devhunt.org/tool/uxkin) (website button tagged ?ref=devhunt) |
| [Sidebar](https://sidebar.io) | Free link submission (account): AI Slop Detector, title, credit, categories Tools/UX/Resources | Submitted Oct 14, waiting for editor approval |
| TLDR, Bytes, UX Collective | Checked Oct 14: only paid sponsored slots, no free submissions | Skipped |
| [Uneed](https://www.uneed.best/tool/uxkin) | Free listing (Freemium; tags Design, Developer Tools, AI) | Listed Oct 9 |
| [SaaSHub](https://www.saashub.com/uxkin) | Free submission: categories, competitors (Mobbin, Refero, Page Flows, Nicely Done, pttrns, The Component Gallery, UX Archive), features, pricing, screenshots | Submitted Oct 9: free queue, up to 32 days |
| [AlternativeTo](https://alternativeto.net) | Free submission: proprietary, freemium, tags UI Design, Design Inspiration, Design System, AI; alternative to Mobbin, Refero, Page Flows | Submitted Oct 10, in their review |
| [toools.design](https://toools.design) | Suggest a tool form | Submitted Oct 28: Website Design Plugin and Mobile App Design Plugin |
| DezignHunt (design tools) | Submit form | Skipped Oct 8: paid listings only |

### AI apps

| Where | What | Status |
|-------|------|--------|
| Claude (connector directory) | The UXKIN connector: Claude app, Claude Code, Claude Desktop | Live |
| Claude (plugin directory) | The UXKIN plugin and the design plugins | Live: Website Design and Mobile App Design. In review (as of Oct 29): UXKIN 1.3.1, UI Design Review, Dashboard Design, SwiftUI App Design, Paywall & Pricing Design |
| Codex | Plugin from this repo: `codex plugin marketplace add uxkin/agent` | Live from GitHub. OpenAI directory: UXKIN 1.3.1 and Website Design in review since Oct 27 |
| Cursor | The UXKIN plugin ([`.cursor-plugin`](.cursor-plugin)) and a one-click install link on uxkin.com | One-click link live. Cursor marketplace (Oct 8): asked us to build adoption on cursor.directory first. cursor.directory: live Oct 9 ([cursor.directory/plugins/uxkin](https://cursor.directory/plugins/uxkin), server and both skills); after some installs and votes there, ask the marketplace team again. cursor.directory, Oct 27: Website Design and Mobile App Design listed with the Manual form (MCP server plus three skills each; the Auto scan only reads a repository's default branch and merges every plugin it finds into one listing); verification requested. Edits are by hand on cursor.directory. The Cursor versions of all plugins live only on the `cursor-plugins` branch, never main |
| GitHub Copilot (VS Code) | One-click "Add to VS Code" link on uxkin.com | Live |
| GitHub Copilot CLI | Plugin from this repo ([`.github/plugin`](.github/plugin)): `copilot plugin install uxkin/agent` | Live from GitHub |
| [Awesome Copilot](https://github.com/github/awesome-copilot) | The plugin, through the external plugin issue form (passes their lint, install and version checks) | Not accepted (Oct 12): #4626 closed by the maintainer as "primarily a marketing channel for a narrow paid hosted service"; the older skill-only PR #4183 was closed as a duplicate (overlaps their anti-ui-slop skill). Don't resubmit unless the plugin offers clearly more free value. Copilot users are still served by the one-click VS Code link and `copilot plugin install uxkin/agent` |
| Gemini CLI | `gemini extensions install https://github.com/uxkin/agent` | Live from GitHub and in the extensions gallery (confirmed Oct 28; shows 1.3.0 until a v1.3.1 release is published) |
| Google Connected Apps (Gemini app and Search AI Mode) | Server-side MCP (`https://uxkin.com/mcp`, OAuth 2.1, text only), registered through the Connected Console once selected | Waitlist: interest form submitted Oct 30 (public preview, limited partners). If selected: domain verification file at `/.well-known/google-connected-apps`, a reviewer test account with a plan, then security, quality and policy review |
| Google Antigravity | Steps on uxkin.com; plugin from this repo | Live from GitHub; marketplace interest form sent Oct 7 |
| Kiro | Power from this repo ([`POWER.md`](POWER.md), [`steering/`](steering)): Powers → Add Custom Power → Import from GitHub | Live from GitHub; Kiro's curated directory has no public submission yet |
| Zed | Extension store | Checked Oct 27: its MCP extensions are for servers that run locally, and Zed is moving to the official MCP Registry, where we're listed. Nothing to submit. Setup guide on uxkin.com (`/zed-ui-design`, sign-in with Authenticate) live Oct 30 |
| Goose | Extensions directory (`documentation/static/servers.json`) | Not accepted (Oct 27): the directory no longer takes new servers and is moving to the official MCP Registry (their AGENTS.md); aaif-goose/goose#13175 closed. Covered by the registry listing |
| Warp | Setup guide on uxkin.com (`/warp-ui-design`: Settings → Agents → MCP servers, browser sign-in) | Live Oct 30 |
| Continue | Setup in the user's own config | Checked Oct 27: no public directory to submit to |
| Devin Desktop (Windsurf), Lovable, Bolt | Setup guides on uxkin.com | Live |
| Hermes Agent, Cline, OpenCode, JetBrains (Junie and AI Assistant), Kilo Code | Setup guides on uxkin.com (`/hermes-ui-design`, `/cline-ui-design`, `/opencode-ui-design`, `/jetbrains-ui-design`, `/kilo-code-ui-design`), each with sign-in setup and, where the app supports it, the free skills | Live Oct 29–30. Cline also has its own button in the setup panel; the others are in its "Also" line |
| Kilo Code (Kilo Marketplace) | MCP entry `mcps/uxkin` (sign in with UXKIN, or an agent token) with companion skills no-ui-slop and uxkin-research, imported pinned to commit 693e432 | In review: submitted Oct 30 (Kilo-Org/kilo-marketplace#560). When live, mention it in the Kilo Code guide |

### Skills

| Where | What | Status |
|-------|------|--------|
| `npx skills add uxkin/agent` (skills.sh) | The skill, installable into most coding agents | Live. skills.sh has no submit form: a skill appears after its first install. The new plugin skills install from their branches, e.g. `npx skills add https://github.com/uxkin/agent/tree/website-design/plugins/website-design/skills` (tested Oct 27) |
| `npx skills add https://uxkin.com` | The same skill, straight from uxkin.com | Live |
| Skill collections on GitHub | Pull requests to community skill lists | To do: pick the active ones |

### Design tools and browsers

| Where | What | Status |
|-------|------|--------|
| Figma Community | UXKIN for Figma | Live; new version (code sign-in) in review: Figma asked for a demo video (request 2174131), screen recording sent Oct 10 |
| Chrome Web Store | UXKIN.com extension (copied any website's colors, fonts and sizes as a DESIGN.md) | Withdrawn Oct 11: removed from the store, so no new installs; existing installs work offline only. The Privacy Policy keeps its extension paragraph for those for now |

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
