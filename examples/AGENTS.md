<!--
  Example project instructions. Copy the section below into your project's
  AGENTS.md (Codex, Cursor, Copilot and others) or CLAUDE.md (Claude Code)
  and edit it to fit. It assumes the UXKIN MCP server is connected.
-->

## UI work

Before building or restyling a screen, page or flow:

1. Read the existing design system first: tokens, components and the
   screens next to the one you're changing. Reuse before adding.
2. If the decision isn't settled by the codebase (a new kind of screen,
   a flow we haven't built, an empty or error state), look up real
   examples with UXKIN:
   - `find_ui_references` for how shipped apps and websites handle it,
   - `get_journey` to see a whole flow screen by screen,
   - `find_ui_materials` for colors, type and components from real sites.
3. Say which references you used and what you took from each, in one or
   two lines. Don't copy a product's branding, text or images.
4. Design every state: loading, empty, error, success and disabled.
5. Check the rendered result at phone and desktop width before saying
   it's done.

Skip the lookup for small fixes that don't change how something looks
or works.
