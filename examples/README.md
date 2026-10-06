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
| [`connect/vscode.mcp.json`](connect/vscode.mcp.json) | GitHub Copilot in VS Code | `.vscode/mcp.json` in your project, then **Allow** when VS Code asks to sign in |
| [`connect/claude-code-token.mcp.json`](connect/claude-code-token.mcp.json) | Any setup that can't sign in | Uses a token from the `UXKIN_TOKEN` environment variable |

Using the Claude app? Connect from [Claude's directory](https://claude.ai/directory/uxkin)
instead. Get a token, if you need one, from [uxkin.com](https://uxkin.com)
while logged in. Never commit it.

## Use it

- [`AGENTS.md`](AGENTS.md): project instructions that tell your agent
  when to look up references and how to use them.
- [`prompts.md`](prompts.md): example prompts for new screens, whole
  flows, edge states, landing pages and reviews.

Searching needs a UXKIN plan ([pricing](https://uxkin.com/pricing)). The
[no-ui-slop skill](../skills/no-ui-slop) works without one.
