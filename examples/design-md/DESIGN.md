---
name: Verdant
version: alpha
description: Storefront and plant-care companion for Verdant Botanicals — calm, knowledgeable, unpretentious. Project/client taste; authoritative for this project, not personal taste.
colors:
  leaf: "#2F6F4F"
  leafInk: "#FFFFFF"
  bark: "#2A2722"
  stone: "#5D5950"
  paper: "#F7F5F0"
  card: "#FFFFFF"
  line: "#E7E3DA"
  clay: "#C2643C"
typography:
  display:
    fontFamily: "Fraunces"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: "1.15"
    letterSpacing: "-0.01em"
  heading:
    fontFamily: "Fraunces"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: "1.2"
  body:
    fontFamily: "Inter"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "1.5"
  overline:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "1.3"
    letterSpacing: "0.08em"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
rounded:
  input: "6px"
  card: "12px"
  sheet: "20px"
components:
  primaryButton:
    backgroundColor: "{colors.leaf}"
    textColor: "{colors.leafInk}"
    typography: "{typography.body}"
    padding: "{spacing.md}"
    rounded: "{rounded.input}"
  productCard:
    backgroundColor: "{colors.card}"
    textColor: "{colors.bark}"
    padding: "{spacing.md}"
    rounded: "{rounded.card}"
  priceTag:
    textColor: "{colors.clay}"
    typography: "{typography.heading}"
---

# DESIGN.md — Verdant Botanicals

## Overview
Verdant sells indoor plants and the confidence to keep them alive. The design is calm, warm, and quietly expert — a knowledgeable friend, never a loud brand. Product photography leads; the interface stays out of its way. The atmosphere is editorial and unhurried, closer to a good plant shop than a tech storefront. Source: extracted from Verdant brand guide v3 + Figma library "Verdant DS / 2.4", reconciled with a taste interview. Fidelity target: **production** — real tokens, real components, no placeholder craft.

## Colors
`leaf` is the single brand accent — primary actions only. `clay` is reserved **exclusively** for genuine urgency (price drops, low stock) and never for decoration. Everything else lives in the warm `stone`/`paper` neutral range — no pure black, no pure grey, no second green. `bark` carries body text and headings; `paper` is the page, `card` the surfaces, `line` the hairlines.

## Typography
Two families, no third. **Fraunces 600** for display and headings — its warmth carries the botanical character. **Inter** (400/500/600) for body, labels, and UI. Scale: 12 / 15 / 17 / 21 / 28 / 40 px; body line-height 1.5, headings 1.15. Headings are sentence case. All-caps only on the 12px `overline`. Never letter-spacing on body.

## Layout
4px base unit; spacing scale 4 / 8 / 12 / 16 / 24 / 32 / 48. Minimum 24px between content groups, 16px internal card padding. Generous whitespace — the interface should breathe. Storefront is web-first with a content-led product grid; the cart is a right-side sheet, never a separate page.

## Elevation & Depth
Soft, two-layer shadows only: `0 1px 2px rgba(42,39,34,.05)` for the tight layer and `0 6px 20px rgba(42,39,34,.04)` for the ambient layer. Never a single hard shadow. Surfaces separate through shadow and the `line` hairline, not heavy borders.

## Shapes
Radius language: 6px inputs/buttons, 12px cards and product images, 20px sheets/modals. Never fully round except avatars and the cart badge. Borders are 1px `line`, used to divide, not to contain.

## Components
- **primaryButton** — `leaf` fill, white label, used for the single primary action per view.
- **productCard** — photo-led, shows a care-difficulty badge (easy / moderate / fussy) and a light-level icon. Reuse `Verdant DS / 2.4` props and naming.
- **priceTag** — `clay` only when showing a real discount; otherwise prices use `bark`.
- **Cart** — right-side `Sheet`, never a modal interruption.
Line icons, 1.75px stroke, rounded joins (Lucide-compatible).

## Do's and Don'ts
- ✅ Let product photography lead; keep chrome quiet around it.
- ✅ Use `clay` only for genuine price/stock urgency.
- ✅ Pair every care instruction with the plain-language "why."
- ❌ No second green, no pure grey, no all-caps body, no emoji.
- ❌ No "plant parent," "leafy friend," or exclamation-mark cheer.
- ❌ No modal interruptions on the storefront — use the cart sheet.

## Voice & Tone
*(Designpowers addition beyond the required sections — the build reads this too.)* Plain, reassuring, quietly expert. Talks like a knowledgeable friend, not a brand. Reading level grade 7 or below. ✅ "Yellow leaves usually mean too much water. Let the soil dry out before the next drink." ❌ "Oops! Your leafy friend is feeling thirsty! 🌱"

## Accessibility (Designpowers overlay)
Target WCAG 2.2 AA. `leaf` on `paper`/white and `bark`/`stone` on `paper` all pass for their uses. **`clay` (#C2643C) on `paper` fails AA at small sizes** — so it is used at 15px+ semibold or paired with a non-colour cue (e.g. a "Sale" label or stock icon), never as the sole signal.
