# UXKIN

Real UI references for coding agents. [UXKIN](https://uxkin.com) gives
Claude, Cursor, Codex, GitHub Copilot and any other MCP client real iOS
app screens, user journeys and website design systems (with a DESIGN.md
for every site), so the UI they build looks like a real product instead
of AI defaults.

This repository holds UXKIN's public agent pieces:

- **The MCP server listing** (`server.json`), published to the
  [official MCP Registry](https://registry.modelcontextprotocol.io).
- **The `no-ui-slop` skill** (`skills/no-ui-slop`), free and usable
  without an account.

## Connect the MCP server

The server is hosted at `https://uxkin.com/mcp` (Streamable HTTP) and
needs a UXKIN plan ([Monthly or Lifetime](https://uxkin.com/pricing)).
Apps that support MCP sign-in (OAuth), like Claude and Claude Code,
connect with just the URL: they open a UXKIN page where you click
**Allow**. Other clients use a UXKIN agent token, sent as
`Authorization: Bearer <token>` (or an `X-UXKIN-Token` header). Log in
at [uxkin.com](https://uxkin.com) to get your token and a ready-made
setup prompt for your agent. Setup guides:
[Claude Code](https://uxkin.com/claude-code-ui-design),
[Cursor](https://uxkin.com/cursor-ui-design),
[Codex](https://uxkin.com/codex-ui-design),
[GitHub Copilot](https://uxkin.com/github-copilot-ui-design),
[any MCP client](https://uxkin.com/ui-design-mcp).

Tools:

- `find_ui_references`: real iOS app screens, user journeys
  (multi-screen flows like onboarding or cancelling a subscription) and
  websites.
- `find_ui_materials`: design systems from real websites: colors with
  their roles, typography, components and the full DESIGN.md.
- `get_journey`: every screen of one journey from a search, in order.
- `list_collections` / `get_collection`: the references you saved into
  collections on uxkin.com.

## Use it as a Claude plugin

This repository is also a Claude plugin (`uxkin`): one install adds the
`no-ui-slop` skill and the UXKIN MCP server.

- **Claude, Claude Code and Cowork:** the skill works right away. To
  search the library, connect the UXKIN server: Claude opens a UXKIN
  page where you log in and click **Allow** (no token to copy). In
  Claude Code, type `/mcp`, pick `uxkin` and choose **Authenticate**.
  Searching needs a UXKIN plan; you can disconnect from your
  [account](https://uxkin.com/account) any time.

## Install the skill

```sh
npx skills add uxkin/agent
```

Or copy [`skills/no-ui-slop/SKILL.md`](skills/no-ui-slop/SKILL.md) into
your agent's skills folder. It's free and works on its own. With a
UXKIN plan and the MCP server connected, your agent can also search
real app screens, user journeys and website design systems while it
builds.

## What it sends

The skill runs locally and sends nothing. The MCP server receives only
the search text your agent sends (for example "onboarding for a
meditation app"), the result limit and your sign-in or token, and returns matching
references from uxkin.com. It doesn't read your code, files or
conversation. See the [privacy policy](https://uxkin.com/privacy).

## Also from UXKIN

[uxkin/ui-check](https://github.com/uxkin/ui-check): a free GitHub
Action that checks each pull request's UI changes for controls that do
nothing, missing states, one-off colors and accessibility basics.

## License

The skill and the files in this repository are MIT licensed. The UXKIN
library itself is a hosted service: see the
[terms](https://uxkin.com/terms).
