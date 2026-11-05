# dashboard-design

**Dashboard Design** by [UXKIN](https://uxkin.com). Real UI, not AI slop.

```sh
npx dashboard-design
```

Design dashboards and data screens that look like real products. Adds the dashboard-layout, data-display and dashboard-review skills to Claude Code, Cursor, Codex and other AI coding tools, and connects real app screens and design systems from UXKIN.

## What you get

- **dashboard-layout**: lay out dashboards, admin panels and settings the way real products do
- **data-display**: tables, charts, stats and empty states that read clearly
- **dashboard-review**: review a dashboard and list what to fix

The skills go into the AI coding tools on your computer that you choose (Claude Code, Cursor, Codex, GitHub Copilot, Windsurf, Antigravity, Kiro and more). Then UXKIN is connected to them, so the skills can look at real products first. Sign in to UXKIN once in each tool; searching needs a [UXKIN plan](https://uxkin.com/choose-plan). The skills also work on their own.

Then ask your AI, for example: *"Design an analytics dashboard for my SaaS"*.

## Options

```sh
npx dashboard-design --skills-only   # just the skills, no UXKIN connection
npx dashboard-design --yes           # don't ask: all your AI tools, for your user
```

The same as `npx uxkin add dashboard-design`. More: [`uxkin`](https://www.npmjs.com/package/uxkin) (`npx uxkin --help`).

Requires Node.js 18.17 or newer.

## Source

[github.com/uxkin/agent](https://github.com/uxkin/agent/tree/cli) (branch `cli`). Published from GitHub Actions with npm trusted publishing.

## License

MIT
