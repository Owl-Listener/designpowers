# Design Retrospective: Solstice — Personal Finance Dashboard

**Date:** 2026-03-22
**Duration:** 3 weeks (2026-03-01 → 2026-03-21)
**Mode:** Mixed (direct for taste calibration + strategy, auto for build + review)
**Agents used:** 8 of 9 (all except inspiration-scout — references were provided upfront)

## Summary

Solstice is a personal finance dashboard redesign for a fintech startup. The brief called for a "calm, trustworthy" experience that makes complex financial data feel approachable. The project ran smoothly through discovery and strategy but hit turbulence during the build phase when the original colour palette failed contrast checks at small text sizes. The taste profile correctly predicted the user's preference for muted tones but underestimated how far "muted" could go before legibility suffered. The fix — shifting from grey-on-grey to a warm slate palette — actually improved the design. Two fix rounds total, both accessibility-driven.

## What Worked

| Decision | Why It Worked | Evidence |
|----------|--------------|----------|
| Card-based layout with generous whitespace | Matched the "breathing room" principle from the taste profile. User said "this is exactly what I meant by calm" | Zero critique flags on layout. User approved on first pass |
| Single accent colour (teal-500) for primary actions | Restraint principle held — one accent made CTAs unmissable without visual noise | Critic passed. Accessibility reviewer confirmed 4.7:1 contrast on all interactive elements |
| System font stack (Inter) with a serif (Lora) for account names | Created the "trustworthy but warm" personality the taste profile described | User explicitly praised this pairing: "it feels like a real bank, not a startup pretending" |
| Progressive disclosure for transaction details | Kept the default view clean. Power users still get depth on click | Usability heuristic passed. No user override needed |
| Motion: 200ms ease-out for card transitions | Felt "confident, not flashy" — matched the taste personality of "someone who speaks clearly and doesn't rush" | Motion designer nailed the brief. User approved without changes |

## What Didn't Work

| Decision | What Went Wrong | Root Cause | Fix Rounds |
|----------|----------------|------------|------------|
| Original neutral palette (grey-200 backgrounds, grey-500 text) | Failed WCAG AA at 14px body text. Contrast ratio was 3.8:1 — needed 4.5:1 | Taste profile said "muted" but didn't set a floor. The design-lead optimised for aesthetics without checking the numbers early enough | 1 round — shifted to warm slate (slate-700 on slate-50) which actually improved the feel |
| Thin 1px borders on data tables | Accessible on desktop, but on mobile the tap targets felt ambiguous — rows didn't feel distinct enough | Responsive patterns weren't tested at mobile breakpoints early enough. The design-builder implemented desktop-first | 1 round — added subtle row striping (slate-50/white alternation) |
| Tooltip-only labels on icon buttons in the sidebar | Screen reader audit flagged missing accessible names. Tooltips don't help keyboard-only users | Content writer and accessibility reviewer weren't looped in until the review phase. Should have been consulted during interaction design | 1 round — added visually hidden labels + aria-label attributes |

## Process Assessment

**Pipeline efficiency:**
- Agents dispatched: 8 of 9
- Agents skipped: inspiration-scout (user arrived with strong references — Linear, Mercury, Monzo)
- Fix rounds: 2 — both were preventable with earlier accessibility checks
- Mode used: mixed — direct for taste/strategy, auto for build/review. This worked well; the user wanted creative control early but trusted the pipeline for execution

**Handoff quality:**
- Discovery → Strategy handoff was strong. The brief captured the user's intent clearly
- Strategy → Taste handoff was excellent. The taste profile referenced the brief's emotional targets directly
- Taste → Design handoff lost some nuance. The "muted palette" guidance didn't include contrast floors, which caused the first fix round
- Build → Review handoff was smooth. The design-builder's implementation matched the compositions closely

**Debate moments:**
- One debate was held: card shadows vs. borderless cards. The design-lead preferred shadows, the design-critic argued borders were cleaner. Debate resolved in favour of shadows with reduced opacity (0.04 instead of 0.08). Good call — the result felt elevated without visual weight
- A debate should have been held on the icon-only sidebar. The design-lead made the call without consulting content or accessibility. This led to the tooltip fix round

