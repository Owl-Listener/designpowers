# Designpowers

```
            <o)
            /) )
          ==#===
```

Your design skills, amplified.

Designpowers is a Claude Code plugin that gives you a team of 8 design agents. They discover, research, strategise, design, build, review, and hand off — with accessibility woven into every step. You're the creative director. They work for you.

## What You Get

**8 specialist agents** that talk to each other and hand off work:

| Agent | What they do |
|-------|-------------|
| **design-strategist** | Flows, IA, personas, principles, journey maps |
| **design-scout** | Competitive research, pattern evidence, benchmarking |
| **design-lead** | Visual design — layout, colour, typography, components |
| **motion-designer** | Animation, transitions, micro-interactions, reduced motion |
| **content-writer** | Interface copy, labels, errors, plain language, Grade 6 reading level |
| **design-builder** | Builds specs into production code |
| **accessibility-reviewer** | WCAG/COGA evaluation, audits output, loops back with fixes |
| **design-critic** | Reviews against brief, plan, principles; loops back with gaps |

**16 skills** that enforce a complete design workflow — from discovery through handoff.

**2 modes** — Direct (you approve every handoff) and Auto (agents run the pipeline, you review at the end).

## How It Works

When you describe something to build, Designpowers activates:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            <o)
            /) )
          ==#===

  ▓▓▓▓  DESIGNPOWERS  ▓▓▓▓

  ✦ YOUR DESIGN TEAM IS READY ✦

  CHOOSE YOUR MODE:
  ► DIRECT — approve every handoff
  ► AUTO   — agents run, you review at the end

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

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
Discover → Research → Strategise → Plan → Design → Build → Review → Fix → Ship
                   ↑ accessibility in every phase, not a final step ↑
```

| Phase | Skill | What happens |
|-------|-------|-------------|
| Discover | `design-discovery` | Problem, users, constraints, brief. Quick mode for POCs, full mode for products |
| Research | `research-planning` | What to learn, which methods, from whom |
| Personas | `inclusive-personas` | Full ability spectrum — permanent, temporary, situational |
| Strategy | `design-strategy` | Principles, positioning, experience map, success metrics |
| Plan | `writing-design-plans` | 2-5 minute tasks with accessibility checks per task |
| UI | `ui-composition` | Layout, colour, typography — every choice meets WCAG |
| Interaction | `interaction-design` | States, transitions, feedback, error handling |
| Content | `accessible-content` | Plain language, headings, alt text, form labels |
| Cognition | `cognitive-accessibility` | Mental load, wayfinding, focus management |
| Adaptation | `adaptive-interfaces` | Motion sensitivity, colour schemes, text sizing |
| Systems | `design-system-alignment` | Tokens, components, naming, consistency |
| Critique | `designpowers-critique` | Review against plan, principles, personas |
| Handoff | `design-handoff` | Specs, rationale, accessibility requirements |
| Verify | `verification-before-shipping` | Evidence it works. Not "I think it works." Evidence |

Plus two coordination skills:
- `using-designpowers` — Router that activates on every message, routes to the right skill/agent
- `design-state` — Shared living document that all agents read and update

## Key Features

**Agent babble** — Agents write conversational handoff messages to each other. You see the relay. It's like watching your team think out loud.

**User as creative director** — You intercept any handoff to correct, add, redirect, or skip. Talk to any agent by name at any time.

**Direct and Auto modes** — Direct mode pauses at every handoff for your input. Auto mode runs the pipeline hands-free. Switch mid-run with "go auto" or "pause."

**Auto safeguards** — Even in auto mode, the pipeline pauses if the accessibility reviewer finds a critical issue, the critic recommends "rethink," or reviewers conflict.

**Parallel review + reconciliation** — Accessibility reviewer and design critic run simultaneously after the build, then their findings are reconciled before a fix round.

**Screenshot checkpoint** — After the builder finishes, a screenshot is shown before reviewers start — catches visual issues early.

**Design state** — A shared `design-state.md` file accumulates decisions, handoff notes, and the full babble chain. Every agent reads it before starting.

**Quick discovery** — POCs and small tasks get one round of questions and an immediate brief. Full products get the deep multi-step process.

## Philosophy

**Accessibility is not a phase.** It is present in every skill, every agent, every decision.

**Process over guessing.** Good design is discipline applied consistently.

**Evidence over claims.** Do not say it works until you can prove it works.

**Inclusive by default.** Nothing About Us Without Us.

**Your skills, amplified.** Designpowers doesn't replace your design judgement — it gives you a team that executes it.

## Installation

### Claude Code (via Plugin Marketplace)

```bash
/plugin marketplace add Owl-Listener/designpowers
/plugin install designpowers@designpowers
```

### Manual Installation

Clone and copy into your `~/.claude/` directory:

```bash
git clone https://github.com/Owl-Listener/designpowers.git
cp -r designpowers/skills/* ~/.claude/skills/
cp -r designpowers/agents/* ~/.claude/agents/
cp -r designpowers/hooks/* ~/.claude/hooks/
```

### Verify

Start a new session and describe something to design. You should see the bird and the welcome screen.

## Works With Superpowers

Designpowers complements [Superpowers](https://github.com/obra/superpowers) by Jesse Vincent. Superpowers handles engineering (TDD, debugging, code review). Designpowers handles design (discovery, strategy, accessibility, critique). Together they cover the full build cycle.

## Acknowledgements

Designpowers follows the plugin architecture pioneered by [Superpowers](https://github.com/obra/superpowers) by Jesse Vincent. The pattern is his. The design content is ours. If you do engineering work, go install Superpowers — it's extraordinary.

The inclusive design knowledge draws from W3C standards (WCAG 2.2, COGA, WAI-ARIA), Microsoft's Inclusive Design Toolkit, and the principle that accessibility is a design commitment, not a code review.

## License

MIT License — see LICENSE file for details.

## Community

Built by [MC Dean](https://github.com/Owl-Listener).

- **Issues**: https://github.com/Owl-Listener/designpowers/issues
- **Designer Skills**: https://github.com/Owl-Listener/designer-skills
- **Inclusive Design Skills**: https://github.com/Owl-Listener/inclusive-design-skills
