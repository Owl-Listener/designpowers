---
name: using-designpowers
description: MUST run before any other Designpowers skill — shows welcome, checks taste profile, and routes to the correct first skill. Triggers on ANY design-related message. No other Designpowers skill may run until the welcome sequence has completed
---

# Using Designpowers

Designpowers is a design workflow system. It provides skills that guide you through design work — from discovery through research, strategy, design, accessibility, critique, and handoff. These skills are not suggestions. They are mandatory workflows.

## Welcome Sequence

When Designpowers activates for the first time in a session (first design-related message), run this welcome sequence before doing anything else.

### Step 1: Check for Returning User

Before showing anything, check for an existing taste profile at `~/.designpowers/taste-profile.md`. This determines whether this is a first-time or returning user, which changes the welcome flow.

### Step 2: Show Welcome

**For first-time users** (no taste profile found), show this welcome:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                <o)
                /) )
              ==#===

  ▓▓▓▓  DESIGNPOWERS  ▓▓▓▓
  ━━━━━━━━━━━━━━━━━━━━━━━━

  Hey — welcome. You've got a design team now.

  Here's how it works: you describe what you want
  to build, and a team of 10 design agents works
  through it — research, strategy, visual design,
  content, accessibility, code. They talk to each
  other, hand off work, and check each other's
  output.

  You're the creative director. You can steer,
  correct, or override anything at any time.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**For returning users** (taste profile exists), show this instead:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                <o)
                /) )
              ==#===

  ▓▓▓▓  DESIGNPOWERS  ▓▓▓▓
  ━━━━━━━━━━━━━━━━━━━━━━━━

  Welcome back. Your taste profile is loaded —
  [X] strong opinions, [Y] soft patterns from
  [Z] previous projects.

  [1-2 sentence summary of key taste signals,
  e.g., "You tend toward warm neutrals, generous
  whitespace, and a single accent colour."]

  Anything changed since last time?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

For returning users, briefly pause after the welcome to let them confirm or update their taste before proceeding. If they say nothing changed or just want to continue, move on.

### Step 3: Offer Guided Walkthrough (First-Time Users Only)

For first-time users, ask whether they want to see how the system works before starting their own project:

Use AskUserQuestion with these options:
- **Show me how it works** — "I'll walk you through a quick 2-minute example so you can see the agents in action before starting your own project."
- **I'm ready to go** — "Let's jump straight into your project. I'll explain things as we go."

If the user does not choose, default to "I'm ready to go."

**If they choose the walkthrough**, run the Guided Walkthrough (see section below) before proceeding.

**If they choose to go**, skip to Step 4.

Returning users skip this step entirely — they've seen it.

### Step 4: Build or Review?

Designpowers has two lanes. Find out which one the user wants before routing:

- **Build** — design something new, from a blank page. Runs the full pipeline (discovery → … → ship).
- **Review** — evaluate something that already exists (a screenshot, URL, Figma file, or code). Runs the critique-only lane via the `design-review` skill.

Most of the time the user's first message already tells you which. If they describe something they want to make ("I'm designing onboarding for…"), that's Build. If they share or point at something that exists ("review this", "what's wrong with this screen", a URL, a Figma link, a screenshot), that's Review. Route accordingly without asking.

**If it's genuinely ambiguous**, ask one question — do not guess:

```
  Two ways I can help:

  ► Design something new — I'll run the full team
    from discovery to handoff.
  ► Review something you already have — drop a
    screenshot, URL, Figma link, or code and the
    reviewers will audit it.

  Which fits?
```

**If Build:** ask what they want to make. Keep it conversational:

```
  What are we designing?

  Could be anything — an app, a landing page, a
  dashboard, a component. Describe it however feels
  natural. I'll ask questions to fill in the gaps.
```

Use AskUserQuestion with a free-text prompt. Do NOT proceed to any skill or agent until the user has described what they want to build.

**If Review:** invoke the `design-review` skill. It captures lightweight context and runs the three reviewers in parallel — it does not run discovery, strategy, or build. Do NOT funnel a review request into the full build pipeline.

**Express on-ramp (first-time users only):** if a first-time user seems hesitant, wants something quick ("just take a quick look", "can you knock together a…", "I've only got a minute"), or is clearly new to the terminal, offer the lightweight on-ramp instead of the full lanes:

```
  Two ways to start small if you'd rather not commit yet:

  ► Drop a screenshot or link and I'll give you a quick read.
  ► Tell me one small thing to make and I'll sketch it.

  Or we can do the full thing — your call.
```

If they take it, invoke `design-express`. It runs one tiny loop in plain language and finishes in about two minutes, then offers the door up to the full team. **Returning users skip this** — they know the system; route them to Build or Review.

### Step 5: Start in Direct Mode (Explain Later)

All sessions start in **Direct mode** by default. Do NOT ask users to choose between Direct and Auto upfront — the choice is meaningless before they've seen a handoff.

Instead, explain modes the first time a handoff actually happens (see "Progressive Tips" section below). At that first handoff, briefly explain:

> This is a handoff — **[agent-a]** is passing work to **[agent-b]**. You can approve, correct, redirect, or skip. If you'd rather let the agents run and review everything at the end, say **"go auto"** anytime.

For returning users who have used Designpowers before: still start in Direct, but skip the handoff explanation (they already know).

Only run this welcome sequence ONCE per session — the first time a design-related skill is triggered. Do not show it on subsequent skill invocations.

---

## Guided Walkthrough

A short narrated example for first-time users who opt in during the welcome (Step 3). It demonstrates discovery → handoff → steering → review on a tiny fictional "reading list" project, in ~2 minutes, without running a real pipeline.

**When you reach this:** if a first-time user chose "Show me how it works", read `reference/guided-walkthrough.md` and run the walkthrough from there, then proceed to Step 4. Otherwise skip it entirely. Never force it; never show it to returning users.

## Progressive Tips

Instead of showing all "how to play" tips at once, surface them contextually when they become relevant. This replaces the old upfront tip block.

### Tip Triggers

| Moment | Tip to Show |
|--------|------------|
| **First handoff** | "This is a handoff. You can approve ('ok'), correct, redirect, or skip. Say 'go auto' to let agents run without stopping." |
| **First time an agent speaks** | "You can talk to any agent by name — just say 'design-lead, why did you choose that?' and they'll answer." |
| **First taste-related decision** | "Your aesthetic preferences are remembered across projects. The more taste direction you give, the better the output gets." |
| **First time direction feels uncertain** | "If you're not sure which way to go, say 'debate this' and agents will argue competing approaches so you can decide." |
| **First review/critique** | "The critic and accessibility reviewer run in parallel. If they disagree, the system resolves it — accessibility wins over aesthetics." |
| **First time user corrects or overrides** | "Good — that override is recorded. The system learns from your corrections and carries them into future projects." |
| **After 3+ handoffs approved without comment** | "If you're happy with the flow and want to speed up, say 'go auto' and the agents will run the rest without pausing." |

### Tip Rules

1. **Show each tip at most once per session.** Once shown, mark it as delivered and do not repeat.
2. **Keep tips to one sentence.** Two at most. They should feel like a helpful aside, not a lecture.
3. **Format tips as a brief aside**, visually distinct from agent output:
   ```
   💡 You can talk to any agent by name — just say "design-lead, why?"
   ```
4. **Never interrupt flow to show a tip.** Tips appear alongside agent output, not instead of it.
5. **Skip all tips for returning users** who have used Designpowers before (taste profile has 2+ projects in history). They know the system.

## The Rule

Before responding to ANY message — including clarifying questions — check whether a Designpowers skill applies. If there is even a 1% chance a skill is relevant, invoke it using the Skill tool BEFORE responding.

**IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.**

## Instruction Priority

1. **User instructions** — always take precedence
2. **Designpowers skills** — override default behaviour when applicable
3. **Default system prompt** — applies when no skill is relevant

## Available Skills

### Entry Modes

Designpowers has two ways in, chosen at Step 4 of the welcome:

- **Build lane** — design something new. Runs the full workflow below, in order.
- **Review lane** — evaluate something that already exists, via `design-review`. Skips discovery/strategy/build and runs the three reviewers in parallel. Use it whenever the user has a screenshot, URL, Figma file, or code to critique rather than something to make.
- **Express on-ramp** — `design-express`, offered to *first-time users only*. A two-minute taster (quick critique or quick sketch) in plain language that bridges up into the Build or Review lane. A gateway into the process, never a replacement for it. Returning users skip it.

### The Design Workflow (in order)

| Phase | Skill | When It Triggers |
|-------|-------|-----------------|
| Discover | `design-discovery` | Before any creative or design work begins |
| Research | `research-planning` | When user needs are unclear or assumptions need validation |
| Personas | `inclusive-personas` | When defining who the design serves |
| Strategy | `design-strategy` | When setting direction, principles, or competitive positioning |
| Taste | `design-taste` | When calibrating aesthetic direction — references, emotional targets, craft standards, quality bar |
| Definition | `design-md` | At project start: read a project `DESIGN.md` (the open Google Labs standard) as the authoritative project/client brand layer — or author one. Drives high-fidelity, brand-accurate output |
| Library | `design-library` | When the user wants to start from a known brand's design language ("use the same design language as Stripe") — pulls a ready-made `DESIGN.md` from the open awesome-design-md library as a starting point, then adapts it |
| Memory | `design-memory` | At project start (load *personal* taste profile) and project end (consolidate, via the Promotion Gate so client taste never contaminates the profile) |
| Taste Report | `taste-report` | When the user wants to see how they design — a longitudinal reflection of their personal taste over many projects |
| Inspiration | `inspiration-scouting` | When the team needs aesthetic references, interaction examples, or visual direction beyond competitive research |
| Debate | `design-debate` | When a design direction is uncertain and competing approaches should be argued before committing |
| Plan | `writing-design-plans` | When a design spec exists and implementation needs breaking down |
| UI | `ui-composition` | When building layouts, color, typography, visual hierarchy |
| Responsive | `responsive-patterns` | When the layout must work across the device spectrum — breakpoint strategy, content reflow, fluid type, container queries |
| Interaction | `interaction-design` | When designing states, transitions, feedback, error handling |
| Motion | `motion-choreography` | When designing animation sequences, transitions, micro-interactions, or loading states — and ensuring reduced-motion safety |
| Content | `accessible-content` | When writing or structuring any user-facing content |
| Voice | `voice-and-tone` | When establishing or applying brand voice — voice attributes, tone by context, vocabulary, consistent personality |
| Cognition | `cognitive-accessibility` | When evaluating mental load, wayfinding, focus management |
| Adaptation | `adaptive-interfaces` | When designing for user preferences, motion sensitivity, flexibility |
| Systems | `design-system-alignment` | When working with or building design tokens and components |
| Tokens | `token-architecture` | When building or restructuring a token system — global/semantic/component layers, naming, theming, multi-platform |
| Taste Check | `taste-feedback` | During build phase — shows intermediate visual output for mid-flight taste correction |
| Heuristic | `heuristic-evaluation` | After build — dispatches heuristic-evaluator agent for Nielsen's 10 + cognitive walkthrough, runs in parallel with critic and accessibility-reviewer |
| Critique | `designpowers-critique` | When reviewing design work against the plan |
| Synthetic Test | `synthetic-user-testing` | After fix round — walks through key tasks as each persona to validate the design works for real people in real conditions |
| Usability Test | `usability-testing` | When planning or conducting tests with real participants — test scripts, tasks, recruitment, analysing findings into design actions |
| Debt | `design-debt-tracker` | After reviews produce deferred findings, at project start to review accumulated debt, or when deciding what to fix next |
| Handoff | `design-handoff` | When preparing specifications for engineering |
| Visualise | `figma-bridge` | When the user wants to SEE or manipulate the work — push specs/code into real Figma frames, pull a Figma file in, or generate a clickable HTML prototype when Figma isn't available |
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
| User shared something that already exists and asked for a review/audit | STOP. Invoke `design-review`, not the build pipeline. Don't run discovery on work that's already built |
| Using `design-express` as a shortcut to skip discovery on real work | STOP. Express is a first-timer taster, not a bypass. It never skips accessibility, always labels output "a starting point," and always offers the door up. For a returning user or a scoped project, use the full lane |
| About to make visual design decisions without a taste profile | PAUSE. Ask if the user wants to run taste calibration. Not mandatory, but the design will be stronger with one |
| Starting a new project without checking for existing taste profile | PAUSE. Invoke design-memory to load existing preferences |
| Design direction is uncertain with multiple viable options | PAUSE. Invoke design-debate before committing |
| Designing for a "typical user" without considering ability spectrum | STOP. Invoke inclusive-personas |
| Skipping straight to visuals without strategy | STOP. Invoke design-strategy |
| Skipping heuristic evaluation after build | STOP. Dispatch heuristic-evaluator alongside critic and accessibility-reviewer |
| Skipping synthetic user testing after fix round | STOP. Run synthetic-user-testing before verification — the persona walkthrough needs evidence, not guesswork |
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
- **heuristic-evaluator** — Nielsen's 10 heuristics, cognitive walkthrough, usability validation
- **inspiration-scout** — aesthetic references, cross-domain inspiration, mood board curation

## Handoff Babble

When an agent completes work and hands off to the next agent, it writes a short conversational message (2-4 sentences) addressed to the receiving agent by name. These messages are **shown to the user** so they can follow the relay between agents.

### Rules for Babble
1. **Always addressed to the next agent by name** — "design-lead → motion-designer: ..."
2. **Be specific** — mention actual decisions, values, concerns. Not "the visual design is done" but "I used a mint/sage palette with frosted glass cards"
3. **Be human** — these read like one designer talking to another. Direct, opinionated, helpful
4. **Lead with what matters most** — the first sentence should be the thing the receiving agent most needs to know
5. **Flag concerns** — if you're worried about something, say so. "I'm not sure about the modal focus trap" is more useful than silence

## Agent Transparency

Every agent narrates at three moments so the user never wonders "what's happening?":
1. **Arrival** — `◆ [agent] picking up: "[what I'm about to do and why]"`
2. **Working** — `◆ [agent]: "[key finding/decision]"` (2-4 moments per agent, surface what would change the user's mind)
3. **Departure** — the handoff babble (see Handoff Babble above)

In **direct mode** narration is conversational and may include one genuine check-in question. In **auto mode** it streams without pausing and asks no questions.

**For the full format, examples, direct/auto rules, and pipeline-mode switching (go auto / pause / safeguards), read `reference/agent-transparency.md` when dispatching agents.**

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

**Make it manipulable, not just viewable.** If the user wants more than a static screenshot — to actually click through or edit the design — invoke `figma-bridge` to push the build into real Figma frames or generate a clickable HTML prototype. A designer reacting to something they can touch gives far better feedback than one reacting to an image.

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

After **design-builder** completes, the three reviewers (**design-critic**, **accessibility-reviewer**, **heuristic-evaluator**) run **in parallel**, then their findings are reconciled before a fix round. Conflicts resolve by priority: accessibility > aesthetics, usability > style, brief > opinion, personas break ties, escalate to user if unresolvable. A fix round follows, then `synthetic-user-testing`.

**When you reach the post-build review phase, read `reference/reconciliation-protocol.md`** for the full classification table, resolution rules, fix-round steps, and synthetic-testing handoff.

## Team Presentation

When the pipeline finishes, the **design-lead facilitates** a team presentation: each participating agent speaks in its own voice (what they did, what they're proud of, what they're unsure about), disagreements are surfaced honestly, a factual project summary is shown, and the design-lead closes by asking the human what to do next. The team proposes; the human decides.

**When you reach the end of a pipeline, read `reference/team-presentation.md`** for the full structure, formats, and rules.

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
