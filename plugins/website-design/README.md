# Website Design

Design and build websites and landing pages that look like a real product, not AI output: a design direction from real websites, written down as a DESIGN.md, pages that work on phone and desktop, and reviews of what you have. By [UXKIN](https://uxkin.com/web).

## Install

In Claude Code:

```
/plugin install website-design --marketplace uxkin/agent
```

## What's inside

| | What it does |
|---|---|
| **web-design-system** skill | Chooses colors with their roles, typography, spacing and components from how real websites in the same space look, and writes them into a DESIGN.md and the project's tokens |
| **landing-page** skill | Builds landing, home, pricing and feature pages with specific copy and no invented proof, following the DESIGN.md, checked on phone, tablet and desktop |
| **web-review** skill | Reviews an existing site or page and lists what to fix, most important first |
| `/website-design:landing-page` | Design and build a landing page |
| `/website-design:design-system` | Choose a design direction and write the DESIGN.md |
| `/website-design:review-page` | Review a website or page |
| UXKIN MCP server (optional) | 15k+ design systems taken from real websites, each with a DESIGN.md |

The skills and commands work on their own, with no account. The UXKIN connection is optional: sign in with a UXKIN account when your app asks; searching the library needs a UXKIN plan.

## What it sends

The skills and commands run inside your agent and send nothing anywhere. When the UXKIN MCP server is connected, your agent sends its search words to `https://uxkin.com/mcp` and receives design systems. See the [privacy policy](https://uxkin.com/privacy).

## Support

Email support@uxkin.com or open an issue on [GitHub](https://github.com/uxkin/agent/issues).

## License

MIT. The UXKIN library itself is a hosted service, not part of this plugin: see the [terms](https://uxkin.com/terms).
