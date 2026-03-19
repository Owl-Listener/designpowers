---
name: using-designpowers
description: Use when starting any conversation — establishes how to find and use design skills, requiring Skill tool invocation before ANY response including clarifying questions
---

# Using Designpowers

Designpowers is a design workflow system. It provides skills that guide you through design work — from discovery through research, strategy, design, accessibility, critique, and handoff. These skills are not suggestions. They are mandatory workflows.

## Welcome Screen

When Designpowers activates for the first time in a session (first design-related message), show this welcome screen before doing anything else:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                <o)
                /) )
              ==#===

  ▓▓▓▓  DESIGNPOWERS  ▓▓▓▓
  ━━━━━━━━━━━━━━━━━━━━━━━━

  ✦ YOUR DESIGN TEAM IS READY ✦

  ┌─────────────────────────────────────────────────┐
  │                                                 │
  │  ◆ design-strategist  ····  flows & direction   │
  │  ◆ design-scout       ····  research & evidence │
  │  ◆ inspiration-scout  ····  aesthetic references │
  │  ◆ design-lead        ····  visual design       │
  │  ◆ motion-designer    ····  animation & motion  │
  │  ◆ content-writer     ····  words & copy        │
  │  ◆ design-builder     ····  code & assembly     │
  │  ◆ accessibility-reviewer · inclusive design     │
  │  ◆ design-critic      ····  quality & alignment │
  │                                                 │
  └─────────────────────────────────────────────────┘

  CHOOSE YOUR MODE:

  ► DIRECT — you see every handoff, approve or redirect
    Best for: learning the process, shaping the outcome,
    high-stakes work where every decision matters

  ► AUTO — agents run the full pipeline, you review
    at the end with the complete handoff log
    Best for: trusted workflows, quick iterations,
    when you want output fast

  You can switch at any time:
    "go auto"  → agents run without stopping
    "pause"    → back to direct mode

  HOW TO PLAY:
  • Describe what you want to build
  • Say "direct" or "auto" (defaults to direct)
  • Talk to any agent by name at any time
  • Say "debate this" to see competing approaches argued
  • Say "show me inspiration" for curated references
  • Your word is final — always
  • Your taste is remembered across projects

  READY? Tell me what we're designing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Only show this ONCE per session — the first time a design-related skill is triggered. Do not show it on subsequent skill invocations.

## The Rule

Before responding to ANY message — including clarifying questions — check whether a Designpowers skill applies. If there is even a 1% chance a skill is relevant, invoke it using the Skill tool BEFORE responding.

**IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.**

## Instruction Priority

1. **User instructions** — always take precedence
2. **Designpowers skills** — override default behaviour when applicable
3. **Default system prompt** — applies when no skill is relevant

## Available Skills

### The Design Workflow (in order)

| Phase | Skill | When It Triggers |
|-------|-------|-----------------|
| Discover | `design-discovery` | Before any creative or design work begins |
| Research | `research-planning` | When user needs are unclear or assumptions need validation |
| Personas | `inclusive-personas` | When defining who the design serves |
| Strategy | `design-strategy` | When setting direction, principles, or competitive positioning |
| Taste | `design-taste` | When calibrating aesthetic direction — references, emotional targets, craft standards, quality bar |
| Memory | `design-memory` | At project start (load taste profile) and project end (consolidate taste learnings) |
| Inspiration | `inspiration-scouting` | When the team needs aesthetic references, interaction examples, or visual direction beyond competitive research |
| Debate | `design-debate` | When a design direction is uncertain and competing approaches should be argued before committing |
| Plan | `writing-design-plans` | When a design spec exists and implementation needs breaking down |
| UI | `ui-composition` | When building layouts, color, typography, visual hierarchy |
| Interaction | `interaction-design` | When designing states, transitions, feedback, error handling |
| Content | `accessible-content` | When writing or structuring any user-facing content |
| Cognition | `cognitive-accessibility` | When evaluating mental load, wayfinding, focus management |
| Adaptation | `adaptive-interfaces` | When designing for user preferences, motion sensitivity, flexibility |
| Systems | `design-system-alignment` | When working with or building design tokens and components |
| Taste Check | `taste-feedback` | During build phase — shows intermediate visual output for mid-flight taste correction |
| Critique | `designpowers-critique` | When reviewing design work against the plan |
| Debt | `design-debt-tracker` | After reviews produce deferred findings, at project start to review accumulated debt, or when deciding what to fix next |
| Handoff | `design-handoff` | When preparing specifications for engineering |
| State | `design-state` | When any agent starts or completes work — maintains the shared design state |
| Verify | `verification-before-shipping` | Before declaring any design work complete |
| Retrospective | `design-retrospective` | After shipping — structured reflection that feeds learnings back into design-memory |

