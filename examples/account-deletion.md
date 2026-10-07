# Worked example: account deletion

**The request:** *"Add a way for users to delete their account in our iOS
app."*

Apple requires apps that let people sign up to also let them delete their
account from inside the app, so this is a screen almost every app needs and
almost nobody designs on purpose.

## Without UXKIN

The agent has nothing to go on but habit, so it builds the usual thing: a
red **Delete account** row at the bottom of Settings that opens a system
alert ("Are you sure? This can't be undone. Cancel / Delete") and signs the
user out. One screen, one tap. It works, but it doesn't say what gets
deleted, doesn't offer a gentler option, and doesn't confirm anything
afterwards.

## With UXKIN

### 1. Look at how real apps do it

```json
find_ui_references({ "query": "delete account", "limit": 10 })
```

UXKIN returns complete deletion journeys from real apps (results from the
library in October 2026):

| App | Journey | Screens |
|-----|---------|--------:|
| HYPE | Delete an account | 5 |
| Chopra | Delete an account | 3 |
| GO Club | Delete an account | 6 |
| Fresha | Delete an account | 8 |
| Poppy | Delete an account | 5 |
| Calm | Delete an account | 3 |
| Uber | Delete an account | 6 |
| Gowalla | Delete an account | 3 |
| DailyArt | Deleting account | 6 |
| Tilt | Deleting account | 4 |

Across the 14 apps in the library with a deletion journey, the flow takes
3 to 8 screens, usually 5. None of them is a single alert.

### 2. Open a few journeys end to end

```json
get_journey({ "journey_id": "j_MK_feACLOmXV" })
```

`get_journey` returns every screen of the journey in order, so the agent
can look at each step. A few things stand out when comparing journeys:

- **It starts from the account screen, not a buried setting.** DailyArt's
  deletion begins on the same screen as changing the password, cancelling
  the subscription and adjusting text size. ASOS starts from the account
  details screen shared with editing the profile and changing the password.
- **Some apps offer a softer option first.** Tinder's deletion starts on
  the same screen as *Deactivating account temporarily*: people who only
  want a break don't have to lose everything.
- **Length follows what the account holds.** Calm, Chopra and Gowalla
  do it in 3 screens; Fresha (bookings) and ASOS (orders) take 8.
- **There's a clear ending.** DailyArt's journey finishes back on its
  log-in screen, so it's obvious the account is gone.

### 3. Decide

From those references, the agent settles on a flow and can say why:

1. **Account screen → "Delete account"**, grouped with the other account
   actions (password, subscription), not hidden at the bottom of Settings.
2. **What happens to your data**: one screen listing what is deleted,
   what is kept (receipts, for legal reasons) and that an active
   subscription must be cancelled separately in the App Store, with a link.
3. **Offer the alternative**: if the app has anything like a pause or
   sign-out, offer it here once, without guilt-tripping.
4. **Confirm deliberately**: re-enter the password (or type DELETE for
   social sign-in), then a destructive button that names the action:
   *Delete my account*.
5. **Finish clearly**: a short "Your account has been deleted" screen,
   then back to the welcome or log-in screen.

### 4. Build

Now the agent builds the screens using the app's own components and
copy style, and covers the states the references show: loading while
deleting, a failed request with a retry, and the signed-out end state.

## Try it

With UXKIN connected, paste this into Claude Code, Cursor, Codex or Copilot:

```text
Add account deletion to this app. First use UXKIN to look at 3 to 5 real
deletion journeys (find_ui_references, then get_journey), tell me what
they have in common and what you'll copy, then build it with our
existing components.
```
