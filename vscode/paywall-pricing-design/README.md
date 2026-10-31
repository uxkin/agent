# Paywall & Pricing Design

These skills help Copilot build paywalls and pricing pages people trust: the value first, real prices and renewal terms that match checkout, one obvious choice, and Restore Purchases and close where they're needed. By [UXKIN](https://uxkin.com).

## What's inside

| | What it does |
|---|---|
| **app-paywall** skill | Builds in-app paywalls and upgrade screens with clear prices, trials and renewal terms |
| **pricing-page-layout** skill | Builds website pricing pages with one obvious choice and honest terms |
| **paywall-review** skill | Reviews an existing paywall or pricing page and lists what to fix, most important first |
| UXKIN MCP server (optional) | Real app paywalls, trial flows and design systems from real websites |

The skills work on their own, with no account. The UXKIN server is optional: Copilot can use it to look up real references, and searching the library needs a UXKIN plan.

## How to use it

1. Open **Copilot Chat** and switch to **Agent** mode.
2. Ask for what you want, for example "build a pricing page" or "review this screen". Copilot picks the right skill on its own, or type `/app-paywall`, `/pricing-page-layout`, `/paywall-review` to use one by name.
3. The first time Copilot uses UXKIN, VS Code asks you to sign in. Log in with your UXKIN account and click **Allow**. No API key to copy.

Check the connection under **MCP Servers** in the Extensions view: **UXKIN (Paywall & Pricing Design)** should be running.

Requires VS Code 1.109 or later with GitHub Copilot for the skills.

## What it sends

The skills run inside Copilot and send nothing anywhere. When the UXKIN server is used, Copilot sends its search words to `https://uxkin.com/mcp` and receives references; the tools only read. See the [privacy policy](https://uxkin.com/privacy).

## Support

Email support@uxkin.com or open an issue on [GitHub](https://github.com/uxkin/agent/issues).

## License

MIT. The UXKIN library itself is a hosted service, not part of this extension: see the [terms](https://uxkin.com/terms).
