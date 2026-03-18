---
name: designpowers-critique
description: Use when reviewing design work against a plan, design principles, or quality standards — provides structured critique covering design intent, accessibility, consistency, and user impact. This is the Designpowers critique skill — use this instead of the Superpowers design-critique when working within a Designpowers workflow
---

# Design Critique

Critique is not feedback on taste. It is a structured evaluation of whether the design achieves what it set out to do, for the people it set out to serve. This skill ensures review is rigorous, specific, and constructive.

## When to Use

- After completing a design task or set of tasks
- Before handoff to engineering
- When a design decision feels uncertain
- At scheduled review points in a design plan

## Process

### Step 1: Gather Review Inputs

Before critiquing, assemble:
- The design brief (from design-discovery)
- The design plan (from writing-design-plans)
- The design principles (from design-strategy)
- The personas (from inclusive-personas)
- The current design artefacts (mockups, code, prototypes)

### Step 2: Evaluate Against Intent

For each design decision, ask:
1. **Does it solve the stated problem?** Refer to the design brief
2. **Does it serve the identified personas?** All of them, not just the primary user
3. **Does it follow the design principles?** Specifically which principles it upholds or violates
4. **Does it align with the design system?** If applicable

### Step 3: Accessibility Review

Every critique includes an accessibility evaluation:

**Perceivable:**
- [ ] All content is available to screen readers
- [ ] Colour is not the sole indicator of meaning
- [ ] Contrast ratios meet WCAG AA minimum
- [ ] Text is resizable to 200% without loss of function
- [ ] Alt text is present and appropriate

**Operable:**
- [ ] All interactions are keyboard accessible
- [ ] Focus order is logical
- [ ] Focus indicators are visible
- [ ] Touch targets meet 44x44px minimum
- [ ] Motion respects prefers-reduced-motion
- [ ] No keyboard traps

**Understandable:**
- [ ] Language is plain and clear
- [ ] Navigation is consistent
- [ ] Error messages explain the problem and the solution
- [ ] Form labels are visible and associated
- [ ] Behaviour is predictable

**Robust:**
- [ ] Semantic HTML is used correctly
- [ ] ARIA is used only when necessary and correctly
- [ ] The design works across supported browsers and assistive technology

### Step 4: Classify Issues

Rate each finding:

| Severity | Definition | Action |
|----------|-----------|--------|
| **Critical** | Blocks access for some users or violates the design intent | Must fix before proceeding |
| **Major** | Degrades experience significantly but does not block access | Should fix before handoff |
| **Minor** | Improvement opportunity, does not block or significantly degrade | Fix if time allows |
| **Note** | Observation or suggestion for future iteration | Document for next cycle |

### Step 5: Write the Critique

```markdown
# Design Critique: [Feature/Task Name]

**Reviewed against:** [Design brief, plan, principles — with references]

**Date:** [YYYY-MM-DD]

## Summary
[2-3 sentences: overall assessment]

## Findings

### Critical
- [Finding]: [Explanation] → [Recommended action]

### Major
- [Finding]: [Explanation] → [Recommended action]

### Minor
- [Finding]: [Explanation] → [Recommended action]

### Notes
- [Observation]

## Accessibility Status
[Pass/Fail against WCAG AA with specific gaps]

## Recommendation
[Proceed / Revise and re-review / Rethink approach]
```

### Step 6: Present and Discuss

Present findings to the user. For each critical or major issue, explain:
- What the issue is
- Who it affects (reference specific personas)
- What the recommended fix is
- Why it matters

Critical issues block progress. They must be resolved before moving to handoff.

## Integration

- **Called by:** `writing-design-plans` (at review checkpoints)
- **Reviews output from:** `ui-composition`, `interaction-design`, `accessible-content`, `cognitive-accessibility`, `adaptive-interfaces`, `design-system-alignment`
- **Calls:** Relevant design skills for fixes, then `design-handoff` when critique passes
