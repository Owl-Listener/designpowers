---
name: design-memory
description: Use when starting a new project or when taste decisions are made — accumulates the user's aesthetic preferences, recurring patterns, and design instincts across projects so each new project starts with what the system already knows about their taste
---

# Design Memory

Design memory is the system's understanding of your taste. Not a style guide — a living record of the aesthetic instincts, recurring preferences, and design convictions you've demonstrated across projects. Every project teaches the system something about how you see. This skill captures those lessons so you stop repeating yourself.

## Welcome Gate

**BEFORE loading or updating design memory, check whether the Designpowers welcome sequence has been shown this session.** If the user has not yet seen the welcome (the bird, the greeting, and the walkthrough offer), you MUST invoke the `using-designpowers` skill FIRST and complete the welcome sequence before returning here. The bird must appear before any work begins. No exceptions.

## Two Layers of Taste

Taste comes in two kinds, and conflating them is a serious bug — especially for a designer who works for many clients with different tastes.

| Layer | Lives in | Scope | Accumulates? |
|-------|----------|-------|--------------|
| **Personal taste** | `~/.designpowers/taste-profile.md` (this skill) | The designer's *portable* instincts — how they decide, regardless of client | **Yes**, across all projects |
| **Project / client taste** | `DESIGN.md` (`design-md`, the open standard) + `design-state.md` | What *this* client/project requires — brand, tokens, voice | **No** — it belongs to the project |

**Design memory only owns the personal layer.** It records the instincts that travel with the designer — their craft standards, their decision tendencies, the moves they make whoever they're working for. It must **not** absorb a client's brand into the designer's personal profile. The fact that a fintech client needed a restrained teal palette is *that client's* taste; it must not become "the designer prefers restrained teal," or it will wrongly steer the next client's children's app.

When a project has a `DESIGN.md` (the open Google Labs standard — see `design-md`), that file is authoritative for the project. The personal profile only fills gaps it doesn't specify — and the project never writes back into the personal profile except through the **Promotion Gate** below.

### Portable vs. client-bound signals

Only **portable** signals are eligible for the personal profile:

| Eligible (portable — how the designer works) | NOT eligible (client-bound — what one brand needed) |
|----------------------------------------------|------------------------------------------------------|
| "Decides colour last, after structure is settled" | "Uses #2f6f5f as the accent" |
| "Defaults to generous whitespace, willing to scroll" | "This brand uses Fraunces for headings" |
| "Always wants visible focus indicators" | "This client's voice bans exclamation marks" |
| "Reaches for editorial serif when a UI needs personality" | "The storefront uses a right-side cart sheet" |

The test: *would this still be true on a completely different client?* If yes, it may be personal. If it only makes sense for this brand, it stays in `DESIGN.md`.

## When to Use

- At the start of any new project — load existing taste profile before discovery begins
- After any user override or correction — these are the strongest taste signals
- After design-critic or design-lead make decisions the user explicitly approves
- At project completion — extract and consolidate taste learnings
- When the user says something like "I always want..." or "I never want..." or "that's not me"

## The Taste Profile

The taste profile lives at `.designpowers/taste-profile.md` in the user's home directory (cross-project) or in the project root (project-specific overrides). The home directory version is the canonical record. Project-specific overrides are temporary and scoped.

### Structure

