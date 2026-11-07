# App Redesign

Redesign an app that looks generic or AI-built, from real products, screen by screen, without breaking anything. By [UXKIN](https://uxkin.com).

## Install

In Claude Code:

```
/plugin install app-redesign --marketplace uxkin/agent
```

## What's inside

| | What it does |
|---|---|
| **redesign-plan** skill | Captures every screen as it is now, names what makes it look generic, chooses a direction from real products and plans the changes screen by screen |
| **redesign-apply** skill | Applies the new look in small steps: tokens and base components first, then one screen at a time, keeping every feature working |
| **redesign-check** skill | Compares before and after, walks every flow and state, and lists what still needs fixing |
| `/app-redesign:plan` | Plan a redesign of this app from real products, without changing what it does |
| `/app-redesign:apply` | Apply the agreed redesign screen by screen, keeping every feature working |
| `/app-redesign:check` | Check a redesign: before and after, every flow and state, and what is left |
| UXKIN MCP server (optional) | Real iOS app screens and complete user journeys, and 15k+ design systems taken from real websites |

The skills and commands work on their own, with no account. The UXKIN connection is optional: sign in with a UXKIN account when your app asks; searching the library needs a UXKIN plan.

## What it sends

The skills and commands run inside your agent and send nothing anywhere. When the UXKIN MCP server is connected, your agent sends its search words to `https://uxkin.com/mcp` and receives screens, journeys and design systems. See the [privacy policy](https://uxkin.com/privacy).

## Support

Email support@uxkin.com or open an issue on [GitHub](https://github.com/uxkin/agent/issues).

## License

MIT. The UXKIN library itself is a hosted service, not part of this plugin: see the [terms](https://uxkin.com/terms).
