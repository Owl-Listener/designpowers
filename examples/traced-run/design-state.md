# Design State — Aurora Cookie Consent Banner

> Shared living document for this project. Every agent reads it before starting and updates it on completion. This is the spine of the run — the handoff chain, decisions, reviews, and evidence all accumulate here.

**Project:** A cookie-consent banner for the Aurora dashboard.
**Mode:** Direct (handoffs shown; approvals recorded below).
**Started:** 2026-05-30
**Taste layers:** No client `DESIGN.md` supplied → built from a lightweight project taste calibration (below). Personal taste profile: none loaded (first project for this user). Nothing here was promoted to a personal profile.

---

## Brief (from design-discovery)

- **Problem:** Aurora needs lawful, honest cookie consent. Users must be able to refuse analytics as easily as accept — and not be tricked into accepting.
- **Primary task:** Decide on analytics cookies (accept / reject / choose) and get back to the dashboard.
- **Users / ability spectrum:** Dashboard users on desktop and mobile; includes keyboard-only users, screen-reader users, low-vision users (zoom), and users with motion sensitivity. Situational: people in a hurry who just want to dismiss it correctly.
- **Constraints:** GDPR/ePrivacy posture — reject must be as easy as accept; no pre-ticked analytics; essential cookies need no consent. Web, ships in the existing app shell.
- **Quality bar:** Production.
- **Success:** A user can refuse analytics in one click, understand what they’re agreeing to, and do it by keyboard or screen reader without getting stuck.

## Personas (from inclusive-personas) — abridged

| Persona | Key need | Worst-case condition |
|---------|----------|----------------------|
| Priya — keyboard-only (RSI) | Reach and operate every control without a mouse | Focus must move to the banner and never trap |
| Marcus — screen-reader user | Know what the dialog is and what each button does | Banner must be announced; buttons self-describing |
| Lena — low vision, 200% zoom | Read the text and tell the buttons apart | Contrast + layout that survives zoom/reflow |
| Sam — in a hurry | Dismiss correctly in one action | Reject must be one obvious click, not buried |

## Strategy & principles (from design-strategy)

1. **Honest by default** — accept and reject carry equal visual weight. Refusing is never harder than agreeing.
2. **Plain, specific copy** — say what analytics cookies do and why, at a low reading level.
3. **Non-blocking but focus-first** — don’t hijack the whole screen, but move focus to the banner so assistive-tech users deal with it first.

## Project taste calibration (stands in for a DESIGN.md)

- Calm, trustworthy, neutral. Single blue accent (`#2b5cd9`). Warm-neutral ink, soft 12px radius, one soft shadow. No alarming reds, no playful tone — this is a consent surface, it should feel straight.
- Recorded as the **project** taste layer only.

---

## Handoff Chain (babble — shown to the user during the run)

1. **design-strategist → content-writer:**
   "Core constraint is legal + ethical symmetry: reject must be as easy as accept, no pre-ticked boxes. I framed it as ‘honest by default.’ Copy needs to name analytics cookies plainly and give a why — keep it low reading level."

2. **content-writer → design-lead:**
   "Wrote three button labels with equal commitment: ‘Accept analytics’ / ‘Reject analytics’ / ‘Choose individually’. Body says what analytics does (‘see what’s slow and fix it’) and points to Privacy settings for later changes. Grade ~6. Don’t restyle reject to look weaker — that would undo the symmetry."

3. **design-lead → motion-designer:**
   "Single blue accent on Accept; Reject is an equal-size outline button, not a faint link — symmetry holds. ‘Choose individually’ is the genuinely tertiary action as an underlined button. 44px targets, 12px radius, one soft shadow. Banner is a labelled dialog pinned bottom, non-blocking."

4. **motion-designer → design-builder:**
   "Keep it quiet — a consent surface shouldn’t bounce. At most a 150ms fade-in, and it’s fully removed under prefers-reduced-motion. No looping or attention-grabbing motion. Don’t animate focus movement."

5. **design-builder → reviewers:**
   "Built `artifact/consent-banner.html` using the content-writer’s exact strings. role=dialog + aria-labelledby/describedby, focusable container (focus sent here on load in the real app), 44px targets, :focus-visible ring, reduced-motion handled. Equal-weight Accept/Reject as specified. One thing to check: aria-modal is false (non-blocking) — confirm that’s the right call for screen-reader flow."

