# Designpowers

```
            <o)
            /) )
          ==#===
```

An agent design team you control. 10 agents that run an inclusive design process while you direct. The system learns your taste.

Designpowers is an open, model-agnostic design workflow that gives you a team of 10 design agents. They discover, research, strategise, design, build, review, and hand off — with accessibility woven into every step. The system remembers your aesthetic preferences across projects, argues competing directions when you're unsure, and catches taste mismatches mid-build instead of at the end. You're the creative director. They work for you.

**Works with any AI coding tool.** Designpowers is markdown files — skills, agents, and hooks. It's built as a Claude Code plugin, but the design knowledge works anywhere that reads markdown instructions: Cursor, Windsurf, Copilot, Aider, or any future tool. The design process is the product, not the platform.

## What You Get

**10 specialist agents** that talk to each other and hand off work:

| Agent | What they do |
|-------|-------------|
| **design-strategist** | Flows, IA, personas, principles, journey maps |
| **design-scout** | Competitive research, pattern evidence, benchmarking |
| **inspiration-scout** | Aesthetic references, cross-domain inspiration, mood boards |
| **design-lead** | Visual design — layout, colour, typography, components |
| **motion-designer** | Animation, transitions, micro-interactions, reduced motion |
| **content-writer** | Interface copy, labels, errors, plain language, Grade 6 reading level |
| **design-builder** | Builds specs into production code |
| **accessibility-reviewer** | WCAG/COGA evaluation, audits output, loops back with fixes |
| **design-critic** | Reviews against brief, plan, principles; loops back with gaps |
| **heuristic-evaluator** | Nielsen's 10 heuristics, cognitive walkthroughs, usability |

**29 skills** that enforce a complete design workflow — from discovery through retrospective.

**2 modes** — Direct (you approve every handoff) and Auto (agents run the pipeline, you review at the end).

## How It Works

When you describe something to build, Designpowers activates with a friendly welcome. First-time users can opt into a **guided walkthrough** — a 2-minute narrated example that shows how agents hand off work, how you steer decisions, and how reviews catch issues. No commitment required. Returning users get their taste profile loaded automatically.

The system starts in **Direct mode** — you see every handoff and approve before the next agent runs. You can switch to Auto anytime by saying "go auto." Tips appear contextually as features become relevant, not all at once.

Agents hand off to each other with conversational messages you can see:

> **design-lead → motion-designer:** "Frosted glass cards, mint/sage palette. The progress ring is the hero moment — when it hits 100% it needs to feel like a celebration, not just a colour change. Keep it subtle everywhere else."

At every handoff, you can:
- **Approve** — "ok" or "go"
- **Correct** — "Use my design system instead"
- **Add** — "Also handle dark mode"
- **Redirect** — "Send this back to design-strategist"
- **Skip** — "Skip motion, go straight to builder"
- **Talk to any agent** — "design-lead, why frosted glass?"

Your word overrides everything. You're the creative director.

## The Workflow

```
Discover → Research → Strategise → Taste → Inspire → Plan → Design → Build → Taste Check → Review → Fix → Ship → Retrospective
                   ↑ accessibility in every phase, not a final step ↑             ↑ mid-flight correction ↑
                        ↑ debate when direction is uncertain ↑           ↑ your taste remembered across projects ↑
```

