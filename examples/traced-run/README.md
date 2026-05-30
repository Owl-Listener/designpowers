# Traced run — Aurora cookie consent banner

A worked, end-to-end example of a Designpowers pipeline producing a real,
verified artifact. It exists so the orchestration is **demonstrated**, not just
described — for a system whose creed is "evidence over claims," there should be
at least one trace you can read and a build you can open.

## What's here

| File | What it is |
|------|-----------|
| `design-state.md` | The spine of the run — brief, personas, strategy, the full handoff babble chain, parallel reviews, reconciliation, synthetic testing, verification, debt, and the pipeline tally. This is what every agent reads and updates. |
| `artifact/consent-banner.html` | The actual build. Open it in a browser. |
| `artifact/consent-banner.png` | The build rendered with headless Chromium (the screenshot-checkpoint output). |
| `artifact/accessibility-evidence.txt` | WCAG AA contrast **computed** (not eyeballed) for every text/UI pair, plus structural checks. All pass. |

## Why a cookie banner

It's small enough to read in one sitting but deliberately rich in the tensions
the pipeline is meant to resolve: an **ethics/legal** constraint (reject must be
as easy as accept — no dark patterns), an **accessibility** constraint (focus
management, screen-reader announcement, contrast, targets), a **content**
constraint (plain language about what you're agreeing to), and a **usability**
constraint (one-click refusal). The reconciliation step has something real to
reconcile.

## What is and isn't automated here

Honest scope: this trace was produced by driving the workflow's stages and
genuinely creating each stage's output — the artifact is real, it renders, and
its accessibility numbers are **computed by tooling**, not asserted. What it is
*not* is a capture of ten separately-dispatched subagent processes; the agent
voices in the handoff chain are the workflow executed as written, recorded in
the shared state the way a live run records them.

Two follow-through items are noted in `design-state.md` as app-integration
dependencies (sending focus to the dialog on load; wiring the "Choose
individually" settings screen) — they're documented as intent in the markup and
flagged in review, not hidden.

## Regenerating the evidence

```bash
# render (needs playwright chromium)
node scripts/shoot.js examples/traced-run/artifact/consent-banner.html \
  examples/traced-run/artifact/consent-banner.png
# contrast + structural checks are in artifact/accessibility-evidence.txt
```
