# Dashboard Design

Design and build dashboards and admin panels people can actually read: the questions first, the few numbers that matter on top, charts and tables that fit the data, and every state handled, on desktop and phone. By [UXKIN](https://uxkin.com).

## Install

In Claude Code:

```
/plugin install dashboard-design --marketplace uxkin/agent
```

## What's inside

| | What it does |
|---|---|
| **dashboard-layout** skill | Plans and builds dashboards, admin panels and internal tools from the questions their users come to answer: navigation, key numbers, tables, filters and states, checked on desktop, tablet and phone |
| **data-display** skill | Picks the right number, chart or table for each question, keeps comparisons honest and makes charts readable and accessible |
| **dashboard-review** skill | Reviews an existing dashboard and lists what to fix, most important first |
| `/dashboard-design:build` | Design and build a dashboard |
| `/dashboard-design:chart` | Show a piece of data the clearest way |
| `/dashboard-design:review` | Review a dashboard |
| UXKIN MCP server (optional) | Real app screens and user journeys, and 15k+ design systems taken from real websites, many of them SaaS products |

The skills and commands work on their own, with no account. The UXKIN connection is optional: sign in with a UXKIN account when your app asks; searching the library needs a UXKIN plan.

## What it sends

The skills and commands run inside your agent and send nothing anywhere. When the UXKIN MCP server is connected, your agent sends its search words to `https://uxkin.com/mcp` and receives screens and design systems. See the [privacy policy](https://uxkin.com/privacy).

## Support

Email support@uxkin.com or open an issue on [GitHub](https://github.com/uxkin/agent/issues).

## License

MIT. The UXKIN library itself is a hosted service, not part of this plugin: see the [terms](https://uxkin.com/terms).
