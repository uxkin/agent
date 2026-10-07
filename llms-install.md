# Installing UXKIN (for AI agents)

UXKIN is a remote MCP server. There is nothing to clone, build or run
locally: you only add its address to the MCP settings and the user signs in.

## 1. Add the server

Add this entry to the MCP settings (for Cline: `cline_mcp_settings.json`,
opened from the MCP Servers panel → Configure). Keep any servers that are
already there.

```json
{
  "mcpServers": {
    "uxkin": {
      "type": "streamableHttp",
      "url": "https://uxkin.com/mcp",
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## 2. Sign in

UXKIN uses standard MCP sign-in (OAuth with dynamic client registration).
When the client offers to authenticate the `uxkin` server, the user's
browser opens a UXKIN page: they log in (or create an account) and click
**Allow**. No API key is needed.

If the client can't sign in to remote servers, use a token instead:

1. The user opens https://uxkin.com, signs in, and copies an agent token
   from the setup panel on the home page.
2. Add it as a header (never commit or print the token):

```json
"headers": { "Authorization": "Bearer <the user's UXKIN token>" }
```

## 3. Check it works

List the server's tools. There are five, all read-only:
`find_ui_references`, `find_ui_materials`, `get_journey`,
`list_collections` and `get_collection`.

Try `find_ui_references` with `{"query": "onboarding for a fitness app"}`.
If the result says the account needs a plan, the connection works: the
user can pick a plan at https://uxkin.com/choose-plan.

## Optional: the no-ui-slop skill

The free `no-ui-slop` skill tells the agent when to look things up:

```sh
npx skills add uxkin/agent
```
