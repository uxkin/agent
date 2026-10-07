# Finding and using real references

## Search in plain words

Call `find_ui_references` with the product type, the screen or flow and,
if it matters, the platform: "meditation app onboarding", "delete
account", "cancel subscription", "empty state search results". Skip
filler words like "screen", "design" or "UI".

Try a second wording when the first is thin: apps name flows in their own
words, so "cancel subscription" and "manage subscription" find different
journeys.

## Prefer journeys for flows

For anything with more than one step (sign-up, checkout, cancellation,
account deletion, onboarding), open 3 to 5 journey results with
`get_journey` and compare them end to end:

- **Where does it start?** Which screen leads into the flow, and what
  else is on it.
- **How many steps, and what is each one for?** Note steps that exist only
  to persuade or survey, and decide on purpose whether to keep them.
- **Where does it end?** A confirmation, the home screen, the next task,
  a paywall.

Summarize what the references have in common and where they differ
before deciding. One or two strong references beat ten skimmed ones.

## Use the pattern, not the product

References guide decisions; they are not templates. Learn the pattern,
then fit it to this product's components, copy and constraints. Never
copy another product's branding, logos, illustrations or text. The
product's own requirements, accessibility and platform conventions always
win over a reference.

Tell the user which references shaped the decision, by app and journey
name, so they can look at them on uxkin.com.
