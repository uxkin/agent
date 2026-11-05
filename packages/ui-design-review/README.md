<p align="center">
  <a href="https://uxkin.com/?utm_source=npm&utm_medium=readme&utm_campaign=ui-design-review"><img src="https://raw.githubusercontent.com/uxkin/agent/cli/assets/npm/ui-design-review.png" alt="UI Design Review by UXKIN: Find what looks off in any interface, and fix it." width="100%"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ui-design-review"><img src="https://img.shields.io/npm/v/ui-design-review?color=6B4EFF&label=npm" alt="npm version"></a> <a href="https://www.npmjs.com/package/ui-design-review"><img src="https://img.shields.io/npm/dm/ui-design-review?color=C8F560&labelColor=141414" alt="downloads"></a> <img src="https://img.shields.io/badge/license-MIT-141414" alt="MIT license"> <a href="https://uxkin.com/?utm_source=npm&utm_medium=readme&utm_campaign=ui-design-review"><img src="https://img.shields.io/badge/by-UXKIN-6B4EFF" alt="by UXKIN"></a>
</p>

<h3 align="center">Find what looks off in any interface, and fix it.</h3>

<p align="center">A design plugin by <a href="https://uxkin.com/?utm_source=npm&utm_medium=readme&utm_campaign=ui-design-review">UXKIN</a> for Claude Code, Cursor, Codex and other AI coding tools.<br><b>Real UI, not AI slop.</b></p>

## Install in one line

```sh
npx ui-design-review
```

1. **Adds 3 design skills** to the AI coding tools you choose.
2. **Connects UXKIN**, so those skills can look at real app screens and website design systems to compare with before they design.
3. **Sign in once** in each tool, then just ask your AI.

## What you get

| Skill | What it does | Try asking |
|---|---|---|
| **`ui-review`** | Lists what to fix in a screen or page, most important first | *"Review this screen"* |
| **`ui-compare`** | Compares your UI with how real products do it | *"How do real apps do this checkout?"* |
| **`ui-polish`** | Fixes the small things that make UI look generated | *"Polish this page"* |

## Works with

Claude Code · Cursor · Codex · GitHub Copilot (VS Code) · Windsurf · Antigravity · Kiro · Cline · and 15+ more tools that read agent skills.

## Real UI behind it

Your AI designs from [real app screens and website design systems to compare with](https://uxkin.com?utm_source=npm&utm_medium=readme&utm_campaign=ui-design-review) on [UXKIN](https://uxkin.com/?utm_source=npm&utm_medium=readme&utm_campaign=ui-design-review) instead of guessing. The skills also work on their own; the real references need a [UXKIN plan](https://uxkin.com/choose-plan?utm_source=npm&utm_medium=readme&utm_campaign=ui-design-review).

## Options

```sh
npx ui-design-review --skills-only   # just the skills, no UXKIN connection
npx ui-design-review --yes           # don't ask: all your AI tools, for your user
npx ui-design-review --help
```

<details>
<summary><b>What changes on my computer?</b></summary>

The skills are copied into your AI tools' skills folder (for most tools, `~/.agents/skills`). In each tool's settings, only a `uxkin` entry is added; your other settings stay as they are, and a copy of each settings file is kept next to it (`.uxkin-backup`) the first time. Sign-in happens on uxkin.com in your browser; your password never goes through the terminal.

</details>

## More from UXKIN

| Command | What it is |
|---|---|
| [`npx uxkin`](https://www.npmjs.com/package/uxkin) | UXKIN CLI: setup, design, search |
| [`npx website-design-skills`](https://www.npmjs.com/package/website-design-skills) | Website Design |
| [`npx mobile-app-design`](https://www.npmjs.com/package/mobile-app-design) | Mobile App Design |
| [`npx dashboard-design`](https://www.npmjs.com/package/dashboard-design) | Dashboard Design |
| [`npx swiftui-app-design`](https://www.npmjs.com/package/swiftui-app-design) | SwiftUI App Design |
| [`npx paywall-pricing-design`](https://www.npmjs.com/package/paywall-pricing-design) | Paywall & Pricing Design |

Requires Node.js 18.17 or newer. Same as `npx uxkin add ui-design-review`.

## Source

[github.com/uxkin/agent](https://github.com/uxkin/agent/tree/cli) (branch `cli`). Published from GitHub Actions with npm trusted publishing.

## License

MIT