```markdown
# Taste Profile

_Last updated: [date] from project [project name]_
_Projects contributed: [count]_

## Aesthetic Identity

### Visual Language
- **Palette tendency:** [e.g., "muted earth tones, avoids saturated primaries"]
- **Typography stance:** [e.g., "geometric sans for UI, serif for editorial — never decorative faces"]
- **Density preference:** [e.g., "generous whitespace, never cramped — willing to scroll"]
- **Shape language:** [e.g., "soft radius (8-12px), never fully rounded, never sharp"]
- **Imagery style:** [e.g., "photographic over illustrative, desaturated, real people not stock"]

### Interaction Style
- **Animation philosophy:** [e.g., "purposeful and subtle — no delight animations"]
- **Feedback approach:** [e.g., "immediate, quiet confirmation — no modals for success"]
- **Navigation preference:** [e.g., "flat structures, avoids deep nesting"]
- **Error handling tone:** [e.g., "direct and helpful, no humour in errors"]

### Content Voice
- **Tone range:** [e.g., "professional but warm — never corporate, never casual"]
- **Formality level:** [e.g., "uses contractions, avoids jargon, addresses user as 'you'"]
- **Vocabulary stance:** [e.g., "plain language advocate — reading level grade 8 or below"]

## Strong Opinions

Decisions the user has made repeatedly or emphatically. These are near-certain for future projects.

| Opinion | Strength | Evidence |
|---------|----------|----------|
| [e.g., "No hamburger menus on desktop"] | Strong (3 projects) | Overrode design-lead in Project A, Project C. Stated preference in Project B |
| [e.g., "Dark mode must be true dark, not grey"] | Strong (2 projects + explicit statement) | User said "I never want grey dark mode" in Project B |
| ... | ... | ... |

## Soft Patterns

Tendencies that have appeared but are not yet confirmed as strong opinions. These are suggestions, not constraints.

| Pattern | Occurrences | Context |
|---------|-------------|---------|
| [e.g., "Tends to prefer left-aligned over centered headings"] | 2 projects | Approved left-aligned in A, didn't comment in B |
| ... | ... | ... |

## Anti-Patterns

Things the user has explicitly rejected or corrected away from.

| Anti-Pattern | Evidence |
|--------------|----------|
| [e.g., "Gradient backgrounds"] | Rejected in Project A, replaced in Project B |
| [e.g., "Skeleton loading screens"] | "Just use a spinner" — Project C |
| ... | ... |

## Project History

| Project | Date | Key Taste Decisions | New Learnings |
|---------|------|--------------------|-|
| [name] | [date] | [2-3 key decisions] | [what we learned about taste] |
| ... | ... | ... | ... |
```

## Process

### Loading Memory (Start of Project)

1. **Check for a project `DESIGN.md` first** (via `design-md`). If one exists, it is the authoritative project/client taste layer — load it and treat the personal profile as *gap-filler only*, always overridable by the `DESIGN.md`.
2. **Check for existing personal taste profile** at `~/.designpowers/taste-profile.md`
3. If it exists, read it and present a summary to the user:
   > "Based on previous projects, I know you tend toward [key patterns]. Any of these no longer true?"
4. Pass strong opinions to **design-lead** and **design-strategist** as constraints — they should not propose work that contradicts strong opinions unless they explicitly flag why. **Where a `DESIGN.md` is present, it takes precedence over personal opinions for this project.**
5. Pass soft patterns as suggestions — agents can reference them but are not bound by them
6. Pass anti-patterns as exclusions — agents should avoid these unless the user explicitly asks for them

### Capturing Signals (During Project)

Listen for taste signals throughout the workflow:

| Signal Type | Strength | Example |
|-------------|----------|---------|
| **User override** | Strongest | User changes colour the design-lead chose |
| **Explicit statement** | Strong | "I always want visible focus indicators" |
| **Emphatic approval** | Moderate | "Yes! That's exactly right" |
| **Silent approval** | Weak | User does not comment on a decision (do not record as preference until pattern repeats) |
| **Correction** | Strong (negative) | "No, not like that — more like..." |

When a taste signal is detected:

1. Classify it (strong opinion, soft pattern, or anti-pattern)
2. Check if it reinforces or contradicts an existing entry
3. If new: add to appropriate section
4. If reinforcing: increase strength / add evidence
5. If contradicting: flag to user — "You preferred X in the last project but chose Y this time. Has your preference changed?"

### Consolidating (End of Project)

When a project completes (after verification-before-shipping):

1. Review all decisions logged in `design-state.md`
2. Review all user overrides from the handoff chain
3. Extract candidate taste learnings — then run each through the **Promotion Gate** below before writing anything to the personal profile
4. Update the taste profile (gated learnings only):
   - Promote repeated *portable* soft patterns to strong opinions
   - Add new *portable* soft patterns from single-occurrence decisions
   - Add new anti-patterns from rejections
   - Update project history
5. Show the user what was learned:
   > "From this project, I learned: [new learnings]. Your taste profile now has [X] strong opinions and [Y] soft patterns."

### The Promotion Gate (anti-contamination)

This is the mechanism that stops one client's brand from polluting the designer's personal profile. **Every candidate learning must pass this gate before it is written to `~/.designpowers/taste-profile.md`:**

