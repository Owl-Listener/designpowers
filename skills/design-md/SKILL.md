---
name: design-md
description: Use when a project has — or needs — a DESIGN.md file: the open, Apache-2.0 design-system format from Google Labs (Stitch) that coding agents read to build brand-consistent UI. When a DESIGN.md is present, READ IT and treat it as authoritative for this project, which produces much higher-fidelity output than inferring brand from scratch. DESIGN.md is the PROJECT/CLIENT taste layer — distinct from the user's portable personal taste in design-memory — and a client's DESIGN.md never contaminates the personal profile. Designpowers adopts the standard as-is and adds an accessibility overlay on top
---

# DESIGN.md — the project design source of truth

`DESIGN.md` is an **open standard** (Apache-2.0, `google-labs-code/design.md`, originally from Google Labs' Stitch) for describing a visual design system to coding agents in one version-controllable file. It's "what `README.md` is to a repo, but for design." Any compatible agent — Claude Code, Cursor, Copilot, Stitch — can read it and build consistently from it. **Designpowers adopts this standard directly rather than inventing its own format**, so a `DESIGN.md` a designer writes here works everywhere else, and vice-versa.

When a `DESIGN.md` exists, the team builds from real, specified tokens instead of guessing — the difference between a rough sketch and a high-fidelity prototype that actually looks like the brand.

## The Two Taste Layers (read this first)

Designpowers keeps two kinds of taste deliberately separate:

| Layer | Lives in | Scope | Accumulates? |
|-------|----------|-------|--------------|
| **Personal taste** | `~/.designpowers/taste-profile.md` (`design-memory`) | The designer's *portable* instincts — how they decide, regardless of client | Yes, across all projects |
| **Project / client taste** | `DESIGN.md` (this skill, the open standard) | What *this* project/client requires — brand, tokens, voice | No — it belongs to the project |

This separation is the point. A designer who serves many clients needs each client's taste to stay in that client's `DESIGN.md` — a fintech client's restrained palette must not bleed into a children's-app client's next brief, nor silently rewrite the designer's own portable preferences.

**The rule:** when a `DESIGN.md` exists, it is **authoritative for this project**. Personal taste only fills the gaps it doesn't specify, and is always overridable by it. Nothing in a client's `DESIGN.md` is ever promoted into the personal profile (enforced by `design-memory`'s Promotion Gate).

## The DESIGN.md Format (the standard)

A `DESIGN.md` has two halves, both required:

### 1. YAML front matter — machine-readable tokens

Enclosed by `---` fences. Supported token fields:

- `name` (required string)
- `version` (optional; current spec version is `alpha`)
- `description` (optional)
- `colors` — named hex values, e.g. `primary: "#1A1C1E"`
- `typography` — named objects with `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `fontFeature`, `fontVariation`
- `spacing` — named dimension scale (`px` / `em` / `rem`)
- `rounded` — named border-radius scale
- `components` — named UI elements with properties like `backgroundColor`, `textColor`, `typography`, `padding`, `rounded`

Components reference other tokens with `"{path.to.token}"` syntax, e.g. `backgroundColor: "{colors.primary}"`.

### 2. Markdown body — human-readable rationale

The required `##` sections, **in this order**:

1. **Overview** — the design philosophy, visual theme, and atmosphere
2. **Colors** — what each colour is called, why it exists, when to use it
3. **Typography** — families, scale, weights, and the rules around them
4. **Layout** — spacing system, grid, density, responsive approach
5. **Elevation & Depth** — shadows, layering, surfaces
6. **Shapes** — radius language, geometry, borders
7. **Components** — patterns for buttons, cards, inputs, navigation, with variants
8. **Do's and Don'ts** — usage guidelines and hard constraints

You may add further `##` sections beyond the required set (e.g. a **Voice & Tone** or **References** section) — Designpowers encourages capturing brand voice this way, since the build reads it too.

### Tooling

The standard ships a CLI (run via `npx`): `lint` (validate structure → JSON findings), `diff` (token-level change detection between two files), `export` (tokens → Tailwind JSON/CSS or W3C DTCG), and `spec` (print the format spec). Use `lint` after authoring and `export` to feed real tokens into the build.

## Reading an Existing DESIGN.md

1. **Check the project root for `DESIGN.md`** at project start (before `design-discovery`). If present, read it fully and load it as the authoritative project taste layer in `design-state.md`, clearly labelled as `DESIGN.md` (project/client), not personal taste.
2. **Pass it to every brand-making agent** — design-lead, content-writer, motion-designer, `design-builder`, `figma-bridge` — as constraints, not suggestions. The token values are used verbatim.
3. **Raise the fidelity bar.** With real tokens specified, the builder assembles from actual values and `figma-bridge` renders on-brand. Use `export` to map tokens into the project's stack (e.g. Tailwind) so the prototype is brand-accurate.
4. **Reconcile with personal taste explicitly.** On conflict, **`DESIGN.md` wins for this project** — and say so: *"Your personal taste leans warm and serif-heavy; this client's DESIGN.md specifies a cool geometric system. I'll follow the client and won't carry it back to your profile."*

## Designpowers' Addition: the Accessibility Overlay

The standard describes brand, not access. Designpowers layers WCAG on top — **accessibility wins over brand**:

- When loading a `DESIGN.md`, **validate its colour pairings against WCAG 2.2 AA** (text/background contrast, state colours). If a brand token can't meet contrast in a given use, flag it and adjust (larger size, weight, or a non-colour cue), then note the deviation to the user.
- Check that the `typography` scale supports 200% zoom and that `components` don't rely on colour alone.
- Record any brand-vs-access tension in `design-state.md`. Never silently ship an inaccessible token just because the brand specified it.

This is the one place Designpowers deliberately goes beyond the raw standard — the file stays fully spec-compliant, but the *build* honours access first.

## Authoring a DESIGN.md

When there's no file and the project would benefit, create one — write it to the project root as `DESIGN.md`:

- **From an existing system:** extract real tokens via `figma-bridge` (`get_variable_defs`, `get_libraries`) or from code/tokens via `token-architecture`, then format as DESIGN.md.
- **From scratch with the client:** run `design-taste` to calibrate, then crystallise the result into a conformant `DESIGN.md`.
- **Validate** with `npx` `lint` before relying on it.
- Capture brand voice in an added **Voice & Tone** section so content-writer builds from it.

## Integration

- **Read at:** project start (before `design-discovery`), and whenever the user references a brand/system or a `DESIGN.md`
- **Authored via:** `design-taste` (from scratch), `figma-bridge` + `token-architecture` (from an existing system)
- **Authoritative over:** personal taste from `design-memory` (for this project only)
- **Subordinate to:** accessibility (WCAG always wins; flag conflicts)
- **Consumed by:** design-lead, content-writer, motion-designer, `design-builder`, `figma-bridge` — as constraints
- **Never writes to:** `~/.designpowers/taste-profile.md` — client taste does not contaminate personal taste (enforced by `design-memory`'s Promotion Gate)
- **Standard:** `google-labs-code/design.md` (Apache-2.0). Designpowers stays format-compatible so files interoperate with Stitch, Cursor, Copilot, and other agents
- **Records to:** `design-state.md` (loaded as the project taste layer, clearly labelled)
