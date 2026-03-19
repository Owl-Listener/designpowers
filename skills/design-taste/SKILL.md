---
name: design-taste
description: Use when calibrating aesthetic direction — capturing design references, quality benchmarks, and the subjective qualities that make a design feel elevated. Invoked between strategy and design to give agents a shared sense of what "good" looks and feels like for this project
---

# Design Taste

Process discipline produces correct design. Taste produces design people love. This skill captures the subjective, aesthetic dimension that no checklist can replace — the difference between a design that works and one that sings.

## Why This Exists

The Designpowers workflow verifies that designs are:
- Aligned to the brief and plan
- Accessible and inclusive
- Consistent with design principles

But none of that answers: **Is it beautiful? Does it feel right? Is it elevated?**

Taste is the gap between compliance and craft. This skill gives agents a shared vocabulary and reference point for the aesthetic quality the project demands.

## When to Use

- After strategy, before design work begins (taste calibration)
- When the user shares design references, screenshots, or inspiration
- When the design-lead needs aesthetic direction beyond what the brief provides
- When the design-critic needs to evaluate craft quality, not just plan compliance
- When something "works" but doesn't feel right — and you need to articulate why

## Process

### Step 1: Gather Taste Inputs

Ask the user for aesthetic direction. Not everyone speaks in design terms — meet them where they are.

**Ask these questions (adapt to context):**

1. **References** — "Show me 2-3 designs you admire. What do you love about each?"
2. **Emotional target** — "When someone uses this, what should it feel like?" (Examples: calm confidence, playful energy, quiet authority, warm invitation)
3. **Anti-references** — "Show me something you'd hate this to look like. What makes it wrong?"
4. **Quality bar** — "What level of polish are we targeting?" (Prototype → production → flagship)
5. **Personality** — "If this product were a person, how would they dress? How would they speak?"

Not every question is needed. Read the room. If the user has strong visual instincts, lean on references. If they think in feelings, lean on emotional targets. If they have anti-references, those are often more revealing than positive ones.

### Step 2: Analyse the References

For each design reference the user provides, extract the specific qualities that make it work:

```markdown
## Reference Analysis: [Name/URL]

**What makes this feel good:**
- [Specific quality] — e.g., "generous whitespace creates breathing room"
- [Specific quality] — e.g., "typography has a single accent weight, never competes"
- [Specific quality] — e.g., "colour palette is 90% neutral, 10% vibrant — the accent hits harder because it's rare"

**Craft details worth noting:**
- [Detail] — e.g., "borders are 1px at 8% opacity, not solid lines"
- [Detail] — e.g., "shadows use 2 layers: a tight sharp shadow + a soft ambient"
- [Detail] — e.g., "hover states use scale(1.02), not colour change"

**What to borrow (principle, not pixel):**
- [Transferable pattern] — e.g., "restraint in colour — let one accent do the work"
- [Transferable pattern] — e.g., "consistent radius vocabulary: 4px for inputs, 8px for cards, 16px for modals"
```

### Step 3: Define the Taste Profile

Synthesise the references, emotional targets, and anti-references into a taste profile. This is the document that agents use when making aesthetic decisions.

```markdown
# Taste Profile: [Project Name]

## Emotional Target
[2-3 sentences: what this should feel like to use]

## Aesthetic Principles
[3-5 principles specific to the visual/emotional quality, not functional design]

1. **[Principle name]** — [What it means]
   _Test: [How to evaluate whether a design decision follows this]_

2. **[Principle name]** — [What it means]
   _Test: [How to evaluate]_

## Quality Level
[Prototype / Production / Flagship]
[What this means in practice — e.g., "flagship: every pixel intentional, micro-interactions polished, typography refined to the point of invisibility"]

## References
| Reference | What to borrow | What to avoid |
|-----------|---------------|---------------|
| [Name] | [Specific qualities] | [What not to copy] |

## Anti-References
| Anti-reference | What makes it wrong for us |
|----------------|---------------------------|
| [Name] | [Specific qualities to avoid] |

## Craft Standards
[Specific details that define the quality bar]
- Shadows: [approach]
- Borders: [approach]
- Radius: [vocabulary]
- Colour usage: [restraint rules]
- Typography pairing: [rules]
- Whitespace: [philosophy — generous/tight/balanced]
- Animation: [personality — snappy/fluid/springy/minimal]

## Personality
[If the product were a person: how they'd dress, speak, move]
```

Save to: `docs/designpowers/taste/YYYY-MM-DD-<project>-taste.md`

### Step 4: Add Taste to Design State

After the taste profile is created, update `design-state.md`:

1. Add a **Taste Profile** section after Design Principles:

```markdown
## Taste Profile
- **Emotional target:** [2-3 words]
- **Quality level:** [Prototype / Production / Flagship]
- **Key references:** [names]
- **Aesthetic principles:** [list]
- **Taste document:** [path]
```

2. Record the taste calibration in the Decisions Log
3. Add the taste document to the Artefact Index

### Step 5: Validate with the User

Present the taste profile and ask: "Does this capture what you're going for?"

The user's taste overrides everything. If they say "I want it to feel like Linear but warmer," that's the direction — even if the references suggest otherwise.

## How Agents Use the Taste Profile

Once the taste profile exists, it becomes a reference document for the entire workflow:

| Agent | How they use taste |
|-------|-------------------|
| **design-lead** | Makes aesthetic decisions that serve the emotional target and craft standards. References the taste profile alongside design principles |
| **motion-designer** | Matches animation personality to the taste profile (snappy vs. fluid vs. springy). Easing curves should feel like the product's personality |
| **content-writer** | Matches voice warmth/formality to the product personality. A "quiet authority" product doesn't use exclamation marks |
| **design-builder** | Implements craft details at the specified quality level. A flagship build polishes shadows, transitions, and spacing to the pixel |
| **design-critic** | Evaluates craft quality against the taste profile, not just compliance. "This meets the brief but falls below the quality bar" is a valid critique |
| **accessibility-reviewer** | Ensures taste decisions don't compromise access. Thin, elegant text is a taste choice that might fail contrast. Flag the tension, don't just override |

## Taste Is Not Arbitrary

Good taste is specific, consistent, and defensible. It is not "I like blue" — it is "blue at 12% opacity as a background tint creates the calm, clinical feel our medical app needs, referencing the quiet confidence of the references we chose."

Every taste decision should connect back to:
1. The emotional target (how it should feel)
2. The references (where the quality bar comes from)
3. The personas (who experiences it)

Taste that excludes people is not good taste. If a thin, delicate typeface creates the right mood but fails readability for low-vision users, find a typeface that does both. The constraint makes the design better, not worse.

## Red Flags

| Flag | Response |
|------|----------|
| No references at all | Push gently. Even "I like how Apple does things" gives direction |
| References that contradict each other | This is fine — extract what's common, flag what conflicts, ask the user to resolve |
| Taste profile that violates accessibility | Find the version that serves both. Thin borders can be elegant AND meet contrast ratios. It's harder, but it's the job |
| "Just make it look good" | Not enough. Probe deeper: "Good like Stripe? Good like Notion? Good like a luxury hotel?" — taste needs specifics |
| Quality level doesn't match timeline | Flag the tension. Flagship quality takes time. If the timeline says prototype, the taste profile should reflect achievable craft |

## Integration

- **Called after:** `design-strategy` (once principles exist, calibrate taste)
- **Called before:** `ui-composition`, `interaction-design`, `motion-choreography`
- **Referenced by:** `design-lead`, `motion-designer`, `content-writer`, `design-builder`, `design-critic`
- **Updated when:** user provides new references, changes aesthetic direction, or overrides a taste decision