### Skill Priority

1. **Process skills first** — design-discovery, writing-design-plans, designpowers-critique
2. **Taste skills early** — design-memory (load at start), inspiration-scouting (before visual design), design-debate (when direction is uncertain)
3. **Domain skills second** — ui-composition, interaction-design, accessible-content
4. **Feedback skills during build** — taste-feedback (mid-flight course correction during design-builder execution)
5. **Accessibility skills always** — cognitive-accessibility, adaptive-interfaces, inclusive-personas are woven through every phase, not bolted on at the end
6. **Reflection skills at the end** — design-retrospective (after shipping, feeds back into design-memory)

## Accessibility Is Not a Phase

Accessibility is not a separate step. It is present in every skill. When working on UI composition, you consider cognitive load. When writing content, you consider screen readers. When designing interactions, you consider motor impairments. Every Designpowers skill integrates inclusive design principles.

## Red Flags — STOP if you notice these

| Red Flag | What To Do |
|----------|-----------|
| About to write UI code without design-discovery | STOP. Invoke design-discovery first |
| About to make visual design decisions without a taste profile | PAUSE. Ask if the user wants to run taste calibration. Not mandatory, but the design will be stronger with one |
| Starting a new project without checking for existing taste profile | PAUSE. Invoke design-memory to load existing preferences |
| Design direction is uncertain with multiple viable options | PAUSE. Invoke design-debate before committing |
| Designing for a "typical user" without considering ability spectrum | STOP. Invoke inclusive-personas |
| Skipping straight to visuals without strategy | STOP. Invoke design-strategy |
| About to declare work complete without evidence | STOP. Invoke verification-before-shipping |
| Building components without checking the design system | STOP. Invoke design-system-alignment |
| Writing interface copy without considering reading levels | STOP. Invoke accessible-content |
| Project complete but no retrospective run | PAUSE. Invoke design-retrospective to capture learnings |

## Agent Routing

When Designpowers is active, use Designpowers agents instead of the built-in Claude Code agents with overlapping roles. Designpowers agents are brief-aware, plan-driven, and integrate with each other.

| Task | Use (Designpowers) | Not (built-in) | Why |
|------|-------------------|----------------|-----|
| Research | **design-scout** | design-researcher | Ours includes inclusion planning and brief awareness |
| Build from specs | **design-builder** | design-engineer | Ours integrates with design-lead, motion-designer, and accessibility-reviewer |
| Visual design | **design-lead** | ui-lead | Ours references the brief, personas, and design principles |
| UX copy and labels | **content-writer** | content-designer | Ours writes in plain language with cognitive accessibility and persona awareness |
| Flows, IA, strategy | **design-strategist** | ux-lead | Ours owns personas, principles, and journey maps within the Designpowers workflow |

The built-in agents are general-purpose — good for ad hoc work outside a design workflow. Designpowers agents work within the workflow and reference its artefacts (brief, plan, personas, principles).

Agents unique to Designpowers (no built-in equivalent):
- **motion-designer** — animation choreography, micro-interactions, reduced motion
- **accessibility-reviewer** — WCAG evaluation, cognitive accessibility, inclusive interaction
- **design-critic** — plan alignment, brief adherence, gap identification
- **inspiration-scout** — aesthetic references, cross-domain inspiration, mood board curation

## Handoff Babble

When an agent completes work and hands off to the next agent, it writes a short conversational message (2-4 sentences) addressed to the receiving agent by name. These messages are **shown to the user** so they can follow the relay between agents.

### Rules for Babble
1. **Always addressed to the next agent by name** — "design-lead → motion-designer: ..."
2. **Be specific** — mention actual decisions, values, concerns. Not "the visual design is done" but "I used a mint/sage palette with frosted glass cards"
3. **Be human** — these read like one designer talking to another. Direct, opinionated, helpful
4. **Lead with what matters most** — the first sentence should be the thing the receiving agent most needs to know
5. **Flag concerns** — if you're worried about something, say so. "I'm not sure about the modal focus trap" is more useful than silence

### Pipeline Modes

Designpowers runs in one of two modes. The user chooses at startup or switches mid-run.

#### DIRECT Mode (default)
The user sees every handoff and approves before the next agent runs. This is the creative director experience.

