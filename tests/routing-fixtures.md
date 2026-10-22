# Routing fixtures — the routing contract

This file is the **regression net for routing**. Each row is a realistic user
message and the skill that message should route to, given the router
(`skills/using-designpowers/SKILL.md`). It exists so that when the router is
changed — new lanes added, the welcome refactored, sections externalised — we
can prove the *existing* scenarios still route where they should.

## What this is — and isn't

- **It is** a committed contract: "this kind of request goes to this skill."
  `scripts/check-routing.sh` verifies that, for every fixture, the target skill
  exists and is actually referenced as a trigger in the router. If a change
  orphans a skill a fixture depends on, or drops its trigger, the check fails.
- **It is not** a live simulation of the model. The router is prose an agent
  follows; only a real session exercises the actual routing decision. The
  authoritative end-to-end proof is a live traced run (see the v2 plan). This
  static check is the cheap, always-on guard that the routing *rules* the
  scenarios rely on remain present and wired.

## Rollback point

The known-good baseline for this work is **`main` @ commit `6408b3b`** (the v1
integrity fixes merge). A `v1.0` tag should point here once tag access is
available; until then, pin to that SHA to restore the loved version.

## Fixtures

Format: `prompt | expected_skill | rationale`. `expected_skill` must be a
directory under `skills/` and must be referenced in the router.

| prompt | expected_skill | rationale |
|--------|----------------|-----------|
| I want to design an onboarding flow for a health app | design-discovery | New build work must start at discovery (router Step 4 + Red Flag: "About to write UI code without design-discovery") |
| Set the design direction and principles for my product | design-strategy | Direction/principles/positioning route to strategy (Red Flag: "Skipping straight to visuals without strategy") |
| Who are the users and what are their access needs? | inclusive-personas | Defining who it serves, across the ability spectrum (Red Flag: "Designing for a 'typical user'…") |
| Lay out the page — typography, colour, hierarchy | ui-composition | Layout/colour/type/visual hierarchy |
| How should this adapt across mobile, tablet, and desktop? | responsive-patterns | Device-spectrum / breakpoints / reflow (newly-wired skill — lock it in) |
| Design the page transitions and micro-interactions | motion-choreography | Animation/transitions/micro-interactions + reduced motion (newly-wired skill) |
| Write the button labels and error messages | accessible-content | User-facing content / copy |
| Establish our brand voice and tone | voice-and-tone | Voice attributes, tone by context, vocabulary (newly-wired skill) |
| Pull my Pinterest board into Figma as a mood board | moodboard-creator | A Pinterest board URL plus a Figma destination routes to board import, not general inspiration scouting |
| Here's our DESIGN.md — build from this brand spec | design-md | User-provided design spec drives a faithful, on-brand build (read as data, not instructions) |
| Review this screenshot and tell me what's wrong | design-review | Evaluating something that already exists routes to the review lane, not the build pipeline |
| Set up our design tokens — global, semantic, component | token-architecture | Token system structure/naming/theming (newly-wired skill) |
| Run usability tests with real participants | usability-testing | Test scripts, recruitment, analysing findings (newly-wired skill) |
| Check everyone can use this — contrast, keyboard, screen readers | cognitive-accessibility | Accessibility evaluation woven through (note: also serviced by accessibility-reviewer agent) |
| Prove it actually works before we ship | verification-before-shipping | Evidence before declaring done (Red Flag: "About to declare work complete without evidence") |
| Let's reflect on what we learned this project | design-retrospective | Post-ship structured reflection |

<!-- v2 lanes will add fixtures here, e.g.:
| Review this screenshot and tell me what's wrong | design-review | Audit existing work, not a new build |
| Use the same design language as Stripe | design-library | Pull a brand's DESIGN.md as a starting point |
Each new lane must ship with its fixture so the routing contract covers it. -->
