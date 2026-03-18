---
name: design-strategy
description: Use when setting design direction — establishing principles, competitive positioning, experience mapping, or aligning stakeholders on what the design should achieve and why
---

# Design Strategy

Strategy is the bridge between understanding and making. It takes what you learned in discovery and research and turns it into a clear direction that every design decision can be measured against.

## When to Use

- After discovery and/or research, before detailed design work
- When stakeholders disagree about direction
- When the team needs shared design principles
- When positioning against competitors
- When defining what makes this experience distinctive

## Process

### Step 1: Synthesise Inputs

Gather everything from previous phases:
- Design brief (from design-discovery)
- Research findings (if research-planning was used)
- Personas (from inclusive-personas)
- Existing design system or brand guidelines
- Business objectives and constraints

### Step 2: Competitive Landscape

If relevant, map the competitive landscape:

```markdown
## Competitive Analysis

| Competitor | Strengths | Weaknesses | Accessibility | Differentiation Opportunity |
|-----------|-----------|------------|---------------|---------------------------|
| [Name] | [What works] | [What fails] | [WCAG compliance, inclusive design quality] | [Where we can do better] |
```

Pay specific attention to where competitors fail on accessibility — this is often the largest opportunity for differentiation.

### Step 3: Define Design Principles

Write 3-5 design principles that will guide every decision. Good principles are:

- **Opinionated** — they take a position, not state the obvious
- **Actionable** — a designer can use them to make a decision
- **Testable** — you can evaluate a design against them
- **Inclusive** — at least one principle explicitly addresses accessibility

Example format:
```markdown
### [Principle Name]
**The principle:** [One sentence]
**What this means in practice:** [How this guides decisions]
**What this means we will NOT do:** [What this rules out]
```

### Step 4: Experience Map

Map the end-to-end experience:

1. **Entry points** — how do people arrive? (Search, link, referral, notification)
2. **First impression** — what do they see, feel, understand in the first 5 seconds?
3. **Core journey** — what steps do they take to accomplish their goal?
4. **Moments of friction** — where might they struggle, hesitate, or leave?
5. **Exit points** — how do they finish? What happens next?

For each moment, note the emotional state and the inclusive design considerations.

### Step 5: Define Success Metrics

How will we know the design is working?

| Metric | What It Measures | Target | How to Measure |
|--------|-----------------|--------|---------------|
| [Metric] | [What aspect of the experience] | [Goal] | [Method] |

Include at least one accessibility metric (e.g., task completion rate with assistive technology, WCAG compliance level, cognitive load score).

### Step 6: Write the Strategy Document

```markdown
# Design Strategy: [Project Name]

## Design Principles
[3-5 principles]

## Competitive Position
[Where we differentiate]

## Experience Map
[End-to-end journey with emotional states]

## Success Metrics
[How we measure impact]

## Constraints and Trade-offs
[What we are choosing NOT to optimise for, and why]
```

Save to: `docs/designpowers/strategy/YYYY-MM-DD-<project>-strategy.md`

### Step 7: Stakeholder Alignment

Present the strategy section by section. Confirm alignment before proceeding to design plans.

## Integration

- **Called by:** `design-discovery`
- **Calls:** `writing-design-plans`
- **Informs:** All design skills — principles and strategy should be referenced in every design decision

## Red Flags

| Flag | Response |
|------|----------|
| Principles that nobody could disagree with ("Make it easy to use") | Rewrite. If everyone agrees, it is not guiding decisions |
| No accessibility principle | Add one. Inclusive design is a strategic advantage, not a compliance checkbox |
| Strategy without constraints | Every strategy involves trade-offs. Name them explicitly |