## Reviews (parallel: critic ∥ accessibility-reviewer ∥ heuristic-evaluator)

**design-critic — proceed with fixes.** Matches the ‘honest by default’ brief; symmetry intact. Minor: body copy could name the retention/no-3rd-party point, but that’s scope for the privacy page, not the banner. Logged to debt, not fixed now.

**accessibility-reviewer — pass with one finding.** Contrast all AA (see evidence). role/labelling correct, targets ≥44px, focus ring visible, reduced-motion honoured. Finding (Major): `aria-modal="false"` is correct for a non-blocking banner, *but* the build must actually move focus to the dialog on load or screen-reader users may never reach it — flagged to builder to confirm the focus-on-load behaviour in the real app (the static fixture documents the intent via `tabindex="-1"`).

**heuristic-evaluator — 9/10, one H-note.** H2/H4/H6 strong (plain language, consistent, recognition over recall). H3 (user control): good — both choices are one click and reversible via settings. Note: ‘Choose individually’ must lead somewhere real; in the fixture it’s a stub — confirm wiring before ship.

## Reconciliation

- **Aligned:** critic + a11y + heuristic all endorse the equal-weight buttons → keep, do not weaken Reject.
- **Complementary:** a11y focus-on-load finding + heuristic ‘settings must be wired’ note → both go to the fix list.
- **Conflicting:** none.
- **Resolution rules applied:** none needed beyond compiling the fix list (no accessibility-vs-aesthetics conflict arose).

**Fix list (prioritised):**
1. (Major, a11y) Ensure focus moves to the banner dialog on load; verify SR announces it. *Documented in markup intent; behaviour to confirm in app integration.*
2. (Minor, heuristic) Wire ‘Choose individually’ to the real per-category settings.
3. (Note, critic) Consider adding retention/no-3rd-party line on the Privacy page. → **design debt.**

## Synthetic user testing (persona walkthroughs)

| Task: refuse analytics and return | Priya (kbd) | Marcus (SR) | Lena (200%) | Sam (hurry) |
|-----------------------------------|-------------|-------------|-------------|-------------|
| Reach the controls | ✓ (focus order logical) | ✓ (dialog announced via role+label) | ✓ (reflows, no clipping) | ✓ |
| Tell Accept from Reject | ✓ | ✓ (labels self-describe) | ✓ (both buttons, equal weight) | ✓ |
| Refuse in one action | ✓ | ✓ | ✓ | ✓ (Reject is one obvious click) |

No persona is blocked. The one dependency is the focus-on-load behaviour (fix #1) — passing assumes it’s implemented as documented.

## Verification (before shipping) — evidence, not claims

- **Accessibility:** see `artifact/accessibility-evidence.txt` — all text/UI pairings computed at WCAG AA, all PASS; structural checks (targets, focus, roles, reduced-motion) PASS.
- **Build renders:** `artifact/consent-banner.png` (rendered with headless Chromium).
- **Brief met:** reject is one click and equal in weight to accept; copy is plain and names the purpose; banner is a labelled dialog.
- **Open dependencies before real ship:** fix #1 (focus-on-load) and fix #2 (wire settings) — both noted, neither is a fixture defect.

## Design debt register (deferred, tracked — not dropped)

| Item | Severity | Who it affects | Why deferred |
|------|----------|----------------|--------------|
| Add retention / no-third-party line on Privacy page | Note | all users wanting detail | Belongs on the privacy page, out of banner scope |

## Decisions log

- Equal-weight Accept/Reject buttons — *rationale: brief + ethics; endorsed by all three reviewers.*
- Non-blocking dialog (`aria-modal=false`) with focus-on-load — *rationale: don’t hijack the screen, but ensure AT users handle it first.*
- Quiet motion, removed under reduced-motion — *rationale: a consent surface shouldn’t demand attention through movement.*

## Pipeline

| Agent | Status |
|-------|--------|
| design-strategist | ✅ |
| design-scout | ⏭️ skipped (well-understood pattern; legal symmetry is the real constraint, not market research) |
| inspiration-scout | ⏭️ skipped (small surface) |
| content-writer | ✅ |
| design-lead | ✅ |
| motion-designer | ✅ |
| design-builder | ✅ |
| design-critic | ✅ |
| accessibility-reviewer | ✅ |
| heuristic-evaluator | ✅ |

**Agents used: 8 of 10**  ·  **Fix rounds: 1**  ·  **Mode: direct**
