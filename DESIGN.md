# UXKIN — Style Reference
> a sticker-sheet workbench — thick ink outlines, hard offset shadows and candy-bright fills framing real product screenshots

**Theme:** light

UXKIN is a library of real app screens, user journeys and website design
systems, and this file is how UXKIN itself looks. It is written in the same
format as the DESIGN.md files UXKIN exports for every website in the
library, so you can hand it to a coding agent and get UXKIN-looking UI back.

The interface is warm off-white paper with near-black ink. Every surface
that matters (buttons, cards, tabs, screenshots, fields) gets a 2px ink
outline and a hard, unblurred offset shadow, so the page reads like cut-out
stickers on a desk. Six bright fills (lime, violet, yellow, sky, pink and
coral) carry the personality, while the screenshots stay untouched and
are framed, never tinted. Type is a chunky rounded grotesk for display and
a soft geometric sans for reading. Buttons press down physically when
clicked.

The values below are taken from the live code (`src/lib/ui.ts`,
`src/app/globals.css` and the components), not from a mood board.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ink | `#141414` | `--color-ink` | All text, every border, every hard shadow, dark buttons. The most used color by far |
| Paper | `#FBFAF7` | `--color-paper` | Page background, modals, code blocks, the stuck header (at 90% with blur) |
| White | `#FFFFFF` | `--color-white` | Cards, fields, secondary buttons, screenshot frames |
| Lime | `#C8F560` | `--color-lime` | The signature accent: highlight markers, the "easiest" callouts, success boxes, hover fill on small buttons |
| Violet | `#6B4EFF` | `--color-violet` | Primary call to action (white text), focus glow on fields, the shadow under ink buttons |
| Yellow | `#FFD84D` | `--color-yellow` | Hover fill on round icon buttons, playful badges and markers |
| Sky | `#7CC7FF` | `--color-sky` | Eyebrow badges above hero titles, card tints |
| Pink | `#FF9AD5` | `--color-pink` | Error box fill (at 40%), card tints |
| Coral | `#FF6A5C` | `--color-coral` | Warnings and destructive buttons, card tints |
| Error Red | `#C4372A` | `--color-error` | Inline error text only (5.4:1 on white) |
| Placeholder Gray | `#E8E8E5` | `--color-placeholder` | Behind website previews while they load |

Muted text is Ink with opacity, never a separate gray: 80% for body copy
(9.6:1 on Paper), 70% for secondary lines (6.7:1), 60% only for placeholders
and fine print (4.75:1).

Card tints repeat in this order across the app grid: Sky 45%, Lime 55%,
Pink 40%, Yellow 50%, Violet 25%, Coral 30%.

## Tokens — Typography

### Bricolage Grotesque — Display: page titles, section titles, buttons, tabs, badges, card names · `--font-display`
- **Substitute:** Space Grotesk, Archivo, Manrope (800)
- **Weights:** 700, 800
- **Sizes:** 13px to 72px
- **Line height:** 1.0 for hero titles, 1.2 to 1.3 for section titles
- **Letter spacing:** -0.035em on hero titles, -0.02em on section titles and card names, +0.14em to +0.16em on uppercase labels
- **Role:** Everything you click or scan. Buttons and tabs always use it, so controls feel like part of the headline system

### DM Sans — Body: paragraphs, descriptions, form fields, tables · `--font-body`
- **Substitute:** Inter, Plus Jakarta Sans, system-ui
- **Weights:** 400 to 800 (variable); 500 for body copy, 700 for emphasis
- **Sizes:** 12px to 18px
- **Line height:** 1.6 to 1.75 (`leading-7` on hero subtitles)
- **Letter spacing:** normal
- **Role:** Reading. Rounded enough to sit beside the display face without clashing

### Geist Mono — Code: commands, config snippets, tokens · `--font-mono`
- **Substitute:** JetBrains Mono, SF Mono, Menlo
- **Weights:** 400
- **Sizes:** 13px
- **Role:** Anything the user copies into a terminal or config file

### Type Scale

| Use | Size | Weight | Font |
|-----|------|--------|------|
| Hero title | 44px → 72px (sm and up) | 800 | Display |
| Small hero title | 40px → 60px | 800 | Display |
| Section title | 24px → 30px | 800 | Display |
| Card name | 18px to 20px | 800 | Display |
| Button | 16px (large), 14px (small) | 700 | Display |
| Body | 15px to 16px | 500 | Body |
| Hero subtitle | 16px → 18px | 500 | Body |
| Secondary line | 14px | 500 | Body |
| Uppercase label | 12px | 700 | Display |
| Code | 13px | 400 | Mono |

