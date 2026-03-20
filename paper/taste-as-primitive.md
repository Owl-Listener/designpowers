# Taste as a First-Class Primitive in Multi-Agent Design Systems

## Abstract

Design automation systems can verify correctness — alignment to briefs, accessibility compliance, internal consistency — but consistently fail to produce work that *feels* right. We introduce Designpowers, a multi-agent design orchestration system in which aesthetic taste is treated as a first-class primitive: captured as structured profiles, persisted across projects, used to constrain agent behaviour, and evolved through feedback loops. Nine specialist agents — from strategist to builder to critic — share a common taste profile that shapes their output without centralised aesthetic control. We describe the taste capture framework, the three-tier signal classification system (strong opinions, soft patterns, anti-patterns), mid-flight taste correction during build, and the retrospective loop that turns project experience into durable aesthetic knowledge. We argue that taste, operationalised this way, bridges the gap between process discipline (which produces correct design) and craft (which produces design people love).

## 1. Introduction

Multi-agent systems for software engineering and design have proliferated rapidly. Systems like MetaGPT (Hong et al., 2023), ChatDev (Qian et al., 2023), and Paperclip coordinate specialist agents through structured workflows to produce functional outputs. These systems excel at process: breaking problems into subtasks, enforcing constraints, and verifying correctness.

Yet functional correctness is a necessary but insufficient condition for good design. A layout can satisfy every requirement in a brief, pass WCAG 2.2 AA compliance, and maintain perfect internal consistency — and still feel generic, flat, or wrong. The missing dimension is *taste*: the subjective, aesthetic judgment that distinguishes competent design from design people love.

Taste is typically treated as ineffable — a quality that resides in individual designers and resists formalisation. We challenge this assumption. While taste cannot be reduced to rules, it can be:

1. **Captured** through structured conversation and design system analysis
2. **Represented** as a living document with varying confidence levels
3. **Applied** as constraints that shape agent behaviour across a pipeline
4. **Tested** through mid-flight checkpoints that catch aesthetic drift
5. **Evolved** through retrospective loops that accumulate evidence over time

This paper presents Designpowers, a system of nine specialist agents orchestrated through a skill-based pipeline in which taste flows as metadata through every phase — from strategy through build through critique. We describe the architecture, the taste representation framework, and the mechanisms by which subjective aesthetic preference becomes an operational constraint in automated design.

## 2. System Architecture

### 2.1 Agent Topology

Designpowers comprises nine specialist agents, each with defined responsibilities and handoff protocols:

| Agent | Role |
|-------|------|
| **Design Strategist** | Information architecture, user flows, design principles |
| **Design Scout** | Competitive UX research, pattern benchmarking |
| **Inspiration Scout** | Cross-domain aesthetic references filtered through taste |
| **Design Lead** | Visual design execution: layout, colour, typography, components |
| **Motion Designer** | Animation, micro-interactions, transitions |
| **Content Writer** | Interface copy, labels, error messages |
| **Design Builder** | Production code from specifications |
| **Accessibility Reviewer** | WCAG/COGA evaluation, inclusive interaction audits |
| **Design Critic** | Review against brief, plan, principles, and taste profile |

Agents communicate through *handoff babble* — conversational messages written from one agent to the next, shown to the user, and recorded in a shared design state document. This mechanism serves three purposes: it maintains context across handoffs, it makes the pipeline legible to the user, and it creates an auditable record of design decisions.

### 2.2 Orchestration Model

A router skill dispatches agents based on workflow phase and project context. The pipeline follows a gated sequence:

$$\text{Discover} \rightarrow \text{Research} \rightarrow \text{Strategise} \rightarrow \text{Taste} \rightarrow \text{Inspire} \rightarrow \text{Plan} \rightarrow \text{Design} \rightarrow \text{Build} \rightarrow \text{Review} \rightarrow \text{Ship}$$

Not all agents participate in every project. Selection is conditional: the motion designer is skipped when no animation is needed; the debate skill activates only when direction is genuinely uncertain; the inspiration scout runs only when aesthetic references are required. The user operates as creative director and may invoke or skip any agent at any point.

Two execution modes are supported:

- **DIRECT**: The user sees every handoff and approves before the next agent runs
- **AUTO**: The full pipeline runs, pausing only on critical accessibility findings, "rethink" recommendations from the critic, or unresolvable conflicts

### 2.3 Shared State

