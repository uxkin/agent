# Mobile App Design (iOS)

Design and build iPhone app screens and flows that feel native, checked against Apple's conventions and, optionally, real iOS apps. By [UXKIN](https://uxkin.com/mobile).

## Install

In Claude Code:

```
/plugin install mobile-app-design --marketplace uxkin/agent
```

## What's inside

| | What it does |
|---|---|
| **ios-screens** skill | Builds native-feeling iPhone screens in SwiftUI, UIKit, React Native, Expo or Flutter: navigation, sheets, Dynamic Type, dark mode, permissions, paywalls, checked on small and large iPhones |
| **ios-flows** skill | Plans a multi-step flow (onboarding, sign-up, paywall, permissions, cancellation, account deletion, settings) from how real apps handle it |
| **ios-review** skill | Reviews an existing screen or flow and lists what to fix, most important first |
| `/mobile-app-design:onboarding` | Design or improve the onboarding |
| `/mobile-app-design:paywall` | Design or improve the paywall |
| `/mobile-app-design:review-screen` | Review a screen or flow |
| UXKIN MCP server (optional) | 300+ real iOS apps with their screens and complete user journeys |

The skills and commands work on their own, with no account. The UXKIN connection is optional: sign in with a UXKIN account when your app asks; searching the library needs a UXKIN plan.

## What it sends

The skills and commands run inside your agent and send nothing anywhere. When the UXKIN MCP server is connected, your agent sends its search words to `https://uxkin.com/mcp/mobile` and receives screens and journeys. See the [privacy policy](https://uxkin.com/privacy).

## Support

Email support@uxkin.com or open an issue on [GitHub](https://github.com/uxkin/agent/issues).

## License

MIT. The UXKIN library itself is a hosted service, not part of this plugin: see the [terms](https://uxkin.com/terms).
