# uxkin

Real UI references for you and your AI, from the terminal.

[UXKIN](https://uxkin.com) is a library of real iOS app screens, user journeys and website design systems. This command connects it to your AI coding tools and brings design systems straight into your project, so your AI designs from real products instead of guessing.

```sh
npx uxkin setup
```

No install needed. Node.js 18.17 or newer.

## Connect your AI coding tools

```sh
npx uxkin setup
```

Finds the AI coding tools on your computer and connects UXKIN to them: **Claude Code, Codex, Cursor, VS Code (GitHub Copilot), Windsurf, Antigravity and Kiro**. It shows what it found and asks before changing anything. Only UXKIN is added; your other settings stay as they are, and a copy of each settings file is kept next to it (`.uxkin-backup`) the first time.

Then sign in to UXKIN once inside each tool. Setup tells you where.

Just one tool: `npx uxkin setup cursor`. See what it would do without changing anything: `npx uxkin setup --dry-run`.

## Bring a real design system into your project

```sh
npx uxkin design linear
npx uxkin design "dark fintech"
```

Saves the best match's DESIGN.md (colors, type, spacing, components) into the current folder. Then tell your AI: "Follow DESIGN.md." Use `--out docs/DESIGN.md` to save it somewhere else, or `--stdout` to print it.

## Search real screens, journeys and websites

```sh
npx uxkin search "onboarding paywall"
npx uxkin search duolingo
```

## Your collections

```sh
npx uxkin collections
npx uxkin collections "Checkout ideas"
```

Shows what you've saved on uxkin.com.

## For scripts and AI agents

Add `--json` to `search`, `design` and `collections` for machine-readable output. When nobody is at the keyboard, the CLI never changes files on its own: pass `--yes` to `setup` or `--force` to `design` to allow it.

## Signing in

`design`, `search` and `collections` sign you in the first time, in your browser, on uxkin.com's own sign-in page. Your password is never typed into the terminal. New to UXKIN? You can create an account on that page.

```sh
npx uxkin login     # sign in
npx uxkin status    # check
npx uxkin logout    # sign out on this computer
```

The sign-in is kept in `~/.config/uxkin/credentials.json` (on Windows, `%APPDATA%\uxkin`), readable only by you. You can disconnect it any time from your [UXKIN account](https://uxkin.com/account).

Searching needs a UXKIN plan (Monthly or Lifetime): [uxkin.com/choose-plan](https://uxkin.com/choose-plan).

## License

MIT