1. **Is it portable, or client-bound?** Apply the test from "Two Layers of Taste": *would this still be true on a completely different client?* A client-bound signal (a specific brand colour, a contracted voice rule, a required component) belongs in that project's `DESIGN.md` — **never** the personal profile. Drop it from the candidate list.
2. **Was it the designer's instinct, or the client's requirement?** A decision the brief or `DESIGN.md` *forced* is not a taste signal — it's compliance. Only decisions that reflect the designer's own judgement are eligible. (A designer following a client's mandated palette tells you nothing about their taste.)
3. **For anything ambiguous, ask — don't assume.** When you can't tell whether a signal is "this is me" or "this was just this job," **ask the designer**: *"You used a lot of generous whitespace on this project — is that you, or just what this client needed?"* Only promote on a clear "that's me." Silence or "just this client" means it stays out.
4. **A `DESIGN.md` never writes back.** Loading or following a project's `DESIGN.md` produces **zero** personal-profile writes. The standard file is the project layer, full stop.

When in doubt, keep the personal profile small and clean. A profile contaminated with ten clients' brand specifics is worse than useless — it actively misleads the next project. Under-recording is recoverable; contamination is not.

## Integration With Agents

### How Agents Use Memory

| Agent | How they use the taste profile |
|-------|-------------------------------|
| **design-strategist** | References voice and content preferences when setting principles |
| **design-lead** | Treats strong opinions as constraints, soft patterns as starting points |
| **design-scout** | Filters competitive research through taste preferences — "you usually dislike X, but this competitor does it well because..." |
| **motion-designer** | References animation philosophy — if the user prefers subtle, don't propose elaborate choreography |
| **content-writer** | References tone, formality, and vocabulary preferences |
| **design-builder** | References interaction style preferences for implementation decisions |
| **design-critic** | Evaluates whether output matches known preferences — flags drift |
| **accessibility-reviewer** | Cross-references any taste preferences that might conflict with accessibility |

### Taste vs. Accessibility

If a taste preference conflicts with accessibility requirements, **accessibility always wins**. But flag it:

> "Your taste profile says 'no focus indicators on clean UI elements,' but WCAG requires visible focus. I'll ensure focus indicators are present but styled to match your minimal aesthetic."

## Conflict Resolution

When taste memory conflicts with a current project's needs:

1. **Project context wins over historical preference** — if the brief or the project's `DESIGN.md` demands something the user usually avoids, the project wins
2. **Flag the tension** — "Your taste profile prefers muted palettes, but this children's app brief calls for vibrant colour. Going with the brief — let me know if you want to adjust"
3. **Never silently override taste** — always explain when and why a known preference is being set aside
4. **Following the project does not update the profile** — overriding personal taste to satisfy a client is *not* evidence the personal taste changed. Don't record it. The personal profile only changes when the *designer's own instinct* changes, never because a client required something different (see the Promotion Gate)

## Integration

- **Called by:** `using-designpowers` (at project start), `design-state` (at project end)
- **Reads from:** `design-state.md`, handoff chain, user overrides
- **Writes to:** `~/.designpowers/taste-profile.md`
- **Informs:** All agents via constraints passed at dispatch time
- **Pairs with:** `design-discovery`, `designpowers-critique`, `design-retrospective`

## Anti-Patterns

| Pattern | Why It Fails |
|---------|-------------|
| Recording every decision as a taste preference | Most decisions are contextual, not taste. Only record decisions that reflect personal aesthetic judgement |
| Treating soft patterns as constraints | Soft patterns are hypotheses. They need more evidence before becoming constraints |
| Never updating the profile | Taste evolves. If a user contradicts a strong opinion, update it — don't cling to the old data |
| Overriding project needs with taste | The brief and personas come first. Taste is a tiebreaker and a starting point, not a trump card |
| Recording accessibility overrides as taste | If the user accepts an accessibility-driven change, that's compliance, not preference. Don't record "prefers visible focus indicators" just because they accepted a WCAG fix |
| Promoting a client's brand into the personal profile | A client's `DESIGN.md` is *that client's* taste. Recording its palette/voice/components as the designer's preference contaminates the profile and misleads the next project. Run every candidate through the Promotion Gate — portable signals only |
| Recording a forced override as a changed preference | Overriding personal taste to satisfy a brief is compliance, not a taste change. The personal profile only moves when the designer's own instinct moves |