| Phase | Skill | What happens |
|-------|-------|-------------|
| Discover | `design-discovery` | Problem, users, constraints, brief. Quick mode for POCs, full mode for products |
| Research | `research-planning` | What to learn, which methods, from whom |
| Personas | `inclusive-personas` | Full ability spectrum — permanent, temporary, situational |
| Strategy | `design-strategy` | Principles, positioning, experience map, success metrics |
| Taste | `design-taste` | Your aesthetic direction — references, emotional targets, craft standards, quality bar |
| Memory | `design-memory` | Loads your taste profile from previous projects, captures new preferences |
| Inspiration | `inspiration-scouting` | Aesthetic references across domains, filtered through your taste |
| Debate | `design-debate` | Agents argue competing directions — you see the trade-offs, you decide |
| Plan | `writing-design-plans` | 2-5 minute tasks with accessibility checks per task |
| UI | `ui-composition` | Layout, colour, typography — every choice meets WCAG |
| Interaction | `interaction-design` | States, transitions, feedback, error handling |
| Content | `accessible-content` | Plain language, headings, alt text, form labels |
| Cognition | `cognitive-accessibility` | Mental load, wayfinding, focus management |
| Adaptation | `adaptive-interfaces` | Motion sensitivity, colour schemes, text sizing |
| Systems | `design-system-alignment` | Tokens, components, naming, consistency |
| Critique | `designpowers-critique` | Review against plan, principles, personas |
| Debt | `design-debt-tracker` | Living register of deferred findings — every "fix if time allows" tracked |
| Handoff | `design-handoff` | Specs, rationale, accessibility requirements |
| Testing | `usability-testing` | Plan tests, recruit participants, analyse findings, turn into actions |
| Tokens | `token-architecture` | Three-layer token model, naming, theming, multi-platform |
| Responsive | `responsive-patterns` | Content-driven breakpoints, layout shifts, fluid type, container queries |
| Motion | `motion-choreography` | The three questions, duration guide, easing, stagger, reduced-motion |
| Voice | `voice-and-tone` | Voice attributes, tone by context, vocabulary lists, reading level |
| Taste Check | `taste-feedback` | Mid-build checkpoints — catches aesthetic mismatches before full review |
| Verify | `verification-before-shipping` | Evidence it works. Not "I think it works." Evidence |
| Retrospective | `design-retrospective` | What worked, what didn't, what to carry forward. Updates taste profile |

Plus two coordination skills:
- `using-designpowers` — Router that activates on every message, routes to the right skill/agent
- `design-state` — Shared living document that all agents read and update

## Key Features

**Design taste** — The system prompts you for your aesthetic instincts: references you admire, how it should feel, what you'd hate. Upload an existing design system and it extracts the taste signals already embedded in your tokens and palette. Share your own thoughts and the agents carry your judgment through every decision. The more taste you give, the better the output — but the system works without it too. Your taste is the difference between correct and compelling.

