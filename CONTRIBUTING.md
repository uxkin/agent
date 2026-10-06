# Contributing

Thanks for helping. This repository holds the free `no-ui-slop` skill, the
UXKIN plugins for Claude, Cursor and Codex, the MCP Registry listing and
the examples. The UXKIN library and server are a hosted service, so their
code isn't here.

## Good things to send

- **Skill improvements:** a rule that's unclear, a case it misses, or
  advice that leads agents to worse UI. Show what the agent did before and
  after the change if you can.
- **Setup fixes:** an app changed its menus or config format and the
  steps in the README or `examples/` no longer match.
- **New examples:** a config for an MCP client that isn't covered yet, or
  a prompt that reliably gets good results.

For bugs in uxkin.com itself, search results, billing or your account,
please [contact support](https://uxkin.com/contact) instead of opening an
issue. For security problems, see [SECURITY.md](SECURITY.md).

## Making a change

1. Open an issue first for anything bigger than a small fix, so we can
   agree on the direction.
2. Keep `skills/no-ui-slop/SKILL.md` short and specific. Every line is
   read by an agent on every UI task, so it should earn its place.
3. Keep the plugin manifests in step: if you change the name, description
   or version in one of `.claude-plugin/`, `.cursor-plugin/` or
   `.codex-plugin/`, check the others.
4. Don't put tokens or other secrets in examples. Use `YOUR_UXKIN_TOKEN`
   or an environment variable.
5. Check JSON files are valid before opening a pull request.

By contributing, you agree your changes are released under the
[MIT license](LICENSE).
