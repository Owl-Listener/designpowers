---
name: design-state
description: Use when any Designpowers agent starts work or completes work — maintains the shared design state file that all agents read from and write to. Invoke to initialise, read, or update the living design state document
---

# Design State

The design state is a shared, living document that accumulates design decisions as the workflow progresses. Every Designpowers agent reads it before starting work and updates it when done. It is the single source of truth for the current state of the design.

## The File

The design state lives at `design-state.md` in the project root (or working directory). One file per project.

## When to Use This Skill

- **Initialise** — when `design-discovery` completes and a brief is approved, create the design state file
- **Read** — before dispatching any Designpowers agent, confirm the design state file exists and is current
- **Update** — after any agent completes work, append their decisions and outputs to the state file
- **Review** — during critique or verification, use the state file as the definitive record of what was decided

## Structure

Create and maintain the design state file with this structure:

```markdown
# Design State: [Project Name]

_Last updated: [date] by [agent name]_

## Brief
- **Problem:** [one-line problem statement]
- **Primary persona:** [name and context]
- **Success metric:** [what "done" looks like]
- **Brief document:** [relative path to full brief]

## Personas
[Link to personas document]
- [Persona 1 name] — [one-line context]
- [Persona 2 name] — [one-line context]
- ...

## Design Principles
1. [Principle] — [what it means in practice]
2. [Principle] — [what it means in practice]
3. ...

## Taste Profile
- **Emotional target:** [2-3 words — e.g., "calm confidence", "playful warmth"]
- **Quality level:** [Prototype / Production / Flagship]
- **Key references:** [names/URLs]
- **Aesthetic principles:** [list]
- **Taste document:** [path to full taste profile]

_If no taste calibration was done, note: "No taste profile — craft evaluation uses general quality standards only."_

## Decisions Log
Append-only. Each entry records who decided, what, and why.

| Date | Agent | Decision | Rationale |
|------|-------|----------|-----------|
| [date] | design-strategist | Bottom tab navigation, 3 items | Minimises cognitive load per principle #1 |
| [date] | design-lead | Mint/sage palette, category colour coding | Warm, approachable, passes AA contrast |
| ... | ... | ... | ... |

## Open Questions
Things that need resolution. Remove when resolved (move decision to log).

- [ ] [Question — who needs to answer it]
- [ ] ...

## Artefact Index
Paths to key documents produced during the workflow.

| Artefact | Path | Status |
|----------|------|--------|
| Brief | [path] | Approved |
| Personas | [path] | Complete |
| Strategy | [path] | Complete |
| Plan | [path] | In progress |
| ... | ... | ... |

## Handoff Chain
Track which agent handed off to which. Each entry includes the conversational babble message that the agent wrote when handing off. These messages are shown to the user.

### [timestamp] design-strategist → design-lead
> "The core users are families with a new puppy, kids aged 8-14 taking the lead. Principle #1 says 'celebrate effort, not perfection' — so nothing should feel like a report card. The setup flow needs progressive disclosure. Over to you for the visual direction."

### [timestamp] design-lead → motion-designer
> "I've gone with frosted glass cards and a mint/sage palette. The progress ring is the hero moment — when it hits 100% it needs to feel like a celebration, not just a colour change. Keep it subtle everywhere else."

**🎨 User override:** "Use my existing design system instead of mint/sage. The tokens are in /tokens/colors.json."

### [timestamp] motion-designer → design-builder
> "Progress ring gets a 600ms spring fill. Checkboxes get 150ms bounce. Reduced-motion fallbacks swap to opacity fades."

### [timestamp] ...

```

## Rules

1. **Every agent reads the design state before starting** — if it does not exist, something is wrong. Go back to discovery
2. **Every agent appends to the decisions log when done** — decisions that are not recorded did not happen
3. **Never delete from the decisions log** — it is append-only. If a decision is reversed, add a new entry that supersedes it
4. **Open questions are removed only when resolved** — the resolution goes in the decisions log
5. **The handoff chain is mandatory** — every agent-to-agent transition is recorded with what was passed and what needs attention
6. **Keep it scannable** — this file will be read by every agent. Tables and one-liners, not paragraphs

## Initialisation

When creating the design state for the first time (after discovery):

1. Create `design-state.md` in the project root
2. Fill in the Brief section from the approved design brief
3. Fill in Personas if they exist yet
4. Fill in Design Principles if strategy has been done
5. Start the Decisions Log with any decisions already made
6. Add any known open questions
7. Start the Artefact Index with the brief path

## Updating After Agent Work

When an agent completes its work:

1. Read the current design state
2. Append new decisions to the Decisions Log (with date, agent name, decision, rationale)
3. Resolve any open questions that were answered
4. Add any new open questions that emerged
5. Update the Artefact Index with any new documents produced
6. Write the handoff babble message (2-4 conversational sentences addressed to the next agent)
7. Add the babble to the Handoff Chain — this is shown to the user
8. Update the "Last updated" line
