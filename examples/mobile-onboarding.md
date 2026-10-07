# Worked example: mobile onboarding

**The request:** *"Design the onboarding for our iOS podcast app."*

## Without UXKIN

The agent reaches for the default: three swipeable cards with an
illustration, a headline and "Next", dots at the bottom, then a **Get
started** button that drops the user on an empty home screen. Every app
built this way looks the same, and the user still hasn't done anything.

## With UXKIN

### 1. Find onboarding flows

```json
find_ui_references({ "query": "onboarding", "limit": 10 })
```

Results from the library in October 2026:

| Type | App | Title | Screens |
|------|-----|-------|--------:|
| journey | DailyArt | Onboarding | 8 |
| journey | Neuecast | Onboarding | 6 |
| journey | Reeder. | Onboarding | 6 |
| journey | Google Gemini | Onboarding | 6 |
| screen | ASOS | Screen 4 (Onboarding) | |
| screen | DailyArt | Screen 1 (Onboarding, Welcome Screen) | |
| screen | DailyArt | Screen 39 (Onboarding, Subscribing) | |
| screen | Google Gemini | Screen 1 (Learning about Google Gemini, Onboarding) | |

Neuecast is a podcast app, so it's the closest match. The others show
different ways to end an onboarding.

For the account step, a second search helps:

```json
find_ui_references({ "query": "sign up", "limit": 10 })
```

134 apps in the library have a *Create an account* journey to compare.

### 2. Follow each journey to its last screen

```json
get_journey({ "journey_id": "j_W0A17tc_Oldd" })
```

Looking at where each onboarding **ends** is the useful part, and the
journey data shows it directly, because the last screen is shared with
the app's other journeys:

- **Neuecast** (podcasts, 6 screens) ends on the screen where you mark
  episodes as played and bookmark them: the onboarding finishes where
  listening starts.
- **Reeder.** (a reader, 6 screens) ends on the screen where you add feeds,
  create folders and tags: the user's first job is the next tap.
- **Google Gemini** (6 screens) spends three screens on *Learning about
  Google Gemini*, then ends on asking the first question.
- **DailyArt** (8 screens) ends on its subscription screen: onboarding
  leads straight into the paywall.

Every one of them ends inside the app, on a screen where the user does
something, not on a "You're all set" card.

### 3. Decide

For a podcast app, following Neuecast and Reeder.:

1. **Welcome**: one screen, the app's name and a single promise, with
   *Get started* and *I have an account*.
2. **Pick topics** (or import subscriptions from another app): this gives
   the home screen something in it.
3. **Notifications**, asked with a reason ("Get new episodes from shows
   you follow"), skippable.
4. **Finish on the episode list**, already filled from step 2, with the
   first episode ready to play.
5. **Account later**: creating an account only when the user wants to
   sync or subscribe, not as a wall at the start.

If the app has a paid plan, DailyArt's journey shows the alternative of
ending on the paywall; the agent can lay out both and let you choose.

### 4. Build

The agent builds the screens with the app's components and type, and
covers the states the references imply: no topics chosen, notification
permission denied, and an import that finds nothing.

## Try it

```text
Design our onboarding. Use UXKIN to open 3 to 4 real onboarding journeys
from apps like ours (find_ui_references, then get_journey), tell me how
each one ends and which ending fits us, then build it.
```
