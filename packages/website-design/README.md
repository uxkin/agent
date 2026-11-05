<p align="center">
  <a href="https://uxkin.com/?utm_source=npm&utm_medium=readme&utm_campaign=website-design-skills"><img src="https://raw.githubusercontent.com/uxkin/agent/cli/assets/npm/website-design-skills.png" alt="Website Design by UXKIN: Websites and landing pages that look like a real product, not AI output." width="100%"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/website-design-skills"><img src="https://img.shields.io/npm/v/website-design-skills?color=6B4EFF&label=npm" alt="npm version"></a> <a href="https://www.npmjs.com/package/website-design-skills"><img src="https://img.shields.io/npm/dm/website-design-skills?color=C8F560&labelColor=141414" alt="downloads"></a> <img src="https://img.shields.io/badge/license-MIT-141414" alt="MIT license"> <a href="https://uxkin.com/?utm_source=npm&utm_medium=readme&utm_campaign=website-design-skills"><img src="https://img.shields.io/badge/by-UXKIN-6B4EFF" alt="by UXKIN"></a>
</p>

<h3 align="center">Websites and landing pages that look like a real product, not AI output.</h3>

<p align="center">A design plugin by <a href="https://uxkin.com/?utm_source=npm&utm_medium=readme&utm_campaign=website-design-skills">UXKIN</a> for Claude Code, Cursor, Codex and other AI coding tools.<br><b>Real UI, not AI slop.</b></p>

## Install in one line

```sh
npx website-design-skills
```

1. **Adds 3 design skills** to the AI coding tools you choose.
2. **Connects UXKIN**, so those skills can look at 15k+ real website design systems, each with a DESIGN.md before they design.
3. **Sign in once** in each tool, then just ask your AI.

## What you get

| Skill | What it does | Try asking |
|---|---|---|
| **`landing-page`** | Landing, pricing, feature and waitlist pages with honest copy, checked on phone and desktop | *"Build a landing page for my app"* |
| **`web-design-system`** | Picks a design direction from real websites and writes it down as a DESIGN.md | *"Choose a design system for my SaaS site"* |
| **`web-review`** | Lists what to fix on a website, most important first | *"Review my homepage"* |

## Works with

Claude Code · Cursor · Codex · GitHub Copilot (VS Code) · Windsurf · Antigravity · Kiro · Cline · and 15+ more tools that read agent skills.

## Real UI behind it

Your AI designs from [15k+ real website design systems, each with a DESIGN.md](https://uxkin.com/web?utm_source=npm&utm_medium=readme&utm_campaign=website-design-skills) on [UXKIN](https://uxkin.com/?utm_source=npm&utm_medium=readme&utm_campaign=website-design-skills) instead of guessing. The skills also work on their own; the real references need a [UXKIN plan](https://uxkin.com/choose-plan?utm_source=npm&utm_medium=readme&utm_campaign=website-design-skills).

## Options

```sh
npx website-design-skills --skills-only   # just the skills, no UXKIN connection
npx website-design-skills --yes           # don't ask: all your AI tools, for your user
npx website-design-skills --help
```

<details>
<summary><b>What changes on my computer?</b></summary>

The skills are copied into your AI tools' skills folder (for most tools, `~/.agents/skills`). In each tool's settings, only a `uxkin` entry is added; your other settings stay as they are, and a copy of each settings file is kept next to it (`.uxkin-backup`) the first time. Sign-in happens on uxkin.com in your browser; your password never goes through the terminal.

</details>

## More from UXKIN

| Command | What it is |
|---|---|
| [`npx uxkin`](https://www.npmjs.com/package/uxkin) | UXKIN CLI: setup, design, search |
| [`npx mobile-app-design`](https://www.npmjs.com/package/mobile-app-design) | Mobile App Design |
| [`npx ui-design-review`](https://www.npmjs.com/package/ui-design-review) | UI Design Review |
| [`npx dashboard-design`](https://www.npmjs.com/package/dashboard-design) | Dashboard Design |
| [`npx swiftui-app-design`](https://www.npmjs.com/package/swiftui-app-design) | SwiftUI App Design |
| [`npx paywall-pricing-design`](https://www.npmjs.com/package/paywall-pricing-design) | Paywall & Pricing Design |

Requires Node.js 18.17 or newer. Same as `npx uxkin add website-design`.

## Source

[github.com/uxkin/agent](https://github.com/uxkin/agent/tree/cli) (branch `cli`). Published from GitHub Actions with npm trusted publishing.

## License

MIT
