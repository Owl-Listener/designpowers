---
name: design-discovery
description: You MUST use this before any creative or design work — building features, creating components, designing interfaces, modifying user-facing behaviour. Explores intent, constraints, users, and context before any design decisions are made
---

# Design Discovery

Discovery is where design begins. Before pixels, before wireframes, before any visual decisions — understand the problem. This skill ensures you never design the wrong thing well.

## The Rule

DO NOT proceed to any design, UI, or implementation work until discovery is complete and the user has approved the design brief.

## Discovery Modes

### Quick Discovery (for POCs and small tasks)
When the user says "proof of concept", "POC", "quick", "small", or the task is clearly exploratory:

1. Ask **one round** of questions — combine the essential questions into a single message:
   - What problem are we solving?
   - Who is it for?
   - What does success feel like?
   - How big is this? (POC / full product)
2. Write the brief immediately from their answers — don't ask follow-up rounds
3. Present the brief for approval in one block (not section by section)
4. **Create `design-state.md`** in the project root immediately after brief approval

Quick discovery should take **one user message** of answers, not three.

### Full Discovery (for products and complex tasks)
When the task is a full product, involves multiple stakeholders, or the user explicitly wants depth — use the full process below.

## Process

### Step 1: Understand the Context

Before asking questions, gather what already exists:
- Read any existing design documents, specs, or briefs in the project
- Check for an existing design system, component library, or style guide
- Look at the current state of what the user is working on
- Identify the platform, tech stack, and any constraints

### Step 2: Explore Intent

Ask clarifying questions — ONE AT A TIME, not a wall of questions. Focus on:

1. **What problem are we solving?** Not what feature are we building — what human problem does this address?
2. **Who experiences this problem?** Not "users" — which specific people, in what situations, with what abilities and constraints?
3. **What does success look like?** How will we know this design works? What changes for the person using it?
4. **What constraints exist?** Technical, timeline, brand, accessibility requirements, regulatory
5. **What has been tried before?** What worked, what failed, what was learned

### Step 3: Identify the Ability Spectrum

For every design task, explicitly consider:
- Who might use this with a screen reader?
- Who might use this with limited motor control?
- Who might use this under cognitive load or stress?
- Who might use this in a language that is not their first?
- Who might use this with low vision, colour blindness, or in bright sunlight?

This is not a checklist to rush through. These are real people who will use what you build.

### Step 4: Propose Approaches

Present 2-3 design approaches with clear trade-offs:

For each approach:
- **What it is** — one sentence
- **Why it might work** — the strengths
- **What it sacrifices** — the trade-offs
- **Who it serves best** — and who it might underserve
- **Accessibility implications** — what inclusive design considerations arise

### Step 5: Write the Design Brief

Once the user has chosen a direction, write a design brief:

```markdown
# Design Brief: [Feature/Component Name]

## Problem Statement
[What problem are we solving, for whom, in what context]

## Users
[Who this serves — including ability spectrum considerations]

## Design Direction
[The chosen approach and why]

## Constraints
[Technical, timeline, brand, accessibility, regulatory]

## Success Criteria
[How we will know this works]

## Out of Scope
[What we are explicitly NOT doing]
```

Save to: `docs/designpowers/briefs/YYYY-MM-DD-<topic>.md`

### Step 6: User Approval

Present the brief to the user section by section — not all at once. Get approval on each section before moving to the next. The user must explicitly approve the complete brief before any design work begins.

### Step 7: Create Design State

**This step is mandatory. Do not skip it.**

Immediately after brief approval, create `design-state.md` in the project root with:
- Brief summary (problem, primary persona, success metric)
- Design principles (if defined during discovery)
- Empty decisions log, open questions, artefact index, and handoff chain
- Link to the full brief document

This file is the shared context every agent reads. If it does not exist, the pipeline cannot run.

### Step 8: Transition

After approval and design state creation, invoke the appropriate next skill:
- If research is needed → invoke `research-planning`
- If the direction is clear → invoke `design-strategy` or `writing-design-plans`
- NEVER skip directly to UI work

## Integration

- **Called by:** `using-designpowers` (auto-triggered on any design task)
- **Calls:** `research-planning`, `design-strategy`, or `writing-design-plans`
- **Never skip to:** `ui-composition`, `interaction-design`, or any implementation skill

## Red Flags

| Flag | Response |
|------|----------|
| "Just make it look like this reference" | References inform — they do not replace discovery. Ask what about the reference works and why |
| "We already know what we want" | Great. Then discovery will be fast. But still do it — assumptions are where bad design hides |
| "This is just a small change" | Small changes to interfaces affect real people. Discovery scales to the task — it does not get skipped |
