---
name: design-express
description: Use as a lightweight on-ramp for first-time or hesitant users who want a quick win before committing to the full pipeline — "can you just take a quick look", "make me a quick X", or a designer new to the terminal who freezes at the full process. Two tiny loops — express critique (one screen, one fast read) and express build (one component, shown immediately) — in plain language, finishing in about two minutes. Always a GATEWAY into the full workflow, never a replacement for it. Offered to first-time users only; returning users go straight to the Build and Review lanes
---

# Design Express (the On-Ramp)

The full Designpowers pipeline is powerful and the right tool for real work — but it's a lot to commit to in someone's first three minutes, especially for a designer new to the terminal. Express is the on-ramp: the fastest possible loop from "I have a thing" or "I want a small thing" to "here's something useful," in plain language, then a clear door into the full team.

**Express is a gateway, not a bypass.** Designpowers' whole thesis is process over guessing — its anti-patterns explicitly name "this is too small to need discovery" and "let me just quickly build this" as failures. Express does not contradict that. It is a *taster that pulls people into the process*, with three lines held firm:

1. **Accessibility is never skipped.** It's "not a phase" — it stays in even here. No express output ships an inaccessible result.
2. **Express output is always labelled "a starting point, not a finished design."** Never presented as done.
3. **The upward bridge is the point.** Every express result ends by offering the full team. Conversion into the real workflow is the goal, not a quick exit from it.

## When to Use

- A **first-time user** who seems hesitant, or explicitly wants something quick ("just take a quick look", "can you knock together a…", "I only have a minute")
- A designer **new to the terminal** who freezes at the full pipeline
- Offered proactively to first-time users right after the guided walkthrough (see `using-designpowers`)

**Do NOT use for:**
- **Returning users** (taste profile exists) — they know the system; route them to the Build or Review lane.
- **Real project work** — once the user is engaged, move up to the full pipeline. Express is the first two minutes, not the whole job.

If you're unsure whether someone wants express or the full thing, default to offering express to first-timers and the full lanes to everyone else.

## Plain-Language Rule (applies to everything below)

Express talks like a helpful colleague, not a spec.

- **No jargon.** Say "works for people with low vision," not "WCAG 1.4.3." Say "doesn't look clickable," not "insufficient affordance."
- **No mode vocabulary.** Never mention Direct/Auto, handoffs, or the agent roster. Express is always hand-held.
- **Hand-hold the terminal.** Tell people *how* to share a screenshot (drag the file in), how to stop (`Ctrl-C`), and reassure them: "nothing you do here can break anything."
- **One clear next step.** Never end with a menu of six options. End with a single suggested move and the upward bridge.

## Loop A: Express Critique ("one screen")

A fast gut-check on something that already exists.

### A1. Get the screen

```
  Drop a screenshot here, or paste a link to a live page.
  (New to this? You can drag an image file straight into the
   terminal and it'll paste the path. Nothing you do here can
   break anything.)
```

Read the image, or load the URL with browser tooling. If it's a Figma link, pull it in via `figma-bridge`. Evaluate the actual thing, never a description.

### A2. One question

Ask exactly one: **"What's the single thing someone's meant to do on this screen?"** That's the key task — enough to anchor the read without a discovery session.

### A3. One fast read

Do a single consolidated pass — not three parallel agents, not reconciliation. Cover the big three in plain language, worst/plainest first, **max ~5 findings**, ranked:

- **Does it work?** (can a person do the one thing — clarity, the obvious next action)
- **Can everyone use it?** (the accessibility line that stays in — contrast, labels, colour-only meaning, target size — said in plain words). **Verify, don't eyeball** — where you can measure (e.g. compute the contrast ratio of a colour pair), do it. Guessing contrast from a screenshot is unreliable, and "evidence over claims" applies even in express.
- **Does it look intentional?** (craft — hierarchy, spacing, does it feel considered)

```
  ── Quick read ──────────────────────────────
  Three things, plainest first:

  1. [finding] → [what to do]
  2. [finding] → [what to do]
  3. [finding] → [what to do]

  This is a quick gut-check, not a full audit.
```

### A4. Bridge up

End with one move:

```
  Want the specialists to dig in properly? Say "go deeper"
  and I'll bring in the full review team.
```

"Go deeper" → hand off to **`design-review`** (the three reviewers + reconciliation against an inferred brief). The express read becomes the warm-up, not wasted work.

## Loop B: Express Build ("one thing")

One screen or component, drafted fast and shown immediately. This is where the philosophy tension is sharpest — hold the three guardrails.

### B1. Get the one thing

Confirm it's genuinely small — a single component or screen (a sign-up form, a pricing card, a hero section). If the user actually wants a whole product, that's not express — say so warmly and route to the Build lane via `design-discovery`.

### B2. Two questions, max

Not a discovery session — just enough to aim:
- **"Who's it for?"**
- **"How should it feel?"**

Take whatever they give. Don't interrogate.

### B3. Draft it (accessibility kept in)

Produce **one** result fast:
- Apply **design-lead**-style visual decisions and **content-writer**-style real copy (never lorem ipsum).
- **Run a quick accessibility check, and actually verify it** — contrast, labels, focus, target size, reduced motion. Don't just claim it: if you've rendered the artefact, check it for real (measure the contrast ratios, confirm inputs have labels and a visible focus state). This is the line that does not move. If something fails, fix it before showing — don't ship an inaccessible "quick" result.
- Render it via **`figma-bridge`**: a clickable HTML prototype, or a Figma frame if Figma tooling is available. Something the user can actually see and click, not a description.

### B4. Show it, label it, bridge up

```
  Here's a starting point — not a finished design.

  Want to do this properly — understand the users, set a
  direction, get the full team on it? Say "do it properly"
  and I'll start the real process with this as a head start.
```

"Do it properly" → start the full **Build lane** at `design-discovery`, carrying the express draft in as an early artefact so nothing is thrown away.

## What Express Must Never Do

- **Never present express output as finished.** Always "a starting point."
- **Never skip accessibility** to go faster.
- **Never run express for a returning user or a real, scoped project** — that's what the full lanes are for.
- **Never bury the bridge up.** If the user got value, the next sentence is the invitation to go deeper.

## Integration

- **Entry point:** offered to first-time users in the welcome sequence (`using-designpowers`), after the walkthrough or when a user hesitates
- **Loop A bridges to:** `design-review` ("go deeper")
- **Loop B bridges to:** `design-discovery` → the full Build lane ("do it properly")
- **Uses:** `figma-bridge` (render the express build / pull a Figma link), browser tooling (load a URL), `design-memory` is **not** loaded here (express is for users without a profile)
- **Records to:** `design-state.md` only once the user moves up to a full lane — express itself is lightweight and creates no heavy state