**Design memory** — Your taste profile persists across projects. Strong opinions (confirmed across multiple projects), soft patterns (hypotheses), and anti-patterns (things you've rejected) accumulate over time. Each new project starts with what the system already knows about you. You stop repeating yourself.

**Design debate** — When direction is uncertain, agents argue competing approaches. Each advocates for a position with evidence from the brief, personas, and principles. They cross-examine each other's arguments. You see the trade-offs and decide. Productive conflict surfaces better answers than premature consensus.

**Inspiration scouting** — The inspiration-scout finds aesthetic and interaction references across domains, filtered through your taste profile. A banking app can be inspired by a meditation app's calm. Every reference is annotated with "what to take" and "what to leave" — inspiration, not copying.

**Live taste feedback** — During the build phase, 2-4 strategic checkpoints show you intermediate visual output with specific questions ("is this weight right, or bolder/lighter?"). Catches aesthetic mismatches before the full build is done. Every response is recorded as a taste signal.

**Design debt tracker** — Every "fix if time allows" and "future iteration" note from critiques and accessibility reviews goes into a living debt register. Items track who is affected, what the fix is, and why it was deferred. Debt escalates automatically when it ages or accumulates. Accessibility debt requires explicit user acknowledgement to accept. Like tech debt, but for design compromises.

**Design retrospective** — After shipping, structured reflection on what worked, what didn't, what taste decisions landed, and what to carry forward. Feeds learnings back into design memory so the next project is sharper.

**Agent babble** — Agents write conversational handoff messages to each other. You see the relay. It's like watching your team think out loud.

**User as creative director** — You intercept any handoff to correct, add, redirect, or skip. Talk to any agent by name at any time.

**Direct and Auto modes** — Direct mode pauses at every handoff for your input. Auto mode runs the pipeline hands-free. Switch mid-run with "go auto" or "pause."

**Auto safeguards** — Even in auto mode, the pipeline pauses if the accessibility reviewer finds a critical issue, the critic recommends "rethink," or reviewers conflict.

**Parallel review + reconciliation** — Accessibility reviewer and design critic run simultaneously after the build, then their findings are reconciled before a fix round.

**Screenshot checkpoint** — After the builder finishes, a screenshot is shown before reviewers start — catches visual issues early.

**Design state** — A shared `design-state.md` file accumulates decisions, handoff notes, and the full babble chain. Every agent reads it before starting.

**Quick discovery** — POCs and small tasks get one round of questions and an immediate brief. Full products get the deep multi-step process.

**Guided walkthrough** — First-time users can opt into a 2-minute narrated example before starting their own project. See agents hand off, steer a decision, watch a review — then start for real. No commitment, no pressure.

**Progressive tips** — Instead of a wall of instructions upfront, tips appear at the moment they're useful. You learn about debates when direction is uncertain, about talking to agents when an agent first speaks, about auto mode after you've approved a few handoffs. The system teaches by doing.

**Returning user recognition** — If you've used Designpowers before, the system loads your taste profile and greets you with a summary. No re-explaining, no repeat walkthrough.

## Philosophy

**Accessibility is not a phase.** It is present in every skill, every agent, every decision.

**Process over guessing.** Good design is discipline applied consistently.

**Evidence over claims.** Do not say it works until you can prove it works.

**Inclusive by default.** Nothing About Us Without Us.

**Your taste is your superpower.** Agents can verify that a design is correct — aligned to the brief, accessible, consistent. But they can't tell you whether it's *beautiful*. That's your job. Designpowers prompts you for your aesthetic judgment early and carries it through every decision. It remembers what you've told it across projects. It argues competing directions so you choose with your eyes open. It checks in during the build so mismatches don't compound. And after shipping, it reflects on what landed and feeds it forward. The human in the loop isn't a bottleneck — they're the reason the work is any good.

**Your skills, amplified.** Designpowers doesn't replace your design judgement — it gives you a team that executes it.

## Installation

### Claude Code — Desktop App

If you use the Claude Code desktop app, type this in the chat:

```
/install Owl-Listener/designpowers
```

That's it. Start a new session and describe something to design. You should see the bird.

### Claude Code — Terminal

```bash
claude install Owl-Listener/designpowers
```

### Other AI Tools (Cursor, Windsurf, Copilot, Aider, etc.)

Designpowers is markdown. The skills and agents work with any tool that can read instruction files:

1. Clone the repo
2. Copy the `skills/` and `agents/` folders into your project or tool's instruction directory
3. Point your tool at the `using-designpowers/SKILL.md` file as a system instruction or rules file
4. The design workflow activates when you describe something to build

The hook system is Claude Code-specific, but the skills and agents are universal. Adapt the file paths to your tool's conventions.

### Verify

Start a new session and describe something to design. You should see the bird and the welcome screen (Claude Code), or the discovery process should begin (other tools).

## Works With Superpowers

Designpowers complements [Superpowers](https://github.com/obra/superpowers) by Jesse Vincent. Superpowers handles engineering (TDD, debugging, code review). Designpowers handles design (discovery, strategy, accessibility, critique). Together they cover the full build cycle.

## Acknowledgements

Designpowers follows the plugin architecture pioneered by [Superpowers](https://github.com/obra/superpowers) by Jesse Vincent. The pattern is his. The design content is ours. If you do engineering work, go install Superpowers — it's extraordinary.

The inclusive design knowledge draws from W3C standards (WCAG 2.2, COGA, WAI-ARIA), Microsoft's Inclusive Design Toolkit, and the principle that accessibility is a design commitment, not a code review.

## License

MIT License — see LICENSE file for details.

## Community

Built by [MC Dean](https://github.com/Owl-Listener) and her mate Claude.

- **Issues**: https://github.com/Owl-Listener/designpowers/issues
- **Designer Skills**: https://github.com/Owl-Listener/designer-skills
- **Inclusive Design Skills**: https://github.com/Owl-Listener/inclusive-design-skills
