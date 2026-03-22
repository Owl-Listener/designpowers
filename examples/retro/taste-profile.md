# Taste Profile: Solstice — Personal Finance Dashboard

## Existing Design System
No existing design system — building taste from scratch. The current product uses default Material UI with no customisation. The user described it as "functional but soulless."

### Taste Signals from the System
- Colour philosophy: none established — defaults only
- Density: dense (Material UI defaults)
- Personality: none — generic startup look
- Typography voice: Roboto everywhere — no personality

### Where the User Wants to Evolve
"I want people to feel like they're being looked after, not like they're using a spreadsheet. The current version works but nobody loves it. I want the kind of product people screenshot and share."

## Emotional Target
Using Solstice should feel like sitting in a well-designed office with a financial advisor who speaks plainly and respects your time. Calm confidence — not sterile, not playful. Warm authority. You trust it because it looks like it was built by people who care about details.

## Aesthetic Principles

1. **Restraint over abundance** — One accent colour. One serif. Generous whitespace. Let the data speak; the interface stays quiet
   _Test: Can you remove any element and lose nothing? If not, the design is too busy_

2. **Warm neutrals, never pure grey** — Slate and stone tones carry warmth. Pure greys feel clinical in a finance context — we want trustworthy, not hospital
   _Test: Screenshot the interface in greyscale. Does it feel cold? Shift warmer_

3. **Earned emphasis** — Colour, weight, and size are rationed. When something is bold or coloured, it matters. If everything shouts, nothing is heard
   _Test: Count the visual "loudest" elements on any screen. More than 3 = too many_

4. **Craft at the detail level** — Shadows are subtle and layered. Borders are translucent, not solid. Radius is consistent. The polish is in the details people feel but don't consciously notice
   _Test: Zoom to 200%. Do the details hold up, or does it fall apart?_

## Quality Level
Production — every decision intentional, but pragmatic about timeline. Not flagship (no custom illustrations, no bespoke animations beyond transitions). The polish is in palette, spacing, typography, and consistency, not in decorative craft.

## References

| Reference | What to borrow | What to avoid |
|-----------|---------------|---------------|
| **Linear** | Information density without clutter. Clean sidebar navigation. Monochrome with one accent | Their coldness — Linear is beautiful but can feel impersonal. We need more warmth |
| **Mercury** | Trust signals through typography and spacing. The "serious but modern" feel. How they handle financial data display | Over-simplification — Mercury sometimes hides data for aesthetics. Our users want depth on demand |
| **Monzo** | Approachability and friendliness. How they make money feel less scary. Card-based transaction views | The playfulness — Monzo's bright palette and illustrations are too casual for our audience |

## Anti-References

| Anti-reference | What makes it wrong for us |
|----------------|---------------------------|
| **Bloomberg Terminal** | Information overload. No hierarchy. Density without clarity. The opposite of "calm" |
| **Early Robinhood** | Gamification of finance. Confetti on trades. Treats money as entertainment. Our users want trust, not thrills |
| **Generic Material UI dashboard** | What we currently are. Functional but forgettable. No personality, no craft, no warmth |

## Craft Standards
- **Shadows:** 2-layer system. Layer 1: tight (0 1px 2px rgba(0,0,0,0.04)). Layer 2: ambient (0 4px 12px rgba(0,0,0,0.03)). Never a single heavy shadow
- **Borders:** 1px at 8% opacity (border-color: rgba(0,0,0,0.08)). Never solid grey borders. Borders separate; they don't contain
- **Radius:** 4px for inputs and small elements. 8px for cards and containers. 12px for modals and sheets. Never fully round except avatars
- **Colour usage:** Teal-500 is the only accent. All other colour is in the warm slate/stone neutral range. Charts may use a curated 5-colour palette derived from teal
- **Typography pairing:** Inter (400/500/600) for UI. Lora (400 italic, 600) for account names and headings that need personality. Never mix more than these two families
- **Whitespace:** Generous. 24px minimum between card groups. 16px internal card padding. The interface should breathe — if it feels tight, add space
- **Animation:** 200ms ease-out for standard transitions. 300ms for modals and sheets. No spring physics — movements are confident and direct, not bouncy

## Personality
If Solstice were a person, they'd be a well-dressed financial advisor in their mid-30s. They wear clean, tailored clothes — not flashy, not cheap. Navy and slate, not black. They speak in complete sentences, never rush, never use jargon. They make you feel smart, not talked down to. Their office has one beautiful plant and natural light. Everything is tidy but not sterile. You trust them because they clearly care about the details, and they clearly care about you.
