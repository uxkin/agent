# Examples

Ready-to-use files for connecting UXKIN and getting good results from it.

## Connect

The UXKIN MCP server is at `https://uxkin.com/mcp`. Most apps sign in with
your UXKIN account the first time they use it, so there's no token to
copy.

| File | App | Where it goes |
| :- | :- | :- |
| [`connect/claude-code.mcp.json`](connect/claude-code.mcp.json) | Claude Code | `.mcp.json` in your project, then `/mcp` → uxkin → **Authenticate** |
| [`connect/cursor.mcp.json`](connect/cursor.mcp.json) | Cursor | `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json`, then **Login** next to uxkin |
| [`connect/codex.config.toml`](connect/codex.config.toml) | Codex | `~/.codex/config.toml`, then `codex mcp login uxkin` |
| [`connect/antigravity.mcp_config.json`](connect/antigravity.mcp_config.json) | Google Antigravity (app, IDE and CLI) | `~/.gemini/config/mcp_config.json`, then `/mcp` → uxkin → **Authenticate** |
| [`connect/gemini.settings.json`](connect/gemini.settings.json) | Gemini CLI | `~/.gemini/settings.json`, then `/mcp auth uxkin` inside Gemini CLI |
| [`connect/kiro.mcp.json`](connect/kiro.mcp.json) | Kiro | `~/.kiro/settings/mcp.json` (all projects) or `.kiro/settings/mcp.json`, then **Authenticate** when Kiro asks |
| [`connect/vscode.mcp.json`](connect/vscode.mcp.json) | GitHub Copilot in VS Code | `.vscode/mcp.json` in your project, then **Allow** when VS Code asks to sign in |
| [`connect/claude-code-token.mcp.json`](connect/claude-code-token.mcp.json) | Any setup that can't sign in | Uses a token from the `UXKIN_TOKEN` environment variable |

Using the Claude app? Connect from [Claude's directory](https://claude.ai/directory/uxkin)
instead. Get a token, if you need one, from [uxkin.com](https://uxkin.com)
while logged in. Never commit it.

## Worked examples

What changes when an agent looks at real flows before building, step by
step, with real results from the UXKIN library:

- [`account-deletion.md`](account-deletion.md): from a single "Are you
  sure?" alert to a flow based on 14 real apps.
- [`subscription-cancellation.md`](subscription-cancellation.md): where
  cancelling lives, and how much feedback to ask for.
- [`mobile-onboarding.md`](mobile-onboarding.md): why the best onboardings
  end inside the app, not on a "Get started" card.

## Use it

- [`AGENTS.md`](AGENTS.md): project instructions that tell your agent
  when to look up references and how to use them.
- [`prompts.md`](prompts.md): example prompts for new screens, whole
  flows, edge states, landing pages and reviews.

Searching needs a UXKIN plan ([pricing](https://uxkin.com/pricing)). The
[no-ui-slop skill](../skills/no-ui-slop) works without one.
