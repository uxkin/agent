# SwiftUI App Design

Build SwiftUI screens and flows that feel like a real iPhone app: native navigation and components, Dynamic Type, dark mode and accessibility, flows planned from how real apps do them, and everything checked in previews on small and large iPhones. By [UXKIN](https://uxkin.com/mobile).

## Install

In Claude Code:

```
/plugin install swiftui-app-design --marketplace uxkin/agent
```

## What's inside

| | What it does |
|---|---|
| **swiftui-screens** skill | Builds native SwiftUI screens with NavigationStack, TabView, List, Form, sheets and toolbars, Dynamic Type, dark mode, accessibility and every state, checked in previews |
| **swiftui-flows** skill | Plans onboarding, sign-up, paywalls (StoreKit 2), permissions, cancellation and account deletion from how real apps handle them, then builds them |
| **swiftui-review** skill | Reviews existing SwiftUI UI and lists what to fix, most important first |
| `/swiftui-app-design:screen` | Build or restyle a screen |
| `/swiftui-app-design:flow` | Plan and build a flow |
| `/swiftui-app-design:review` | Review screens or a flow |
| UXKIN MCP server (optional) | 300+ real iOS apps with their screens and complete user journeys |

The skills and commands work on their own, with no account. The UXKIN connection is optional: sign in with a UXKIN account when your app asks; searching the library needs a UXKIN plan.

## What it sends

The skills and commands run inside your agent and send nothing anywhere. When the UXKIN MCP server is connected, your agent sends its search words to `https://uxkin.com/mcp` and receives screens and journeys. See the [privacy policy](https://uxkin.com/privacy).

## Support

Email support@uxkin.com or open an issue on [GitHub](https://github.com/uxkin/agent/issues).

## License

MIT. The UXKIN library itself is a hosted service, not part of this plugin: see the [terms](https://uxkin.com/terms).
