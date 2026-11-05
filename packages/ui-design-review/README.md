# ui-design-review

**UI Design Review** by [UXKIN](https://uxkin.com). Real UI, not AI slop.

```sh
npx ui-design-review
```

Review, compare and polish any interface against real products. Adds the ui-review, ui-compare and ui-polish skills to Claude Code, Cursor, Codex and other AI coding tools, and connects real app screens and website design systems from UXKIN.

## What you get

- **ui-review**: list what to fix in a screen or page, most important first
- **ui-compare**: compare your UI with how real products do it
- **ui-polish**: fix the small things that make UI look generated

The skills go into the AI coding tools on your computer that you choose (Claude Code, Cursor, Codex, GitHub Copilot, Windsurf, Antigravity, Kiro and more). Then UXKIN is connected to them, so the skills can look at real products first. Sign in to UXKIN once in each tool; searching needs a [UXKIN plan](https://uxkin.com/choose-plan). The skills also work on their own.

Then ask your AI, for example: *"Review this screen and tell me what to fix"*.

## Options

```sh
npx ui-design-review --skills-only   # just the skills, no UXKIN connection
npx ui-design-review --yes           # don't ask: all your AI tools, for your user
```

The same as `npx uxkin add ui-design-review`. More: [`uxkin`](https://www.npmjs.com/package/uxkin) (`npx uxkin --help`).

Requires Node.js 18.17 or newer.

## Source

[github.com/uxkin/agent](https://github.com/uxkin/agent/tree/cli) (branch `cli`). Published from GitHub Actions with npm trusted publishing.

## License

MIT
