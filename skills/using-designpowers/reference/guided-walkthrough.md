## Guided Walkthrough

This is a short, narrated example that shows first-time users how Designpowers works. It runs only when the user opts in during the welcome sequence. The walkthrough uses a tiny fictional project to demonstrate the mechanics without requiring the user to commit to anything.

### The Example Project

The walkthrough designs a **reading list page** — simple enough to move fast, rich enough to show the workflow. The user watches, but can interact at decision points.

### Walkthrough Flow

Run through these steps, narrating what's happening and why at each stage. Keep it brisk — the whole thing should take about 2 minutes of reading time. Use real agent names and real handoff babble so the user sees the actual mechanics.

#### 1. Discovery (30 seconds)

Narrate:
> "Every project starts with discovery — understanding what we're building and for whom. Let me show you what that looks like."

Show a compressed version of discovery for the reading list page:

```
  DISCOVERY

  Problem: People save articles but never go back
  to them. A reading list that helps people actually
  read what they save.

  Users: Busy professionals who read on phones during
  commutes and on laptops in the evening.

  Success: People return to the list and finish
  articles they started.
```

Narrate:
> "In your real project, I'll ask you these questions. For now, let's pretend we've got our answers and move on."

#### 2. Agent Handoff (30 seconds)

Narrate:
> "Now watch what happens when agents hand off to each other. Each one writes a short message to the next — you can see their thinking."

Show a sample handoff:

```
  ◆ design-strategist → design-lead:
    "Simple list with reading progress. The key
    insight: people abandon articles because the list
    feels like a wall of guilt. We need to surface
    what's most worth finishing, not just what's
    newest. Think 'gentle nudge,' not 'to-do list.'"
```

Narrate:
> "This is a **handoff**. In your project, you'll see these between every agent. You can approve it, change it, or send it back. You're always in control."

#### 3. The Creative Director Moment (30 seconds)

Narrate:
> "Here's the part that matters most — your input. At every handoff, you can steer the direction."

Show the user what their options look like:

```
  What would you do here?

  ► "ok"                    → approve, move on
  ► "Make it darker"        → correct the direction
  ► "Also add tags"         → add a requirement
  ► "Back to strategist"    → send it back
  ► "Skip to builder"       → jump ahead
  ► "design-lead, why?"     → ask an agent directly
```

Narrate:
> "Your word overrides everything. The agents propose, you decide."

#### 4. Review and Critique (30 seconds)

Narrate:
> "After the design is built, two agents review it at the same time — one for quality, one for accessibility."

Show a sample review moment:

```
  ◆ design-critic:
    "The reading progress indicator is strong —
    it answers 'where was I?' instantly. But the
    typography feels too uniform. The article
    titles need more weight to create a clear
    entry point."

  ◆ accessibility-reviewer:
    "Contrast passes at all sizes. But the progress
    bar is colour-only — needs a text percentage
    for screen readers and colour-blind users."
```

Narrate:
> "The team catches issues so you don't have to spot everything yourself. Accessibility is checked at every step, not bolted on at the end."

#### 5. Wrap Up

Narrate:
> "That's the basics: discovery → agents hand off work → you steer at every step → reviewers catch issues. There's more — taste calibration, debates, design memory — but you'll discover those as we go."

Then show:

```
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Ready to start your own project?

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then proceed to Step 4 of the welcome sequence ("What are we designing?").

### Walkthrough Rules

1. **Never force the walkthrough.** It is always optional. If the user says skip at any point, stop immediately and go to "What are we designing?"
2. **Keep it under 2 minutes of reading time.** If it feels like it's dragging, compress.
3. **Use the real mechanics.** Real agent names, real babble format, real handoff structure. The walkthrough should be accurate to what the user will actually experience.
4. **Don't run a real pipeline.** This is narrated, not executed. No agents are actually dispatched. No design-state.md is created.
5. **Only show this once, ever.** If the user has seen the walkthrough (returning user with taste profile), never offer it again.

---
