# UXKIN

When you build, restyle or review UI (screens, pages, components, flows
or design systems), follow the `no-ui-slop` skill from this extension.

The `uxkin` MCP server finds real references when a design decision
needs evidence:

- `find_ui_references`: real app screens, user journeys and websites
- `find_ui_materials`: colors, typography, components and DESIGN.md
  from website design systems
- `get_journey`: every screen of one user journey, in order
- `list_collections` and `get_collection`: the user's saved collections

The skill works without an account. The tools need a UXKIN plan: if
they ask for sign-in, tell the user to run `/mcp auth uxkin`.
