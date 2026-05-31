# Designpowers Accessibility MCP tool

The first **truth-layer** tool for Designpowers v2. It computes **WCAG 2.2 colour-contrast facts** — measured ratios and pass/fail — so an agent gets *evidence* instead of estimating contrast from a screenshot.

It speaks the [Model Context Protocol](https://modelcontextprotocol.io), so it works with **any MCP client — Claude and Gemini alike.** The design knowledge stays portable markdown; this supplies the checkable facts.

## Why this exists

Designpowers' workflow is mostly prose an LLM performs. Most of that is *judgment* (taste, craft) and rightly stays prose. But some claims have a **checkable answer** — contrast is the clearest. This tool turns "the reviewer says it's accessible" into "the Save button is 2.19:1 — FAIL AA," with no model guesswork. It's deliberately split into:

- `wcag.js` — pure, zero-dependency WCAG logic (the truth; unit-tested)
- `server.js` — a thin MCP adapter over it (the protocol plumbing)

## Tools

- **`check_contrast`** — one foreground/background pair → ratio + AA/AAA pass/fail. `textSize: "large"` uses the 3.0 threshold (≥18pt, or ≥14pt bold, and UI components).
- **`check_palette`** — many pairs at once (a whole screen or a `DESIGN.md` palette) → per-pair results + a pass/fail summary.

Both return human-readable text **and** `structuredContent` (machine-readable: `ratio`, `passAA`, `passAAA`, thresholds).

## Install

```bash
cd mcp-tools/accessibility
npm install
npm test   # 16 checks: pure WCAG logic + a live MCP round-trip
```

## Wire it into an agent

### Claude Code / Claude Agent SDK
Add to your MCP config (e.g. `.mcp.json` or `claude mcp add`):
```json
{
  "mcpServers": {
    "designpowers-accessibility": {
      "command": "node",
      "args": ["mcp-tools/accessibility/server.js"]
    }
  }
}
```

### Gemini CLI
Gemini CLI also speaks MCP — add the same server to its `settings.json` `mcpServers` block (the command/args are identical). The tool is model-agnostic by construction; nothing in it is Claude-specific.

## Example

```
check_contrast { foreground: "#9aa0a6", background: "#e8eaed", label: "Save button" }
→ Save button: #9aa0a6 on #e8eaed (normal)
  Contrast ratio: 2.19:1
  WCAG AA (>=4.5): FAIL
  Verdict: FAIL (below AA)
```
