# Worked example: subscription cancellation

**The request:** *"Build the flow for cancelling a subscription."*

## Without UXKIN

The agent guesses. Usually that means a **Cancel subscription** button on a
settings page and a confirmation alert, or the opposite extreme, a long
chain of "Are you sure?" screens with offers, because it has seen both
somewhere in its training data and can't tell which fits.

## With UXKIN

### 1. Find the real flows

```json
find_ui_references({ "query": "cancel subscription", "limit": 10 })
```

Results from the library in October 2026:

| Type | App | Title | Screens |
|------|-----|-------|--------:|
| journey | DailyArt | Canceling subscription | 5 |
| journey | Vocabulary | Canceling subscription | 6 |
| journey | Vocabulary | Providing feedback on subscription cancellation | 4 |
| screen | DailyArt | Screen 45 (also in: Deleting account, Changing profile password, …) | |
| journey | Binsoo | Manage a subscription | 5 |
| journey | Bear | Manage a subscription | 4 |
| journey | Matter | Manage a subscription | 4 |
| journey | Pinkllama | Manage a subscription | 8 |
| … | | | |

Two apps have a journey named for cancelling, and 68 apps have a *Manage a
subscription* journey, which shows where the plan, its price and the way
out sit in each app.

### 2. Compare the journeys

```json
get_journey({ "journey_id": "j_y1x4CSYSAyEu" })
get_journey({ "journey_id": "j_bvUq4QFf85RO" })
```

What the journeys show:

- **Vocabulary spends most of the flow on feedback.** Screens 3 to 6 of its
  6-screen cancellation are the same screens as its *Providing feedback on
  subscription cancellation* journey: two steps to cancel, four asking why.
- **DailyArt starts from the account screen.** Its cancellation begins on
  the same screen as deleting the account, changing the password and
  adjusting text size: one place for everything about your account.
- **The plan page is the natural home.** With 68 *Manage a subscription*
  journeys to compare, the agent can see how apps show the current plan
  and where they place the way out.

### 3. Decide

1. **Entry point:** Account → **Subscription**, a page that shows the plan,
   price and renewal date, with *Change plan* and *Cancel subscription*.
2. **One question, optional:** "Why are you cancelling?" with 4 or 5
   choices and a skip. Vocabulary's four-screen survey is one data point;
   one screen keeps the useful part without making cancelling feel like a
   trap.
3. **Say what happens:** access continues until the end of the paid
   period, with the date.
4. **Confirm once**, with a button that names the action: *Cancel
   subscription*. No second "Are you sure?".
5. **Done state** on the subscription page: "Cancelled. Full access until
   12 November", with a *Resubscribe* button.

For App Store subscriptions, step 4 hands off to Apple's subscription
sheet instead; the rest of the flow stays the same.

### 4. Build

The agent builds the subscription page and the three steps with the app's
components, including the states the references show: loading the current
plan, a failed cancellation with retry, and the cancelled state.

## Try it

```text
Build our subscription cancellation flow. Use UXKIN first: search
"cancel subscription" and "manage subscription", open at least three
journeys with get_journey, and tell me which steps you're keeping and
which you're dropping before you write code.
```
