# Design State: Solstice — Personal Finance Dashboard

**Status:** Shipped
**Last updated:** 2026-03-21
**Mode:** Mixed (direct → auto at plan phase)

## Brief

**Project:** Redesign of Solstice personal finance dashboard
**Client:** Solstice (fintech startup)
**Goal:** Transform a data-heavy finance dashboard into a calm, trustworthy experience that makes complex financial data feel approachable
**Timeline:** 3 weeks
**Constraints:** Must meet WCAG AA, support desktop + mobile, integrate with existing React codebase

## Personas

| Persona | Context | Key Needs |
|---------|---------|-----------|
| **Alex** | 28, freelancer, checks finances daily on laptop | Quick overview of accounts, clear spending patterns, no cognitive overload |
| **Sam** | 45, parent of two, uses mobile between errands | Fast balance check, upcoming bills, large text, one-handed use |
| **Jordan** | 35, low-vision user, relies on screen reader + magnification | High contrast, semantic markup, no icon-only controls, clear data table structure |

## Design Principles

1. **Clarity over density** — Show less, communicate more. Every element earns its place
2. **Trust through transparency** — Financial data must feel accurate and honest. No decorative ambiguity
3. **Calm confidence** — The interface should feel like a trusted advisor, not a stock ticker

## Taste Profile

- **Emotional target:** Calm confidence, trustworthy warmth
- **Quality level:** Production (pixel-precise but not flagship — startup timeline)
- **Key references:** Linear (clarity), Mercury (trust), Monzo (approachability)
- **Aesthetic principles:** Restraint in colour, generous whitespace, warm neutrals, one accent
- **Taste document:** `docs/designpowers/taste/2026-03-02-solstice-taste.md`

## Decisions Log

| # | Decision | Rationale | Made By | User Approved | Date |
|---|----------|-----------|---------|---------------|------|
| 1 | Card-based layout over table-first | Matches "calm" emotional target — cards create breathing room | design-lead | Yes | 2026-03-05 |
| 2 | Single accent: teal-500 | Restraint principle — one accent colour for all primary actions | design-lead | Yes | 2026-03-05 |
| 3 | Inter + Lora type pairing | User chose serif accent for warmth. Surprise pick over DM Sans | User override | — | 2026-03-03 |
| 4 | Shadows over borders for cards | Design debate resolved: shadows at 0.04 opacity, 2-layer | design-debate | Yes | 2026-03-07 |
| 5 | 200ms ease-out default transition | "Confident, not flashy" — matches taste personality | motion-designer | Yes | 2026-03-10 |
| 6 | Warm slate palette (replacing pure grey) | Original grey failed contrast. Slate-700 on slate-50 passed AA and felt warmer | accessibility-reviewer fix | Yes | 2026-03-14 |
| 7 | Row striping for mobile tables | Thin borders insufficient at mobile. Alternating slate-50/white | design-builder fix | Yes | 2026-03-16 |
| 8 | Visually hidden labels on icon buttons | Tooltip-only failed screen reader audit. Added aria-label + sr-only text | accessibility-reviewer fix | Yes | 2026-03-17 |

## Handoff Chain

| From | To | Key Context Passed | Date |
|------|----|--------------------|------|
| User | design-strategist | Brief, references (Linear, Mercury, Monzo), emotional targets | 2026-03-01 |
| design-strategist | design-taste | Principles, personas, brief summary | 2026-03-02 |
| design-taste | User | Taste profile for validation | 2026-03-03 |
| User | design-lead | Approved taste profile + Lora override | 2026-03-03 |
| design-lead | motion-designer | Layout compositions, interaction patterns, taste personality | 2026-03-09 |
| design-lead | content-writer | UI copy needs, tone guidance from taste profile | 2026-03-10 |
| design-lead | design-builder | Final compositions, component specs, token values | 2026-03-11 |
| design-builder | design-critic | Built components for review | 2026-03-13 |
| design-critic | accessibility-reviewer | Critique findings + flagged contrast concerns | 2026-03-13 |
| accessibility-reviewer | design-builder | Fix list: contrast, mobile borders, icon labels | 2026-03-14 |
| design-builder | design-critic | Fixed components (round 2) | 2026-03-17 |
| design-critic | verification-before-shipping | All checks passed | 2026-03-19 |

## Design Debt Register

| # | Issue | Severity | Source | Affected Persona | Status | Date |
|---|-------|----------|--------|-----------------|--------|------|
| 1 | Grey palette fails AA contrast at 14px | High | accessibility-reviewer | Jordan | Resolved — shifted to slate | 2026-03-14 |
| 2 | Table borders too thin on mobile | Medium | design-critic | Sam | Resolved — row striping | 2026-03-16 |
| 3 | Icon-only sidebar missing accessible names | High | accessibility-reviewer | Jordan | Resolved — aria-label added | 2026-03-17 |
| 4 | Chart axis labels overlap at < 320px | Low | design-builder | Sam | Accepted — target devices 375px+ | 2026-03-15 |
| 5 | Focus ring styling inconsistent on Safari | Medium | accessibility-reviewer | Jordan | Resolved — unified focus-visible | 2026-03-18 |
| 6 | Transaction list doesn't virtualise (perf) | Low | design-builder | Alex | Resolved — added react-window | 2026-03-18 |
| 7 | Dark mode not supported | Medium | User request | All | Open — deferred to phase 2 | 2026-03-19 |

## Artefact Index

| Artefact | Path | Status |
|----------|------|--------|
| Taste profile | `docs/designpowers/taste/2026-03-02-solstice-taste.md` | Final |
| Design compositions | `docs/designpowers/compositions/` | Shipped |
| Motion spec | `docs/designpowers/motion/solstice-motion.md` | Final |
| Component tokens | `src/tokens/solstice.json` | Shipped |
| Retrospective | `design-retrospective.md` | Final |
