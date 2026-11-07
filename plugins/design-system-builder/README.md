# Design System Builder

Choose a design system from real websites, write it as a DESIGN.md, turn it into tokens and components, and audit consistency. By [UXKIN](https://uxkin.com).

## Install

In Claude Code:

```
/plugin install design-system-builder --marketplace uxkin/agent
```

## What's inside

| | What it does |
|---|---|
| **design-system-pick** skill | Chooses a visual direction from real websites and writes it down as a DESIGN.md: colors, type, spacing, shapes, components and rules |
| **design-tokens** skill | Turns the DESIGN.md into tokens (CSS variables, Tailwind, SwiftUI or Android themes) and base components, and moves screens onto them |
| **design-system-audit** skill | Measures how far the product has drifted from its system and lists what to fix, with counts and locations |
| `/design-system-builder:pick` | Choose a design direction from real websites and write it as a DESIGN.md |
| `/design-system-builder:tokens` | Turn the DESIGN.md into tokens and base components and apply them |
| `/design-system-builder:audit` | Audit design consistency and list what to fix, most important first |
| UXKIN MCP server (optional) | 15k+ design systems taken from real websites, each with a DESIGN.md |

The skills and commands work on their own, with no account. The UXKIN connection is optional: sign in with a UXKIN account when your app asks; searching the library needs a UXKIN plan.

## What it sends

The skills and commands run inside your agent and send nothing anywhere. When the UXKIN MCP server is connected, your agent sends its search words to `https://uxkin.com/mcp` and receives screens, journeys and design systems. See the [privacy policy](https://uxkin.com/privacy).

## Support

Email support@uxkin.com or open an issue on [GitHub](https://github.com/uxkin/agent/issues).

## License

MIT. The UXKIN library itself is a hosted service, not part of this plugin: see the [terms](https://uxkin.com/terms).
