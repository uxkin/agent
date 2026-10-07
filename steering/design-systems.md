# Design systems and DESIGN.md

## Existing projects

If the project already has design tokens, a theme or a DESIGN.md, use it.
Never replace it or layer a second set of rules on top. Use
`find_ui_materials` only when the user asks to restyle, or to fill a
specific gap (for example a missing data-visualization palette), and
adapt what you find to the existing system.

## New web projects

When there is no design foundation yet:

1. Call `find_ui_materials` with the product type and mood, for example
   "developer tools dark" or "wellness light warm".
2. Offer up to three starting points: name, theme, three or four key
   colors with their roles, and the fonts. Wait for the user to pick one
   or decline.
3. Turn the chosen one into the project's DESIGN.md and tokens:
   - colors by role (background, surface, text, muted text, border,
     accent, danger), not by hue;
   - a type scale with sizes, weights and line heights;
   - spacing, radius and shadow steps;
   - the components it lists, built once and reused.
4. Check contrast: body text at least 4.5:1 against its background.

Use a reference site's system as a starting point, then make it this
product's own: never reuse another company's logo, brand name or
distinctive imagery.
