# Security

## Reporting a problem

If you find a security problem in UXKIN (the website, the MCP server at
`https://uxkin.com/mcp`, sign-in, payments, or anything in this
repository), email **support@uxkin.com** with "Security" in the subject.

Please include:

- what you found and where (a URL, tool name or file),
- the steps to reproduce it,
- what someone could do with it.

Please don't open a public issue for it, and don't access other people's
accounts or data, change or delete data, or run tests that slow the
service down for others.

We'll reply within 3 working days, keep you updated while we fix it, and
credit you when it's fixed if you'd like.

## What's in scope

- uxkin.com and its MCP server
- "Sign in with UXKIN" (the OAuth flow agents use to connect)
- The skill, plugins and configuration in this repository
- The [UI Check GitHub Action](https://github.com/uxkin/ui-check)

## Your token

If you use a UXKIN token instead of signing in, treat it like a password:
keep it in your agent's local settings or an environment variable, and
never commit it. If one leaks, log in to [uxkin.com](https://uxkin.com)
and click **Reset token**; the old one stops working straight away.
