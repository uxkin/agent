# UXKIN: Real UI References

Copilot designs better when it can look at how real products solve the same problem. This extension adds two UXKIN skills to Copilot Chat and connects UXKIN's library of real app screens, complete user journeys and website design systems. By [UXKIN](https://uxkin.com).

## What's inside

| | What it does |
|---|---|
| **no-ui-slop** skill | Builds UI that fits the product instead of generic AI defaults: works from the existing design system, designs every state, checks the rendered result |
| **uxkin-research** skill | Looks up how real apps and websites handle a screen or flow before designing it, and says which decisions it's adopting |
| UXKIN MCP server | Real iOS app screens, complete user journeys, website design systems with a DESIGN.md, and your saved collections |

The skills work on their own, with no account. The UXKIN server is optional: Copilot can use it to look up real references, and searching the library needs a UXKIN plan.

## How to use it

1. Open **Copilot Chat** and switch to **Agent** mode.
2. Ask for what you want, for example "build a pricing page" or "review this screen". Copilot picks the right skill on its own, or type `/no-ui-slop`, `/uxkin-research` to use one by name.
3. The first time Copilot uses UXKIN, VS Code asks you to sign in. Log in with your UXKIN account and click **Allow**. No API key to copy.

Check the connection under **MCP Servers** in the Extensions view: **UXKIN** should be running.

Requires VS Code 1.109 or later with GitHub Copilot for the skills.

## What it sends

The skills run inside Copilot and send nothing anywhere. When the UXKIN server is used, Copilot sends its search words to `https://uxkin.com/mcp` and receives references; the tools only read. See the [privacy policy](https://uxkin.com/privacy).

## Support

Email support@uxkin.com or open an issue on [GitHub](https://github.com/uxkin/agent/issues).

## License

MIT. The UXKIN library itself is a hosted service, not part of this extension: see the [terms](https://uxkin.com/terms).