All agents read from and write to a shared `design-state` document that accumulates decisions, constraints, and the full handoff chain. This creates cascading constraints: later agents see what earlier agents decided and adjust accordingly. A decision not recorded in design state did not happen.

## 3. The Taste Framework

### 3.1 Taste Capture

Taste calibration is a conversation, not a form. The system prompts the user through six dimensions:

1. **References**: 2–3 designs they admire, with analysis of *what specifically* makes each feel good
2. **Emotional target**: 2–3 sentences describing how the design should feel
3. **Anti-references**: Designs that represent the wrong direction
4. **Quality bar**: Prototype, production, or flagship — each with concrete craft implications
5. **Personality**: "If this product were a person, how would they dress, speak, enter a room?"
6. **Gaps**: What feels missing from the current design system

When an existing design system is present, the system first extracts *embedded taste signals* from tokens before asking the user anything. Colour palette composition, spacing scale ratios, border radius values, shadow layering, and typography pairings all encode aesthetic choices that their creators may not have articulated explicitly. A design system using 2px radius with single-layer shadows at 4% opacity expresses a different taste than one using 12px radius with two-layer shadows at 8% and 16% opacity.

### 3.2 The Taste Profile

Capture produces a structured taste profile document:

```
Emotional Target: [2-3 sentences]
Aesthetic Principles: [3-5 principles, each with a test]
Quality Level: [Prototype | Production | Flagship]
Craft Standards: [shadows, borders, radius, colour, typography, whitespace, animation]
Personality: [anthropomorphic description]
References: [what to borrow | what to avoid]
Anti-References: [what specifically to reject]
```

A critical innovation is the **test** attached to each aesthetic principle. Rather than stating "use generous whitespace," a principle reads: "Breathing room over density — *test: if removing an element wouldn't leave a visible gap, the layout is too tight.*" This makes subjective preferences evaluable.

### 3.3 Three-Tier Signal Classification

Not all taste evidence carries equal weight. Design Memory classifies signals into three tiers:

| Tier | Definition | Agent Constraint |
|------|-----------|-----------------|
| **Strong Opinions** | Confirmed across multiple projects or via explicit user statements | Binding — agents cannot propose work that contradicts them |
| **Soft Patterns** | Tendencies appearing but not yet confirmed | Suggestive — agents may reference but are not bound |
| **Anti-Patterns** | Choices explicitly rejected by the user | Exclusionary — agents should avoid unless explicitly asked |

Signal strength is determined by evidence type:

$$S = \begin{cases} \text{strongest} & \text{user override (changes agent's choice)} \\ \text{strong} & \text{explicit statement ("I always want...")} \\ \text{moderate} & \text{emphatic approval ("Yes! Exactly right")} \\ \text{weak} & \text{silent approval (no comment)} \\ \text{strong negative} & \text{correction ("No, more like...")} \end{cases}$$

Silent approval is not recorded until a pattern repeats across projects. This prevents premature generalisation from a single non-response.

### 3.4 Agent-Specific Taste Application

Each agent reads the taste profile differently:

| Agent | Taste Dimensions Used |
|-------|----------------------|
| Design Lead | Emotional target, craft standards, aesthetic principles, references |
| Motion Designer | Animation personality (snappy vs. fluid vs. springy) |
| Content Writer | Voice warmth, formality level, vocabulary stance |
| Design Builder | Craft standards, quality level (affects implementation detail) |
| Design Critic | All dimensions — evaluates craft quality against full profile |
| Inspiration Scout | Pre-filters references against anti-patterns, highlights alignment with strong opinions |
| Accessibility Reviewer | Flags taste–accessibility tensions (e.g., elegant thin type failing contrast) |

This distribution means taste is not enforced by a single gatekeeper but emerges from the collective behaviour of agents who each attend to different facets of the same profile.

## 4. Mid-Flight Taste Correction

### 4.1 The Problem of Late Discovery

In a standard pipeline, taste mismatches surface at critique — after the full build is complete. If the colour palette is wrong, every component built with that palette must be reworked. The cost of late discovery is proportional to the number of downstream artefacts.

### 4.2 Strategic Checkpoints

The taste-feedback skill introduces 2–4 checkpoints during the build phase at moments of high aesthetic signal:

| Checkpoint | Trigger |
|-----------|---------|
| Colour and typography applied | After first component is styled |
| Layout structure visible | After primary screen scaffold |
| First interaction implemented | After first stateful component |
| Content integrated | After content writer's copy is placed |

Checkpoints are avoided when aesthetic signal is low: unstyled HTML, isolated components without context, or trivially small changes.

### 4.3 Specific Questions Over Vague Prompts

The system enforces a questioning discipline that rejects vague feedback requests:

| Prohibited | Required |
|-----------|---------|
| "Does this look good?" | "The heading is 32px Inter Medium — is that weight right, or should it be bolder/lighter?" |
| "Any feedback?" | "The cards use 16px padding and 8px radius. Does this density feel right?" |
| "Right direction?" | "I chose warm grey (#F5F3F0) for the background. Does this warmth match your intent?" |

This specificity serves two purposes: it reduces cognitive load on the user (they evaluate a concrete choice rather than generating feedback from nothing), and it produces *actionable* taste signals rather than ambiguous approval.

### 4.4 Adaptive Frequency

Checkpoint frequency adapts to user behaviour:

- Approves quickly every time → reduce to 1–2 checkpoints (user trusts the direction)
- Gives detailed feedback → maintain 3–4 (user wants control)
- Expresses impatience → drop to 1 or none
- Requests more → increase

### 4.5 Directional Signals

A key insight is that *directions* generalise better than absolutes. When a user says "make the background warmer," the system records not just the specific hex value chosen but the *direction*: "wanted warmer." Directions like "more contrast," "tighter spacing," and "bolder type" transfer across projects in ways that specific values do not.

## 5. Taste Evolution

### 5.1 The Retrospective Loop

After a project ships, the design-retrospective skill analyses what happened to taste through the project lifecycle:

- Which taste decisions sailed through critique untouched?
- Which were overridden by the user?
- Where did taste preferences conflict with accessibility requirements?
- What surprised the user about their own preferences?

### 5.2 Memory Consolidation

The design-memory skill processes retrospective findings and updates the persistent taste profile:

- Soft patterns confirmed by multiple projects are promoted to strong opinions
- Soft patterns contradicted by evidence are demoted or removed
- New anti-patterns discovered during the project are recorded
- The project is added to the history with its key taste decisions and learnings

The taste profile is stored at `~/.designpowers/taste-profile.md` and loaded at the start of every new project. Over time, this creates a progressively richer model of the user's aesthetic identity — not as a fixed style, but as a set of tendencies, constraints, and directions with varying levels of evidential support.

### 5.3 Preventing Taste Ossification

A risk of persistent memory is premature convergence — the system becomes so confident in past preferences that it stops proposing alternatives. Two mechanisms counteract this:

1. **Soft patterns are explicitly hypothetical.** They are presented to agents as suggestions, not constraints, and the system notes when evidence is thin.
2. **Retrospectives ask about surprises.** "Where did your preferences surprise you?" opens space for the profile to evolve rather than calcify.

## 6. Structured Debate for Aesthetic Decisions

When design direction is genuinely uncertain — multiple viable approaches exist, the user is unsure, or the critic recommends rethinking — the system invokes structured debate rather than defaulting to the first proposal.

### 6.1 Process

1. **Frame**: A specific, answerable question with constraints and stakes
2. **Advocate**: 2–3 agents each argue for a different direction, structured as: the case, who it serves best, who it serves least, trade-offs, and evidence
3. **Cross-examine**: Each advocate rebuts the others' strongest arguments
4. **Assess accessibility**: The accessibility reviewer evaluates all directions as constraint, not advocacy
5. **Present**: The user sees a structured comparison and chooses

### 6.2 Design Principles

Three rules govern debates:

- **No straw men**: Agents must present opposing directions at their strongest
- **Accessibility as constraint, not position**: Accessibility assessment is separate from advocacy
- **Brief and personas break ties**: When advocacy is balanced, alignment with the original brief and persona impact determines the recommendation

Debate depth scales with stakes: full multi-advocate debate for architectural decisions, quick two-option comparison for component-level choices.

## 7. Conflict Resolution: Taste vs. Accessibility

An inevitable tension exists between aesthetic preference and accessibility requirements. A user may prefer thin, elegant typography that fails WCAG contrast ratios. A colour palette may be beautiful but indistinguishable to users with colour vision deficiency.

Designpowers resolves this with a clear hierarchy:

$$\text{Accessibility} > \text{Brief} > \text{Taste} > \text{Agent opinion}$$

When a taste preference conflicts with accessibility:

1. Accessibility wins — the requirement is met
2. The conflict is flagged explicitly to the user
3. The system proposes an alternative that satisfies accessibility while staying as close to the taste preference as possible
4. The user's choice is recorded as a taste signal for future reference

This is not a compromise — it is a constraint refinement. The taste preference is not overridden silently but redirected into the accessible solution space.

## 8. Discussion

### 8.1 Taste Is Not Style

A common conflation treats taste as synonymous with visual style — a fixed set of colours, fonts, and spacing values. In Designpowers, taste is broader and more dynamic:

- **Style** is what you see. **Taste** is why you chose it.
- Style can be encoded in a design system. Taste determines how that system is *applied*.
- Style is static between updates. Taste evolves with every project.

The taste profile captures not tokens but *reasoning about tokens*: why these colours, at what density, with what emotional intent, and when to break the rules.

### 8.2 The User as Creative Director

Designpowers deliberately positions the user not as a passive consumer of agent output but as the creative director of a design team. Agents propose; the user decides. Taste is the mechanism through which the user's aesthetic authority is maintained without requiring them to make every micro-decision.

This model reflects how design teams actually work: a creative director sets aesthetic direction, specialists execute within that direction, and the director intervenes when execution drifts from intent.

### 8.3 Limitations

**Cold start.** A new user with no taste profile and no existing design system receives no taste constraints. The system defaults to agent judgment, which may produce generic output until calibration occurs.

**Taste transfer.** The current system assumes a single user whose taste is internally consistent. Teams with multiple stakeholders holding conflicting aesthetic preferences are not yet modelled.

**Evaluation.** We have not conducted formal user studies comparing design output quality with and without taste primitives. The claim that taste-constrained output is preferred by users remains to be validated empirically.

**Subjectivity.** By definition, taste is subjective. The system operationalises one person's taste, not universal aesthetic quality. Whether AI systems *should* develop independent aesthetic judgment is an open question we deliberately sidestep.

## 9. Related Work

**Multi-agent software systems.** MetaGPT (Hong et al., 2023) and ChatDev (Qian et al., 2023) demonstrate role-based multi-agent collaboration for code generation. Paperclip extends this to business operations. Designpowers applies the pattern to design, adding taste as a novel coordination signal.

**Design systems and tokens.** Design tokens (Salesforce Lightning, Material Design) encode visual decisions as reusable values. Designpowers treats tokens as *evidence of taste* rather than taste itself — extracting the reasoning behind token choices.

**Preference learning.** RLHF (Ouyang et al., 2022) and DPO (Rafailov et al., 2023) learn preferences from pairwise comparisons. Designpowers' signal classification operates at a higher level of abstraction — learning preference *directions* and *principles* rather than optimising a reward model.

**Computational aesthetics.** Prior work in computational aesthetics (Datta et al., 2006; Marchesotti et al., 2011) attempts to predict aesthetic quality from image features. Designpowers takes the opposite approach: rather than predicting what is beautiful, it captures what a specific user finds beautiful and applies it as constraint.

## 10. Conclusion

We have presented a framework in which aesthetic taste is operationalised as a first-class primitive in multi-agent design systems. Through structured capture, three-tier signal classification, mid-flight correction, and retrospective evolution, taste becomes not an ineffable quality but a learnable, shareable, testable, and evolving construct.

The core insight is that taste sits in a gap that neither process nor automation addresses. Process discipline produces correct design. Automation produces efficient design. Taste produces design people love. By giving agents access to a shared taste profile — and giving users the tools to shape, test, and evolve that profile over time — we bridge the gap between what is correct and what is beautiful.

The system is open source and available at [github.com/Owl-Listener/designpowers](https://github.com/Owl-Listener/designpowers).

## References

- Datta, R., Joshi, D., Li, J., & Wang, J. Z. (2006). Studying aesthetics in photographic images using a computational approach. *ECCV 2006*.
- Hong, S., et al. (2023). MetaGPT: Meta Programming for Multi-Agent Collaborative Framework. *arXiv:2308.00352*.
- Marchesotti, L., Perronnin, F., Larlus, D., & Csurka, G. (2011). Assessing the aesthetic quality of photographs using generic image descriptors. *ICCV 2011*.
- Ouyang, L., et al. (2022). Training language models to follow instructions with human feedback. *NeurIPS 2022*.
- Qian, C., et al. (2023). Communicative Agents for Software Development. *arXiv:2307.07924*.
- Rafailov, R., et al. (2023). Direct Preference Optimization: Your Language Model Is Secretly a Reward Model. *NeurIPS 2023*.