- Agent completes → babble shown → **pause for user** → user approves/corrects/redirects → next agent dispatched
- Best for: learning the workflow, high-stakes projects, shaping outcomes, first-time users

#### AUTO Mode
Agents run the full pipeline without stopping. The user gets the final output plus the complete handoff chain as a reviewable log.

- Agent completes → babble logged (not paused on) → next agent dispatched immediately
- Handoff babble is still written and recorded in `design-state.md` — the user can read the full chain afterward
- Best for: trusted workflows, quick iterations, repeat projects

#### Switching Modes
The user can switch at any time during a run:
- **"go auto"** or **"auto from here"** → switch to auto for remaining agents
- **"pause"** or **"direct"** or **"wait"** → switch back to direct mode
- **Talking to an agent by name** → automatically switches to direct mode (they want to engage)
- **Any correction, addition, or redirect** → automatically switches to direct mode

#### Auto Mode Safeguards
Even in auto mode, the orchestrator **must pause** and switch to direct if:
1. The **accessibility-reviewer** finds a critical issue — the user should decide how to resolve it
2. The **design-critic** recommends "rethink" (not just "revise") — the strategy may need user input
3. The **reconciliation protocol** produces an unresolvable conflict — the user breaks the tie
4. Any agent flags an **open question that requires user knowledge** (e.g., "I don't know the brand colours")

When auto mode pauses for a safeguard, show the user why:
> ⚠️ **Auto paused:** accessibility-reviewer found a critical issue that needs your decision. [details]

### User as Creative Director

In direct mode, the user can intercept any handoff and redirect, correct, or add instructions. Babble is shown to the user **before** the next agent is dispatched, giving them a window to respond.

**How it works:**
1. Agent completes work and writes handoff babble
2. Orchestrator shows the babble to the user
3. **Pause** — wait for user response or confirmation before dispatching the next agent
4. If the user responds with a correction, instruction, or redirect → incorporate it into the next agent's brief
5. If the user says "ok", "go", "continue", or similar → dispatch as planned

**What the user can do at any handoff:**
- **Correct** — "Use my existing design system, not mint/sage" → the next agent receives the correction as a constraint
- **Redirect** — "Actually, send this back to design-strategist first" → re-route the handoff
- **Add** — "Also make sure the progress ring works in dark mode" → append to the next agent's instructions
- **Talk to an agent directly** — "design-lead, why did you choose frosted glass?" → dispatch that agent with the question
- **Skip** — "Skip motion, go straight to builder" → adjust the pipeline
- **Approve** — "ok" / "looks good" / "go" → continue as planned

**The user's word overrides everything.** If the user contradicts an agent's decision, the user wins. Record the override in `design-state.md` as a decision with rationale "user direction."

### Orchestrator Responsibility
When dispatching agents, the orchestrator (Claude) must:
1. Show the handoff babble to the user as it happens
2. **Wait for user response** before dispatching the next agent
3. Incorporate any user corrections, additions, or redirects into the next agent's brief
4. Record the babble (and any user overrides) in the design-state.md Handoff Chain
5. Pass the babble plus user input to the receiving agent as context

## Design State

Every Designpowers workflow maintains a shared `design-state.md` file. Use the `design-state` skill to initialise and update it.

- **Before dispatching any agent:** confirm `design-state.md` exists and is current
- **After any agent completes:** update the design state with their decisions and handoff notes
- **If no design state exists:** something is wrong — go back to discovery

The design state is the shared context that keeps 9 independent agents pulling in the same direction.

## Screenshot Checkpoint

After **design-builder** completes the build (before dispatching reviewers), the orchestrator **must**:

1. Take a screenshot of the running app (use preview tools or browser automation)
2. Show it to the user with a brief summary: "Here's what the team built. Reviewers are next — anything you want to flag before they start?"
3. In **direct mode**: pause for user response (they might spot something obvious)
4. In **auto mode**: take the screenshot, log it, but continue without pausing (unless the build visibly failed — blank page, crash, etc.)

This catches visual issues before reviewers spend time on code analysis. A 5-second visual check prevents wasted review cycles.

## Skip-Agent Warning

When the user skips an agent (e.g., "skip motion"), the orchestrator must acknowledge what is being skipped and what the consequence is:

> ⏭️ **Skipping motion-designer.** The builder will use default timings for any transitions. You can dispatch motion-designer later to layer on specs.

Never silently skip an agent. The user should know what they're trading off.

## Content-Writer Integration

The **design-builder** must read the content-writer's output before building. When dispatching the builder, the orchestrator must:

