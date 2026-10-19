# UI Design Review

Review any app or website screen the way a senior designer would: look at the rendered result, list what to fix most important first, fix what you pick in your product's own style, and compare with how real products solve the same thing. By [UXKIN](https://uxkin.com).

## Install

In Claude Code:

```
/plugin install ui-design-review --marketplace uxkin/agent
```

## What's inside

| | What it does |
|---|---|
| **ui-review** skill | Reviews a screen, page or flow on phone and desktop sizes and lists what to fix as must fix, should fix and nice to have, each with where it is and a concrete fix |
| **ui-polish** skill | Fixes the findings you pick with your existing components and tokens, then checks the result rendered |
| **ui-compare** skill | Compares a screen or flow with how real products handle the same moment, and says what to change |
| `/ui-design-review:review` | Review a screen, page or flow |
| `/ui-design-review:polish` | Fix the issues you pick |
| `/ui-design-review:compare` | Compare with real products |
| UXKIN MCP server (optional) | Real iOS app screens and complete user journeys, and 15k+ design systems taken from real websites |

The skills and commands work on their own, with no account. The UXKIN connection is optional: sign in with a UXKIN account when your app asks; searching the library needs a UXKIN plan.

## What it sends

The skills and commands run inside your agent and send nothing anywhere. When the UXKIN MCP server is connected, your agent sends its search words to `https://uxkin.com/mcp` and receives screens, journeys and design systems. See the [privacy policy](https://uxkin.com/privacy).

## Support

Email support@uxkin.com or open an issue on [GitHub](https://github.com/uxkin/agent/issues).

## License

MIT. The UXKIN library itself is a hosted service, not part of this plugin: see the [terms](https://uxkin.com/terms).