Every text field is at least 16px on touch screens, so iPhone Safari never
zooms into a form.

## Tokens — Spacing & Shapes

### Spacing Scale
4px base (Tailwind's default). The common steps are 8, 12 and 16px for gaps
inside components, 24px for card padding on desktop (16px on phones) and
40 to 80px between page sections.

### Border Radius

| Element | Radius |
|---------|--------|
| Buttons, tabs, badges, pills, round icon buttons | full (999px) |
| Cards, modals, the setup panels | 24px (`rounded-3xl`) |
| Screenshot tiles, website previews, fields, code blocks, alert boxes | 16px (`rounded-2xl`) |
| App icons | 12px (`rounded-xl`) |
| Phone screenshots | 22px to 26px, close to a real phone's corner |

Nothing is sharp-cornered except tables and inline code.

### Borders
2px solid Ink on every outlined element. 1px is not used. Dividers inside
a component are 2px Ink too; page-level dividers are 2px Ink at 10%.

### Shadows
Hard offset shadows only: no blur, no spread, always Ink (or Violet under
an Ink button).

| Shadow | Used for |
|--------|----------|
| `0 3px 0 #141414` | Small buttons, round icon buttons |
| `0 5px 0 #141414` | Large buttons |
| `4px 4px 0 #141414` | Phone screenshot frames, the section tabs, focused fields use `4px 4px 0 #6B4EFF` |
| `6px 6px 0 #141414` | Cards, panels, hovered website previews |
| `8px 8px 0 #141414` | Modals |
| `0 5px 0 #6B4EFF` | Ink buttons (the one place violet becomes a shadow) |

### Layout
- Browse pages: up to 1600px wide, 16px side padding on phones, 24px from `sm`.
- Reading pages (docs, guides, legal): 768px (`max-w-3xl`).
- Forms, the plan picker and the setup panels: 576px to 672px.
- Breakpoints are Tailwind's: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

## Components

### Large Button
Pill, 2px Ink border, 24px by 12px padding, Display 16px bold, `0 5px 0`
shadow. Fills: Violet with white text (primary), Lime with Ink text
(friendly primary), White (secondary), Ink with a Violet shadow (strong
secondary), Coral with white text (destructive). Hover lifts it 2px; press
drops it 3px and shrinks the shadow to 2px, so it feels pushed in. Disabled
is 50% opacity.

### Small Button
The same pill at 16px by 6px padding and 14px text with a `0 3px 0` shadow.
Pressing removes the shadow completely. Used in toolbars, card actions and
copy buttons; a White small button turns Lime on hover.

### Round Icon Button
36px to 44px circle, White, 2px Ink border, `0 3px 0` shadow, Yellow on
hover. Used for carousel arrows and the close (X) button. Always has an
`aria-label`.

### Card
White, 24px radius, 2px Ink border, `6px 6px 0` shadow, 16px padding on
phones and 24px from `sm`.

### Section Tabs
A White pill holding three equal-width pill tabs (Agent SDK, Explore Web, Explore Mobile), 6px inner
padding, `4px 4px 0` shadow. The active tab is solid Ink with white text.

### Segmented Tab Bar
A smaller version for filters: White pill, `0 4px 0` shadow, 14px tabs.

### Hero
Centered. An optional sky-blue badge tilted -2° with a `3px 3px 0` shadow,
then the title with one word on a highlighter marker: a rounded Lime (or
Violet, Yellow, Pink) block behind the word, tilted -2°. Behind the hero,
two soft radial glows (Violet 20% top left, Lime 45% top right) and a faint
24px dot grid that fades out toward the edges.

### Sticky Header
On screens 1024px and wider, the header pins to the top once you scroll:
Paper at 90% with a medium backdrop blur and a 2px Ink-at-10% bottom
border. Anchor links land 96px lower so the header never covers them.

### Field
White, 16px radius, 2px Ink border, 20px by 14px padding, 16px text,
placeholder at Ink 60%. Focus has no outline ring: the field gets a
`4px 4px 0` Violet shadow instead.

### Alert Box
16px radius, 2px Ink border, 20px by 16px padding, 14px text. Error: Pink
at 40% with `role="alert"`. Success: Lime at 60%.

### Code Block
Paper, 16px radius, 2px Ink border. A White title bar with a 2px Ink bottom
border holds an uppercase label on the left and a small Copy button on the
right.

### Modal
Paper, 2px Ink border, `8px 8px 0` shadow, over Ink at 55% with a small
blur. On phones it is a bottom sheet (rounded top corners only, full
width); from `sm` it centers with all corners at 24px. The close button
sits in the top right.

### Badge / Pill
Pill, 2px Ink border, 12px bold Display text, 12px by 2px padding.

## Screenshot Presentation

Screenshots are the product, so they are never cropped into odd shapes,
filtered or recolored.

### Mobile screens
- Shown as a phone: the screenshot at its true 1170 × 2532 ratio inside
  a White frame with a 22px radius, 2px Ink border and `4px 4px 0` shadow.
- On browse cards the phone sits at 86% of a 5:6 tile filled with the
  card's pastel tint, so many apps fit on screen.
- Card carousels advance every 3 seconds only while the card is on screen
  and the tab is visible; dots below show the position (the active dot is
  a 16px Ink bar, the others 6px dots at 30%).
- In the screen viewer the phone keeps a 9:19.5 frame with a 26px radius
  and a 5% black backdrop while loading.
- Screen grids run 2 columns on phones up to 6 on wide screens, with 16px
  gaps. Tiles are White, 16px radius, 2px Ink border, and lift 4px with a
  `5px 5px 0` shadow on hover.

### Websites
- Shown as a 16:10 landscape preview with a 16px radius and 2px Ink border
  on Placeholder Gray, with a muted, looping preview video where there is
  one and a still cover otherwise.
- The site's icon (40px, 12px radius, bordered) and name sit below the
  preview, not on top of it.
- Hover lifts the preview 4px and adds the `6px 6px 0` shadow.

### Rules for both
- Always lazy-load and decode asynchronously; fall back to the original
  file if a resized version fails.
- Alt text names the app and the screen number ("Calm screen 3").
- Overlay actions (Save, Copy) appear on hover on devices with a mouse
  and stay visible on touch screens.

## Navigation
- Three section tabs sit near the top of every browse page: Agent SDK
  (the home page), Explore Web and Explore Mobile.
- One global search at the top of browse pages.
- Inside an app, a sticky bar shows the app icon and name with actions on
  the right; it wraps on phones instead of hiding actions.
- The admin area uses a single horizontally scrolling row of links on
  phones, with the current page scrolled into view.
- The footer carries product, guide and legal links, including Status.

## Responsive Rules
- Design at 390px first. Nothing may scroll sideways at 390px.
- Hero titles step up at `sm`; grids add columns at `sm`, `md`, `lg` and `xl`.
- Wide tables become stacked cards on phones, each value labeled.
- Stat grids are two columns on phones.
- Modals become bottom sheets on phones.
- Card padding drops from 24px to 16px on phones.

## Accessibility
- Text contrast meets WCAG AA everywhere: Ink on Paper is 17.7:1, Ink on
  Lime 14.6:1, white on Violet 5.1:1, body copy at Ink 80% is 9.6:1.
- Every control is a real `button` or `a`, gets the hand cursor, and
  disabled controls show "not allowed".
- Keyboard focus is always visible: a Violet ring (4px at 30% to 40%) on
  buttons and links, the Violet offset shadow on fields.
- A "Skip to content" link (Lime pill) appears on the first Tab press.
- Icon-only buttons always have an `aria-label`; decorative images use
  empty alt text.
- When someone asks their device for less motion, all animation,
  transitions and smooth scrolling stop.
- Error messages use `role="alert"` and say what to do next.

## Interaction Rules
- **Lift, then press.** Hover raises a control 2px (cards 4px); press
  moves it down 2px to 3px and shortens or removes the shadow.
- **Transitions are short** (Tailwind's default 150ms) and only move or
  recolor; nothing fades in from nowhere or bounces.
- **Copy buttons confirm in place**: the label changes to "Copied" for a
  moment, no toast.
- **No surprise redirects.** A locked action explains what is needed (sign
  in, or a plan) in place, with one clear button, and a close button to
  carry on browsing.
- **One primary button per view.** Everything else is White or a text link.

## Do's and Don'ts

### Do
- Outline every interactive surface in 2px Ink and give it a hard shadow.
- Put product screenshots in frames that match their device.
- Use one bright fill per component; let the screenshots supply the rest
  of the color.
- Highlight one word in a hero title with a tilted marker.
- Write labels as plain verbs: "Copy", "Save", "Get Full Access".

### Don't
- Don't use blurred or soft shadows, gradients on buttons, or 1px gray
  borders.
- Don't tint, crop or filter screenshots.
- Don't use pure black (`#000`) or pure white text on Lime or Yellow.
- Don't use Error Red for anything but error text.
- Don't stack more than two accent colors inside one card.
- Don't hide content behind hover on touch screens.

## Agent Prompt Guide

When building UI in the UXKIN style:
1. Start from Paper `#FBFAF7` and Ink `#141414`; add one accent per component.
2. Every button is a pill with a 2px Ink border, Display font and a hard
   bottom shadow that shrinks when pressed.
3. Cards are White, 24px radius, 2px Ink border, `6px 6px 0` Ink shadow.
4. Headlines use Bricolage Grotesque 800 with tight tracking; body uses DM
   Sans 500 at Ink 80%.
5. Check the result at 390px and 1440px before calling it done.

## Quick Color Reference
Ink `#141414` · Paper `#FBFAF7` · White `#FFFFFF` · Lime `#C8F560` ·
Violet `#6B4EFF` · Yellow `#FFD84D` · Sky `#7CC7FF` · Pink `#FF9AD5` ·
Coral `#FF6A5C` · Error Red `#C4372A`

## Example Component Prompts
- "A primary button: Violet pill, white Bricolage Grotesque 16px bold,
  2px `#141414` border, `0 5px 0 #141414` shadow, lifts 2px on hover,
  drops 3px with a 2px shadow when pressed."
- "A feature card: white, 24px radius, 2px `#141414` border,
  `6px 6px 0 #141414` shadow, a 24px Bricolage title and DM Sans body
  text at 80% ink."
- "An app card: a 5:6 tile in sky blue at 45% with a phone screenshot at
  86% height, 22px radius, 2px ink border and `4px 4px 0` shadow, with the
  app name below in Bricolage 18px."

## Similar Brands
Neo-brutalist product sites with bold outlines and flat offset shadows,
softened with rounded shapes and a pastel-plus-neon palette.

## Quick Start

### CSS Custom Properties
```css
:root {
  --color-ink: #141414;
  --color-paper: #FBFAF7;
  --color-white: #FFFFFF;
  --color-lime: #C8F560;
  --color-violet: #6B4EFF;
  --color-yellow: #FFD84D;
  --color-sky: #7CC7FF;
  --color-pink: #FF9AD5;
  --color-coral: #FF6A5C;
  --color-error: #C4372A;
  --color-placeholder: #E8E8E5;

  --font-display: "Bricolage Grotesque", "Space Grotesk", sans-serif;
  --font-body: "DM Sans", Arial, Helvetica, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, Menlo, monospace;

  --radius-card: 24px;
  --radius-tile: 16px;
  --radius-icon: 12px;
  --radius-pill: 999px;
  --border: 2px solid var(--color-ink);

  --shadow-button-sm: 0 3px 0 var(--color-ink);
  --shadow-button: 0 5px 0 var(--color-ink);
  --shadow-frame: 4px 4px 0 var(--color-ink);
  --shadow-card: 6px 6px 0 var(--color-ink);
  --shadow-modal: 8px 8px 0 var(--color-ink);
  --shadow-focus: 4px 4px 0 var(--color-violet);
}
```

### Tailwind v4
```css
@theme {
  --color-ink: #141414;
  --color-paper: #FBFAF7;
  --color-lime: #C8F560;
  --color-violet: #6B4EFF;
  --color-yellow: #FFD84D;
  --color-sky: #7CC7FF;
  --color-pink: #FF9AD5;
  --color-coral: #FF6A5C;
  --color-error: #C4372A;

  --font-display: "Bricolage Grotesque", sans-serif;
  --font-sans: "DM Sans", Arial, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  --shadow-button: 0 5px 0 #141414;
  --shadow-card: 6px 6px 0 #141414;
}
```

Get a file like this for any website in the library at
[uxkin.com/web](https://uxkin.com/web), or from your coding agent with the
UXKIN MCP tool `find_ui_materials`.