**User engagement:**
- 3 overrides total, all in taste calibration (expected — the user was finding their voice)
- 0 overrides during build or review (signals the taste profile was well-calibrated)
- User stayed in auto mode from the plan phase onward — high trust in the pipeline

## Design Debt

**Register status:**
- Total items created: 7
- Resolved: 5 (71%)
- Accepted: 1 — mobile chart labels overlap at < 320px width. Accepted because the target audience uses 375px+ devices. Documented for future responsive work
- Still Open: 1 — dark mode support. Deferred to phase 2. The taste profile has enough signal to inform a dark palette when the time comes
- Escalated during project: 0

**Debt patterns:**
- Most affected persona: "Jordan" (low-vision user) — 3 items related to contrast and text size
- Most common source: accessibility-reviewer (4 of 7 items)
- Average age of open items: 5 days

**Debt health:**
- [x] Resolving debt faster than creating it (5 resolved, 2 remaining)
- [ ] Same types of issues recurring — yes, contrast issues appeared 3 times. Signals a need for automated contrast checking earlier in the pipeline
- [ ] Accepted debt turned out to matter — not yet, but the 320px chart label issue should be monitored

## Taste Evolution

**New strong opinions formed:**
- "Warm neutrals over pure greys" — slate and stone tones feel more trustworthy than pure grey. The shift from grey to slate improved the design measurably. This is now a strong opinion for finance/dashboard contexts
- "One accent colour maximum for data-heavy interfaces" — the teal-only approach made the hierarchy effortless. Adding a second accent (amber for warnings) was considered and rejected — the single-accent restraint made every coloured element meaningful

**Soft patterns confirmed:**
- "Serif for names, sans-serif for data" — used Lora for account names and Inter for everything else. The warmth it added confirmed this as a reliable pairing strategy for products that need personality without sacrificing scannability. Promoted to strong opinion

**Soft patterns rejected:**
- "Flat design over shadows" — the user initially leaned flat, but the shadow debate showed that subtle shadows (0.04 opacity, 2-layer approach) add depth without heaviness. This preference is contextual, not universal

**New anti-patterns discovered:**
- "Grey-on-grey for calm interfaces" — calm doesn't mean low contrast. The original grey palette felt muted but was functionally inaccessible. Anti-pattern: never sacrifice legibility for aesthetic quietness

**Taste surprises:**
- The user chose the serif accent typeface (Lora) over the geometric alternative (DM Sans) — unexpected given their references (Linear, Mercury) are all sans-serif. When asked, they said "I want it to feel more human than those." Valuable signal: references show quality bar, not exact direction

## Carry Forward

**For the next project:**
- Run contrast checks during design, not during review. The grey palette issue was caught late. Integrate automated contrast validation into the design-lead's workflow
- When the taste profile says "muted" or "subtle," always define the accessibility floor alongside the aesthetic ceiling
- Mixed mode (direct for taste, auto for build) is effective for users with strong aesthetic opinions but trust in execution quality

**For specific agents:**
| Agent | Lesson |
|-------|--------|
| **design-lead** | Check contrast ratios before committing to a palette. Use the accessibility-reviewer's standards as constraints during design, not just during review |
| **design-strategist** | The brief's emotional targets ("calm, trustworthy") translated well into taste. Keep doing explicit emotional vocabulary in briefs |
| **content-writer** | Loop in earlier for UI labelling decisions. The icon-only sidebar was a content problem disguised as a design problem |
| **motion-designer** | The 200ms ease-out was perfect. Document this as the default for "confident, calm" products |
| **design-critic** | The shadow debate was valuable. Keep challenging aesthetic defaults — the 0.04 opacity compromise was better than either original position |
| **accessibility-reviewer** | Three contrast issues in one project signals a systemic gap. Propose an automated contrast check step in the pipeline |
| **design-builder** | Test at mobile breakpoints during build, not after. The table border issue was avoidable |

**Open questions for next time:**
- Should contrast checking be automated as a pre-critique gate? The accessibility-reviewer catches issues reliably, but catching them earlier would eliminate fix rounds
- How should the taste profile handle dark mode? The current profile is light-mode specific. Does the emotional target ("calm, trustworthy") translate differently in dark contexts?
- The user's surprise serif choice suggests that references show quality bar, not exact aesthetic direction. Should the taste calibration process make this distinction more explicit?
