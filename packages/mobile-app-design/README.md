# mobile-app-design

**Mobile App Design** by [UXKIN](https://uxkin.com). Real UI, not AI slop.

```sh
npx mobile-app-design
```

Design iOS app screens and flows from real apps, not AI guesses. Adds the ios-screens, ios-flows and ios-review skills to Claude Code, Cursor, Codex and other AI coding tools, and connects 500,000+ real app screens and user journeys from UXKIN.

## What you get

- **ios-screens**: design iOS screens from real apps
- **ios-flows**: plan whole user flows (onboarding, checkout, settings) the way real apps do
- **ios-review**: review an app's screens against real products

The skills go into the AI coding tools on your computer that you choose (Claude Code, Cursor, Codex, GitHub Copilot, Windsurf, Antigravity, Kiro and more). Then UXKIN is connected to them, so the skills can look at real products first. Sign in to UXKIN once in each tool; searching needs a [UXKIN plan](https://uxkin.com/choose-plan). The skills also work on their own.

Then ask your AI, for example: *"Design the onboarding for my iOS app"*.

## Options

```sh
npx mobile-app-design --skills-only   # just the skills, no UXKIN connection
npx mobile-app-design --yes           # don't ask: all your AI tools, for your user
```

The same as `npx uxkin add mobile-app-design`. More: [`uxkin`](https://www.npmjs.com/package/uxkin) (`npx uxkin --help`).

Requires Node.js 18.17 or newer.

## Source

[github.com/uxkin/agent](https://github.com/uxkin/agent/tree/cli) (branch `cli`). Published from GitHub Actions with npm trusted publishing.

## License

MIT
