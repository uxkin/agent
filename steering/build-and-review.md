# Building and checking UI

## Build

- Read the target components, shared styles and the screens around the
  change first. Name the one task the person is trying to do on this
  screen.
- One accent color, a real type scale, consistent spacing steps.
- Real, specific copy in the product's words: no lorem ipsum, no "Submit"
  where a specific label fits.
- Design every state: first use or empty, loading, error with a way to
  recover, long text, many items, small screens.
- Don't invent features, data, prices or backend behavior.
- Avoid decorative gradients, glassmorphism, grids of identical
  icon-title-sentence cards, emoji as icons and fake stats or
  testimonials.

## Review

Once it renders, look at the real result, not just the code: a phone
width and a desktop width (390px and 1440px), and keyboard use. Fix
broken layouts, contrast below 4.5:1, missing focus states, touch targets
under 44px and unlabelled inputs.

When reporting back, say what you actually checked and what you couldn't.
