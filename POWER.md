---
name: "uxkin"
displayName: "UXKIN: real UI references"
description: "Build UI that looks like a real product, not AI defaults. Search real iOS app screens, complete user journeys and website design systems (colors, typography, components, DESIGN.md) while you build screens, flows and pages."
keywords: ["ui", "ux", "ui design", "design system", "screen", "user flow", "onboarding", "paywall", "landing page", "mobile app", "frontend", "component", "redesign", "design.md", "uxkin"]
author: "UXKIN"
---

# UXKIN

UXKIN is a library of real product design: iOS app screens, complete user
journeys (every screen of a flow, in order) and website design systems,
each with a DESIGN.md. This power connects Kiro to it, so the agent can
look at how shipped products handle a screen or flow before building
one, instead of filling every gap with generic choices.

## Onboarding

1. This power adds the `uxkin` MCP server at `https://uxkin.com/mcp`.
   There is nothing to install or run locally.
2. When Kiro asks to authenticate `uxkin`, click **Authenticate**. A UXKIN
   page opens in the browser: log in (or create an account) and click
   **Allow**. No API key is needed.
3. Searching the library needs a UXKIN plan (https://uxkin.com/pricing).
   Without one, the tools connect but answer that a plan is needed: tell
   the user once and carry on without references.

## Tools

All five tools are read-only.

- `find_ui_references`: real apps, screens, journeys and websites for a
  plain-words query, such as "fintech onboarding identity check".
- `get_journey`: every screen of one journey result, in order.
- `find_ui_materials`: colors with their roles, typography, components
  and the full DESIGN.md of real website design systems.
- `list_collections` / `get_collection`: references the user saved on
  UXKIN. When they mention their saved picks or a collection, use those
  first.

## When to use what

- Building or redesigning a screen or flow: read
  `steering/references.md`, then `steering/build-and-review.md`.
- Choosing colors, type or components for a new web project, or turning
  a reference site's style into tokens: read
  `steering/design-systems.md`.
- Small fixes to an existing screen: follow the existing design system;
  search only if a real example would settle a specific decision.

The tools add context and never block the task. If they're unavailable or
a search returns nothing useful, carry on without them.
