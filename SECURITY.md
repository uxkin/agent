# Security

## Reporting a problem

If you find a security problem in UXKIN (the website, the MCP server at
`https://uxkin.com/mcp`, sign-in, payments, or anything in this
repository), email **support@uxkin.com** with "Security" in the subject.

Please include:

- what you found and where (a URL, tool name or file),
- the steps to reproduce it,
- what someone could do with it.

**Don't open a public GitHub issue for it.** You can also use GitHub's
private [Report a vulnerability](https://github.com/uxkin/agent/security/advisories/new)
form on this repository.

Test only with your own account, don't access other people's accounts or
data, don't change or delete data, and don't run tests that slow the
service down for others. Research done this way, in good faith, is
welcome.

We'll reply within 3 working days, keep you updated while we fix it, and
credit you when it's fixed if you'd like.

## What's in scope

- uxkin.com: accounts, log-in and Google sign-in, password resets, the
  admin area and collections
- The MCP server at `https://uxkin.com/mcp`, including "Sign in with
  UXKIN" (the OAuth flow agents use to connect) and agent tokens
- Plans and checkout on uxkin.com (payments themselves are handled by
  Polar, which has its own security program)
- UXKIN for Figma (the Figma plugin and its sign-in code)
- The UXKIN.com browser extension
- The skill, plugins and configuration in this repository
- The [UI Check GitHub Action](https://github.com/uxkin/ui-check)

## Out of scope

- Problems in services we use (Polar, Google, Figma, GitHub, Cloudflare,
  Render): report those to them
- Denial-of-service, spam or load testing
- Social engineering or phishing of UXKIN users or staff
- Reports from automated scanners with no demonstrated impact

## Your token

If you use a UXKIN token instead of signing in, treat it like a password:
keep it in your agent's local settings or an environment variable, and
never commit it. If one leaks, log in to [uxkin.com](https://uxkin.com)
and click **Reset token**; the old one stops working straight away.
