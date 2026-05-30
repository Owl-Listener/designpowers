---
name: figma-bridge
description: Use to turn Designpowers' markdown specs into something a designer can actually SEE and manipulate, and to pull existing Figma work back in. Bridges in both directions — push design-lead's visual decisions or built code into real Figma frames (code-to-design), and pull a Figma file in for review or as a design-system source (design-to-code). Falls back to a clickable HTML prototype when Figma isn't available. Invoke at the screenshot checkpoint, at handoff, when reviewing a Figma link, or whenever the user says "show me", "put this in Figma", or "make it real"
---

# Figma Bridge

Designpowers produces excellent *specifications* — briefs, principles, layout decisions, token systems, copy. But designers think visually, and a spec is not a thing you can look at and feel. This skill closes the loop: it turns the team's decisions into a **visual artefact** the designer can see and manipulate, and it pulls existing visual work back into the workflow.

It bridges both directions:

- **Code/spec → design** ("make it real"): push design-lead's visual decisions, the design system, or the built code into real Figma frames
- **Design → code/spec** ("read this in"): pull an existing Figma file in as the artefact for `design-review`, or as the source for `token-architecture` / `design-system-alignment`

When Figma isn't available, it degrades gracefully to a **clickable HTML prototype** — no designer is left without something to look at.

## When to Use

- **At the screenshot checkpoint** (after `design-builder`) — give the designer a manipulable artefact, not just a screenshot of code
- **At handoff** — sync the final design into Figma so engineering and design share one source
- **In `design-review`** — when the artefact to review is a Figma file or link, pull it in here
- **As a design-system source** — when the user has a Figma library, extract its tokens/components to seed `token-architecture` and `design-system-alignment`
- **On request** — "show me", "put this in Figma", "can I see it", "make it real"

## Prerequisite: Detect Figma Availability

Check whether the Figma MCP tools are available in this environment (tools named `get_design_context`, `get_screenshot`, `use_figma`, `create_new_file`, `generate_figma_design`, etc.).

- **If available:** use the Figma direction below.
- **If not available:** skip to the **HTML Prototype Fallback**. Do not block the workflow waiting for Figma.

> ⚠️ **Mandatory before any Figma *write*:** load Figma's own usage guidance first — invoke the `/figma-use` skill if present, otherwise read the `skill://figma/figma-use/SKILL.md` MCP resource. Writing to Figma via `use_figma` without it causes common, hard-to-debug failures. The same applies to `/figma-generate-design` (capturing a web view), `/figma-generate-library` (building a design system in Figma), and `/figma-code-connect` (mapping components). This skill orchestrates *when* to bridge; those Figma skills govern *how* to write.

## Direction A: Spec/Code → Figma (make it real)

Turn what the team designed into frames the designer can manipulate.

### A1. Assemble the visual source of truth

Gather from `design-state.md` and the build:
- **design-lead's** layout, colour, typography, and component decisions
- The **token system** (from `token-architecture` / `design-system-alignment`) — these become Figma variables/styles
- The **content-writer's** exact strings — use them verbatim, never lorem ipsum or rewrites
- The **built code**, if `design-builder` has run

### A2. Choose the right tool

| Situation | Tool | Notes |
|-----------|------|-------|
| Building a screen from scratch / from spec / from intent | `use_figma` | The default for all Figma writes. Build from design-system components where they exist |
| Capturing an existing **running web view** into Figma for the first time | `generate_figma_design` **+** `use_figma` in parallel | `generate_figma_design` grabs a pixel-perfect screenshot; `use_figma` rebuilds it from real components; refine against the screenshot |
| A brand-new file is needed | `create_new_file` | Then `use_figma` to populate it |
| Pushing the **token system** into Figma | `use_figma` | Create variables/styles first, then build components that reference them — so the designer can re-theme |

Always build from the design system's tokens and components when they exist, so the result is editable and on-system — not a flat picture.

### A3. Reconnect (optional but recommended)

If the project has real code components, map them to the Figma components via **Code Connect** (`/figma-code-connect`, `add_code_connect_map`) so design and code stay linked for the next round.

### A4. Show and hand back

Screenshot the result (`get_screenshot`), show it to the designer, and record the Figma file key/URL in `design-state.md`. The designer can now manipulate it directly — and any changes they make can be pulled back via Direction B.

## Direction B: Figma → Spec/Code (read it in)

Pull existing Figma work into the workflow.

### B1. Get a node-specific URL

The design-to-code tools need a node id. If the user gives a bare file URL, ask for a URL with `?node-id=…` (or a specific frame selection). Extract `fileKey` and `nodeId` from the URL.

### B2. Pull context

- `get_design_context` — reference code + screenshot + metadata for the node (the primary design-to-code call)
- `get_screenshot` — visual only, when you just need to see it (e.g., feeding `design-review`)
- `get_metadata` — structure/layer tree for large files
- `get_variable_defs` / `get_libraries` — extract tokens and library structure when seeding a design system

### B3. Route the result

- **For review:** hand the screenshot + context to `design-review` as the artefact
- **For a design-system source:** feed variables and components into `token-architecture` and `design-system-alignment`
- **For a build:** adapt the reference code to the project's stack via `design-builder` — adapt, don't paste; the returned code is reference, not production

## HTML Prototype Fallback (no Figma)

When Figma tooling isn't available, produce a **single self-contained, clickable HTML prototype** so the designer still gets something real to look at and click through:

1. Build one HTML file using the team's **tokens** (as CSS custom properties), the **content-writer's exact copy**, and design-lead's layout decisions
2. Make the key task from the brief actually clickable — real states, not a flat mock
3. Keep it accessible by construction — semantic HTML, visible focus, contrast that meets AA, `prefers-reduced-motion` honoured (this is Designpowers; the prototype is not exempt)
4. Open/screenshot it and show the designer; save it alongside `design-state.md`

This is a viewing-and-feedback artefact, not the shipping build — but it's real enough to react to, which is the whole point.

## Rules

1. **Never fabricate content.** Use the content-writer's strings. If none exist, mark placeholders clearly for content review.
2. **Build on-system.** Use tokens and components so the artefact is editable, not a flattened picture.
3. **Accessibility carries over.** Whatever you produce — Figma frames or HTML — meets the same inclusive standard as the rest of the pipeline. A visual artefact is not an excuse to drop AA.
4. **Record the link.** Always write the Figma file key/URL or prototype path into `design-state.md` so the team and the next session can find it.
5. **Adapt, don't paste.** Code returned from `get_design_context` is reference; fit it to the project's stack and standards.

## Integration

- **Invoked at:** the Screenshot Checkpoint and Handoff in `using-designpowers`; from `design-review` (Figma artefacts); on user request
- **Reads from:** `design-state.md`, design-lead decisions, `token-architecture`, content-writer output, `design-builder` code
- **Uses:** the Figma MCP tools (gated by `/figma-use` and the other Figma skills) when available; HTML fallback otherwise
- **Feeds:** `design-review` (artefact), `design-system-alignment` / `token-architecture` (extracted tokens), `design-builder` (reference code)
- **Records to:** `design-state.md` (artefact link/path)
