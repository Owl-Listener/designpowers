## Team Presentation

When the pipeline finishes (all agents done, fix rounds complete), the team presents the work together. This is not a dry summary — it's a design review where every agent who contributed speaks up, disagreements are surfaced honestly, and the human decides what happens next.

**The design-lead facilitates the entire presentation.** They open, introduce each agent, and close by asking the human for direction.

### Structure

#### 1. Design-Lead Opens

The design-lead introduces the presentation with a brief overview of what was built:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  DESIGNPOWERS — TEAM PRESENTATION

  <o)   design-lead: Here's what we built together.
  /) )
==#===

  [Brief 1-2 sentence description of the project]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### 2. Each Agent Shares Their Contribution

Every agent that participated speaks in turn (skipped agents are noted but silent). Each agent's statement should be:
- **2-4 sentences**, in their own voice
- **What they did** — the key decisions they made and why
- **What they're proud of** — the thing that worked best
- **What they're unsure about** — any lingering doubt, trade-off, or area that could go either way

Format each agent's contribution as:

```
◆ [agent-name]:
  [Their statement — direct, opinionated, specific]
```

The design-lead introduces each agent briefly ("Let's hear from design-scout on research..." / "content-writer, what did you land on?").

#### 3. Surface Disagreements

After all agents have spoken, the design-lead **explicitly surfaces any disagreements or tensions** from the project. These include:

- Reconciliation conflicts between critic, accessibility-reviewer, and heuristic-evaluator
- Trade-offs where one agent's preference was overridden by another
- Decisions where the team went one way but an agent still has reservations
- Areas where the brief was ambiguous and agents interpreted it differently

The design-lead presents each disagreement honestly and briefly:

```
OPEN QUESTIONS:

  ⚡ [agent-a] vs [agent-b]: [The tension in one sentence]
     [agent-a]'s view: [1 sentence]
     [agent-b]'s view: [1 sentence]

  ⚡ [agent] flagged: [Concern that wasn't fully resolved]
```

If there are no disagreements, the design-lead says so: "The team is aligned — no open tensions."

#### 4. Project Summary

After the team has spoken, show the factual summary:

```
  PIPELINE:
  [agent name]  ✅/⏭️  [what they did or "skipped"]
  ...

  QUALITY:
  • Accessibility: [summary — e.g., "AA compliant, 13 fixes applied"]
  • Heuristics: [summary — e.g., "9/10 pass, H3 violation fixed"]
  • Critic verdict: [proceed/revise — and key finding]
  • Synthetic testing: [summary — e.g., "4/4 personas pass all tasks"]
  • Taste checks: [count and outcomes]
  • Fix rounds: [number]

  YOUR DECISIONS:
  • [list user overrides and corrections from the handoff chain]

  TASTE LEARNED:
  • [new taste insights from this project]

  MODE: [direct/auto/mixed]
  Agents used: [X of 10]
```

#### 5. Design-Lead Asks for Direction

The design-lead closes the presentation by asking the human what to do next. This is not a generic "what do you think?" — it should reference the specific open questions and disagreements surfaced in step 3.

Examples:
- "We've got two open tensions — the animation concern and the copy tone. Want to resolve those now, or are you happy shipping as-is?"
- "The team is aligned and the critic gave us a proceed. Want to run the retrospective, or is there anything you'd like to revisit?"
- "accessibility-reviewer still has concerns about the modal pattern. Want me to send it back to design-builder, or do you want to weigh in on the approach first?"

The design-lead then **waits for the human's response** before taking any next steps. Possible next actions based on the human's direction:
- **Ship it** → proceed to handoff
- **Fix something** → dispatch the relevant agent with the human's instructions
- **Revisit a decision** → re-open the relevant phase
- **Run retrospective** → invoke design-retrospective
- **Anything else** → the human's word is final

### Rules for the Team Presentation

1. **Every participating agent speaks.** No silent contributors. If they did work, they share their perspective.
2. **Skipped agents are noted but don't speak.** Just: `⏭️ [agent-name] — skipped`
3. **Disagreements are never hidden.** The point of the presentation is transparency. If the team papered over a conflict, surface it here.
4. **The design-lead facilitates, not dominates.** They introduce, connect, and summarize — but each agent's statement is in that agent's own voice.
5. **The human decides what happens next.** The presentation ends with a question, not a conclusion. The team proposes, the human disposes.
6. **Keep it tight.** The whole presentation should be scannable. No agent should monologue. 2-4 sentences each, then move on.
