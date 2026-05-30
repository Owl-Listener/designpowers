---
name: design-review
description: Use when the user has an EXISTING design to evaluate rather than something new to build — "review this", "audit this", "what's wrong with this screen", "critique my landing page", or when they share a screenshot, URL, Figma link, or existing code. Routes to a critique-only lane that captures lightweight context, then runs the three reviewers (accessibility, critic, heuristic) in parallel and reconciles their findings — without going through the full greenfield build pipeline
---

# Design Review (Review Mode)

Most design work is improving something that already exists, not starting from a blank page. This skill is the **review-only lane**: it takes an existing artefact — a screenshot, a live URL, a Figma file, a prototype, or existing code — and runs it through the same three reviewers and reconciliation protocol the full pipeline uses, but **without** discovery, strategy, design, and build.

It is the counterpart to the greenfield flow. The greenfield flow asks "What are we designing?" and builds. Review Mode asks "What are we evaluating?" and critiques.

## When to Use

Route here instead of the build pipeline when the user signals they already have something:

- "Review / audit / critique this [screen / page / app / flow / component]"
- "What's wrong with this?" / "How can I improve this?" / "Is this accessible?"
- They share a **screenshot**, a **URL**, a **Figma link**, or point at **existing code**
- They want a usability, accessibility, or craft assessment of work that already exists
- A heuristic or accessibility check on something they didn't build in this session

If the user wants to *build* something new, use the normal pipeline (`design-discovery` → …). If unsure which they want, ask one question: "Do you want me to review something you already have, or design something new?"

## What This Lane Skips and Why

Review Mode deliberately skips discovery, research, strategy, inspiration, planning, and build — there is nothing to build. It does **not** skip accessibility, usability, or craft evaluation. The point is to get a rigorous, reconciled critique fast, then decide what to fix.

## Process

### Step 1: Get the Artefact

Establish what you're reviewing and get access to it:

| Artefact | How to take it in |
|----------|-------------------|
| **Screenshot / image** | Read the image directly |
| **Live URL** | Use browser tooling to load and screenshot it; note interactive states |
| **Figma file or link** | Use the Figma tools (`get_design_context`, `get_screenshot`, `get_metadata`) to pull frames, structure, and tokens |
| **Existing code** | Read the relevant files; if it runs, screenshot the running build |
| **Description only** | Ask for a screenshot or URL — reviewers evaluate what exists, not what's described. If none is available, say findings will be limited to what can be inferred |

Always evaluate the **actual artefact**, never a description of it. If you can only get a static image, say so — keyboard, focus, and screen-reader findings will be inferred, not verified.

### Step 2: Capture Lightweight Context (the Inferred Brief)

The reviewers normally evaluate against a brief, personas, and principles. In Review Mode those don't exist yet, so build a **minimal inferred brief** — three quick questions, not a discovery session:

1. **What is this, and what's the primary thing a person is trying to do here?** (the key task)
2. **Who is it for?** (audience and, critically, the ability spectrum — if the user doesn't know, assume the full spectrum: permanent, temporary, situational)
3. **What's the quality bar and what prompted the review?** (shipping prototype vs. flagship; "it feels off" vs. "failed an audit" vs. "low conversion")

Load the taste profile via `design-memory` if one exists — it gives the critic a real craft benchmark instead of generic preference. If none exists, note that craft critique uses general standards only.

Record this inferred brief in `design-state.md` so all three reviewers share it. Mark it clearly as **inferred** — it was reconstructed for review, not authored up front.

### Step 3: Dispatch the Three Reviewers in Parallel

Run all three reviewers simultaneously against the artefact and the inferred brief (this is the Reconciliation Protocol's Step 1, from `using-designpowers`):

```
        artefact + inferred brief
   ┌────────────┼────────────┐
   v            v            v
design-critic  accessibility  heuristic-evaluator
   |          -reviewer        |
   └────────────┼────────────┘
                v
         reconciliation
```

- **accessibility-reviewer** — WCAG/COGA evaluation of the artefact. On a static image, it flags what it can verify and what it can only infer (e.g., "contrast verified; keyboard order cannot be checked from a screenshot")
- **design-critic** — craft, intent alignment against the inferred brief, and taste-profile fit if one is loaded
- **heuristic-evaluator** (via `heuristic-evaluation`) — Nielsen's 10 + cognitive walkthrough of the key task from Step 2

Each agent narrates (arrival / working / departure) per the Agent Transparency protocol.

### Step 4: Reconcile

Apply the full **Reconciliation Protocol** from `using-designpowers`: classify findings as Aligned / Complementary / Conflicting, then resolve conflicts by the priority rules (accessibility over aesthetics, usability over style, brief over opinion, personas break ties, escalate to user if unresolvable).

### Step 5: Present the Review

Deliver one consolidated, prioritised report — not three separate ones:

```markdown
# Design Review: [What was reviewed]

**Reviewed:** [artefact + how it was accessed]
**Inferred brief:** [key task · audience · quality bar]
**Date:** [YYYY-MM-DD]
**Coverage:** [what was verified vs. inferred — e.g., "static screenshot: visual + content verified; interaction/keyboard inferred"]

## Summary
[2-3 sentences: overall assessment]

## Findings (prioritised, reconciled)

### Critical — blocks access or breaks the key task
- [Source(s)] [Finding] → [Recommended fix] · affects [persona(s)]

### Major — significantly degrades the experience
- ...

### Minor — improvement opportunities
- ...

### Notes — future iteration
- ...

## What Works Well
- [Genuine strengths — review is not only problems]

## Recommendation
[Ship as-is / Fix criticals first / Rethink — and the single most important next move]
```

For each Critical and Major finding, name who it affects (reference the audience from Step 2) and why it matters — not just what's wrong.

### Step 6: Offer Next Steps

End by handing the decision to the user. Offer the routes that fit the artefact:

- **Fix it** — if it's code you can edit, dispatch `design-builder` with the prioritised fix list. If it's a Figma file, produce the fix as spec or push corrected frames via the Figma bridge (see `figma-bridge`)
- **Track it** — send deferred Minor/Note findings to `design-debt-tracker` so they aren't silently dropped. Accessibility debt requires explicit user acknowledgement to accept
- **Go deeper** — if the review reveals the problem is strategic (the flow itself is wrong, not the execution), recommend dropping into the full pipeline at `design-strategy` or `design-discovery`
- **Validate with people** — if findings are contested, suggest `synthetic-user-testing` (persona walkthroughs) or `usability-testing` (real participants)

The user decides. The review proposes; it does not auto-fix without direction.

## Integration

- **Entry point:** the welcome sequence in `using-designpowers` (Review vs. Build fork)
- **Loads:** `design-memory` (taste profile, if any)
- **Pulls artefacts via:** browser tooling, `figma-bridge` (Figma files), file reads (code)
- **Dispatches:** accessibility-reviewer, `designpowers-critique` (design-critic), `heuristic-evaluation` (heuristic-evaluator) — in parallel
- **Reconciles via:** the Reconciliation Protocol in `using-designpowers`
- **Hands off to:** `design-builder` (fixes), `design-debt-tracker` (deferred), `design-strategy`/`design-discovery` (if strategic), `synthetic-user-testing`/`usability-testing` (validation)
- **Records to:** `design-state.md` (inferred brief, findings, reconciliation decisions)
