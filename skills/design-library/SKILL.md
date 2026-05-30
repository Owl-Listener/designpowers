---
name: design-library
description: Use when the user wants to start from a known brand's design language — "use the same design language as Stripe", "make it feel like Linear", "start from Notion's DESIGN.md", "what brands can I borrow from?". Pulls a ready-made DESIGN.md from the open VoltAgent/awesome-design-md library (73+ brand design systems in the standard format), loads it as a STARTING POINT for the project's design layer, then adapts it to the real client. Inspired references, not official brand assets — adapt, don't impersonate
---

# Design Library (awesome-design-md)

There's an open, MIT-licensed library of ready-made `DESIGN.md` files — [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) — covering 70+ well-known brands (Stripe, Linear, Notion, Vercel, Apple, Shopify, Wise, and more), each authored in the standard `DESIGN.md` format. This skill lets a designer say *"let's use the same design language as Stripe"* and have the team pull that brand's `DESIGN.md` straight off the shelf as a high-fidelity starting point, instead of describing a vibe from scratch.

It pairs with `design-md` (which defines the format and how the build consumes it) and `inspiration-scouting` (the "what to take / what to leave" discipline).

## When to Use

- "Use the same design language as **[brand]**" / "make it feel like **[brand]**" / "start from **[brand]**'s DESIGN.md"
- "What brands / design systems can I borrow from?" → browse the library
- The user names a recognisable product as a visual reference for the whole project (not just one screen)

For a one-off aesthetic reference on a single component, `inspiration-scouting` is lighter. Use this skill when a whole brand's design *language* should seed the project.

## The Library

- **Repo:** `VoltAgent/awesome-design-md` (MIT)
- **Path convention:** `design-md/<slug>/DESIGN.md` (each brand folder also has a `README.md` and HTML previews)
- **Raw URL:** `https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/<slug>/DESIGN.md`
- **Format:** standard `DESIGN.md` — YAML front-matter tokens + the required markdown sections (see `design-md`). Many include extra sections like *Responsive Behavior* and *Iteration Guide*.

The files are organised by category (AI/LLM platforms, Developer tools, Backend/DevOps, Productivity/SaaS, Design tools, Fintech/Crypto, E-commerce, Media/Consumer, Automotive, Retro Web).

## Process

### 1. Resolve the brand to a slug

**Slugs are not always the obvious name** — e.g. `runwayml` (not "runway"), `bmw-m`, `linear.app`. Don't guess blindly:

1. List the available slugs first — fetch the `design-md/` directory listing (GitHub API or a shallow clone) or read the repo `README.md` index — and match the user's brand to a real slug.
2. If exactly one obvious match, use it. If several plausible matches or none, **show the user the closest options and let them pick** rather than fetching the wrong one.
3. If the brand isn't in the library, say so and offer the nearest sibling in the same category (e.g. "No Monzo, but Wise and Mastercard are in Fintech — want one of those as the base?") or fall back to `design-taste` to build from scratch.

### 2. Fetch the DESIGN.md

Fetch the raw file at the URL above (e.g. `curl` or any fetch tool). Confirm it returns a valid `DESIGN.md` (front matter parses, required sections present — see `design-md`).

### 3. Frame it honestly: inspired, not official

These are **community-authored, *inspired* interpretations** — the files even say so (Stripe's is named `Stripi-Inspired-design-analysis`). Treat the result like any `inspiration-scouting` reference:

- It's a **starting point and a reference for the design *language*** (palette logic, type personality, spacing rhythm, component feel) — **not** a brand to impersonate or paste wholesale onto a client.
- **Adapt it to the real client.** Annotate what to take and what to leave. The goal is "informed by Stripe's clarity," not "pretending to be Stripe."
- Don't ship a client a competitor's exact brand. Pull the *language*, then make it the client's own.

### 4. Load it as the project layer (and adapt)

1. Save the fetched file to the project root as `DESIGN.md` (or `DESIGN.reference.md` if you want to keep it distinct while adapting). Record provenance in the file's Overview: *"Seeded from awesome-design-md/<slug> (MIT) — inspired interpretation, adapted for [client]."*
2. Hand to **`design-md`**, which loads it as the authoritative **project/client taste layer** and drives high-fidelity output.
3. **Run the accessibility overlay** (`design-md`) — a library file is not guaranteed WCAG-compliant. Validate its colour pairings and type scale; flag and adjust anything that fails. Accessibility wins over the borrowed brand.
4. **Never promote it to personal taste.** Borrowing Stripe's language tells you nothing about *the designer's* taste — the `design-memory` Promotion Gate keeps it out of `~/.designpowers/taste-profile.md`.

### 5. Browse mode

If the user just wants to explore ("what can I borrow from?"), list the categories and a sampling of brands, and point them at the previews. Offer to pull any one as a base.

## Attribution & Licence

The library is **MIT-licensed** (© VoltAgent). Reuse is free; keep the provenance note from step 4 so it's clear where the base came from and that it's an inspired interpretation. The named brands' actual trademarks belong to them — which is exactly why this skill adapts the *language* rather than reproducing a brand identity.

## Integration

- **Resolves & fetches from:** `VoltAgent/awesome-design-md` (raw GitHub)
- **Hands the file to:** `design-md` (loads as project taste layer, runs the accessibility overlay)
- **Discipline shared with:** `inspiration-scouting` (what to take / what to leave — adapt, don't copy)
- **Never writes to:** `~/.designpowers/taste-profile.md` (Promotion Gate — borrowed brand ≠ personal taste)
- **Falls back to:** `design-taste` (build from scratch) when the brand isn't in the library
- **Records to:** `design-state.md` (which brand was used as the base, and the adaptations made)
