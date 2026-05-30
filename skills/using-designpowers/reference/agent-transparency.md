## Agent Transparency

The difference between a useful tool and a confusing one is narration. Every agent must be transparent about what it's doing, why, and what it's finding — throughout its work, not just at handoff. The user should never wonder "what's happening right now?"

### The Three Narration Moments

Every agent narrates at three points:

#### 1. Arrival (when dispatched)

The agent announces what it's about to do and why, in 1-2 sentences. This orients the user before any work begins.

Format:
```
◆ [agent-name] picking up:
  [What I'm about to do and why — referencing what I received from the previous agent]
```

**Examples:**
- `◆ design-scout picking up: "Running competitive analysis on reading list apps — looking for patterns around progress tracking and re-engagement, since that's the core problem from the brief."`
- `◆ design-lead picking up: "Taking the strategy and turning it into visual decisions — layout, colour, type. The 'gentle nudge, not to-do list' direction from design-strategist is the key constraint."`
- `◆ accessibility-reviewer picking up: "Reviewing the build for inclusive design — testing contrast, keyboard access, screen reader flow, and checking the motion-designer's animations for vestibular safety."`

#### 2. Working (during execution)

As the agent works, it surfaces key findings, decisions, and turning points — not a play-by-play, but the moments that matter. Think of it as showing your work: the discoveries that change direction, the trade-offs being weighed, the things that surprised you.

Format:
```
◆ [agent-name]:
  [Key finding, decision, or observation]
```

**How much to narrate:**
- **2-4 narration moments per agent** — enough to follow, not enough to overwhelm
- Surface findings that would change the user's mind or that they'd want to weigh in on
- Skip routine work that proceeds as expected — narrate the interesting parts

**Examples:**
- `◆ design-scout: "Interesting — every competitor buries the 'continue reading' action behind a menu. That's the opposite of what our brief wants. This is a clear differentiation opportunity."`
- `◆ design-lead: "Trying a soft warm palette against a cool minimal one. The warm version feels more 'gentle nudge' but the cool version is easier to read at scale. Leaning warm — it serves the emotional target better."`
- `◆ content-writer: "The word 'unread' has a guilt connotation — testing 'saved for later' and 'waiting for you' as alternatives. 'Waiting for you' tested at Grade 4 reading level and feels warmer."`
- `◆ design-builder: "The progress ring animation is GPU-composited and smooth, but it competes with the page transition. Staggering the ring animation to start 200ms after page settle."`

#### 3. Departure (handoff babble)

The existing handoff babble protocol — 2-4 sentences addressed to the next agent. This is already defined in the Handoff Babble section above.

### Narration in Direct Mode

In direct mode, narration is **conversational**. Agents don't just report — they check in. At natural decision points during their work, agents should ask genuine questions:

- "Does this direction feel right?" — when making a subjective call
- "I could go either way on this — any preference?" — when facing a real trade-off
- "This is a departure from what we discussed — want me to continue or pull back?" — when diverging

**Rules for direct mode questions:**
1. **Ask at most once per agent execution** — one genuine check-in, not a barrage of questions
2. **Only ask when it matters** — if the answer would actually change your work, ask. If you'd do the same thing regardless, don't
3. **Be specific** — "Does this feel right?" is weak. "The warm palette serves the emotional target but the cool one is more readable — which matters more here?" is strong
4. **Wait for an answer** — if you ask, pause for the response before continuing

### Narration in Auto Mode

In auto mode, narration is **streaming** — the user sees the same arrival, working, and departure messages, but the pipeline doesn't pause for them. This turns the black box into a glass box: the user can watch the agents work in real time without needing to approve each step.

**Rules for auto mode narration:**
1. **All narration still happens** — arrival, working moments, departure babble. Nothing is hidden
2. **No questions** — auto mode agents do not ask check-in questions (they'd stall the pipeline). Instead, they note decisions they would have asked about: `"Went with warm palette over cool — flag if you'd reverse this."`
3. **Narration is logged in design-state.md** — the full narration chain is available for review after the pipeline completes
4. **Keep narration concise** — auto mode should feel brisk. One line per narration moment, not paragraphs

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
3. The **heuristic-evaluator** finds a critical H3 (no undo on destructive action) or H1 (user completely lost) violation — these indicate structural problems, not polish issues
4. The **synthetic-user-testing** shows a persona cannot complete the primary task — the design has fundamentally failed for that person
5. The **reconciliation protocol** produces an unresolvable conflict — the user breaks the tie
6. Any agent flags an **open question that requires user knowledge** (e.g., "I don't know the brand colours")

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