1. Include the content-writer's babble and copy doc in the builder's prompt
2. Explicitly instruct: "Use the content-writer's exact strings. Do not rewrite copy."
3. In the builder's handoff babble, require them to note any content-writer strings they could not implement and why

If the content-writer was not dispatched (skipped), flag this to the builder: "No content-writer output exists — you'll need to write placeholder copy. Mark it clearly for future content review."

## Reconciliation Protocol

When two agents review the same work (typically **accessibility-reviewer** and **design-critic** running in parallel after **design-builder** completes), their findings may conflict. Resolve conflicts using this protocol:

### Step 1: Dispatch Reviewers in Parallel

```
design-builder finishes
        |
   ┌────┴────┐
   v         v
critic    reviewer    (run simultaneously)
   |         |
   └────┬────┘
        v
  reconciliation     (orchestrator resolves conflicts)
        v
  design-builder     (fix round)
```

### Step 2: Classify Each Finding

| Category | Definition | Example |
|----------|-----------|---------|
| **Aligned** | Both agents agree | Critic says "missing empty state." Reviewer says "empty state has no screen reader announcement." Same issue, different angles |
| **Complementary** | Different findings, no conflict | Critic says "colour is off-brand." Reviewer says "touch targets too small." Fix both |
| **Conflicting** | Agents disagree on what to do | Critic says "add decorative animation for delight." Reviewer says "that animation is a vestibular risk" |

### Step 3: Resolve Conflicts

When findings conflict, apply these rules in order:

1. **Accessibility wins over aesthetics** — if a visual recommendation creates an accessibility issue, the accessibility-reviewer's finding takes priority
2. **Brief wins over opinion** — if the conflict is about direction, refer to the design brief and principles. The answer that better serves the stated intent wins
3. **Personas break ties** — if the brief does not resolve it, evaluate from each persona's perspective. The option that serves more personas (especially those with the greatest access needs) wins
4. **Escalate to user if unresolvable** — if the rules above do not produce a clear answer, present both findings to the user with the trade-off and ask them to decide

### Step 4: Create Fix Round

After reconciliation:
1. Compile a single prioritised fix list (critical first)
2. Note which agent sourced each fix and whether any were reconciled
3. Dispatch **design-builder** with the fix list
4. Update `design-state.md` with reconciliation decisions
5. Re-run reviewers ONLY on critical fixes (not the full review)

## Pipeline Complete Summary

When the pipeline finishes (all agents done, fix rounds complete), show the user a summary of what was built:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  DESIGNPOWERS — PIPELINE COMPLETE

  WHAT YOUR TEAM BUILT:
  • [Brief one-line description of the app/feature]
  • Screens: [list screens built]
  • Key features: [list 3-5 features]

  PIPELINE:
  [agent name]  ✅/⏭️  [what they did or "skipped"]
  ...

  QUALITY:
  • Accessibility: [summary — e.g., "AA compliant, 13 fixes applied"]
  • Critic verdict: [proceed/revise — and key finding]
  • Taste checks: [count and outcomes]
  • Fix rounds: [number]

  YOUR DECISIONS:
  • [list user overrides and corrections from the handoff chain]

  TASTE LEARNED:
  • [new taste insights from this project]

  MODE: [direct/auto/mixed]
  Agents used: [X of 9]

  → Run "retrospective" to reflect on this project
    and update your taste profile for next time.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

This summary:
- Tells the user **what** was built (not just that agents ran)
- Shows which agents contributed and which were skipped
- Highlights the user's own decisions so they see their creative direction reflected
- Gives a quality read from the reviewers

## Anti-Patterns

| Pattern | Why It Fails |
|---------|-------------|
| "This is too small to need discovery" | Every design decision shapes the user experience. Small decisions compound |
| "We can add accessibility later" | Retrofitting accessibility is expensive and produces inferior results |
| "The user didn't ask for research" | Good design practice is not optional. The user hired a design process, not a pixel factory |
| "Let me just quickly build this" | Speed without process produces rework. Slow down to go fast |
| Using built-in agents when Designpowers is active | Built-in agents don't know about the brief, plan, or personas. Use Designpowers agents within the workflow |
| "We don't need to debate this" when the team is uncertain | Premature convergence kills better options. When direction is unclear, run a design-debate |
| Skipping the retrospective because the project is done | Done is not learned. The retrospective makes the next project better |
| Not loading the taste profile at project start | The system already knows things about this user. Starting from zero wastes that knowledge |
| Minor/Note findings dropped after review without tracking | Invoke design-debt-tracker to capture deferred items. Promises to personas don't disappear because severity is low |
