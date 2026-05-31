#!/usr/bin/env node
// Designpowers accessibility MCP server.
//
// A thin protocol adapter over the pure WCAG logic in wcag.js. It exposes the
// deterministic contrast checks as MCP tools so any MCP-speaking agent — Claude
// or Gemini — can get *evidence* (measured ratios, pass/fail) instead of
// guessing contrast from a screenshot.
//
// This is Designpowers v2's first "truth layer" tool: the design process stays
// model-agnostic markdown, the checkable facts come from real code.
//
// Run: node server.js   (communicates over stdio per the MCP spec)
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { contrastRatio, evaluatePair, evaluatePairs } from "./wcag.js";

const server = new McpServer({
  name: "designpowers-accessibility",
  version: "0.1.0",
});

// --- Tool 1: check a single foreground/background pair ---
server.registerTool(
  "check_contrast",
  {
    title: "Check colour contrast (WCAG 2.2)",
    description:
      "Compute the contrast ratio between a foreground and background colour and " +
      "report pass/fail against WCAG 2.2 AA and AAA. Use this instead of estimating " +
      "contrast from a screenshot — it returns measured evidence. textSize 'large' " +
      "(>=18pt or >=14pt bold) and UI components use the 3.0 threshold.",
    inputSchema: {
      foreground: z.string().describe('Foreground/text hex colour, e.g. "#1d2430"'),
      background: z.string().describe('Background hex colour, e.g. "#ffffff"'),
      textSize: z.enum(["normal", "large"]).default("normal").describe("normal = body text (AA 4.5); large = >=18pt or >=14pt bold, and UI components (AA 3.0)"),
      label: z.string().optional().describe("Optional label for what this pair is, e.g. 'primary button'"),
    },
  },
  async ({ foreground, background, textSize, label }) => {
    const r = evaluatePair({ foreground, background, textSize, label: label || "" });
    const verdict = r.passAAA ? "PASS (AAA)" : r.passAA ? "PASS (AA)" : "FAIL (below AA)";
    const text =
      `${label ? label + ": " : ""}${foreground} on ${background} (${textSize})\n` +
      `Contrast ratio: ${r.ratio}:1\n` +
      `WCAG AA (>=${r.aaThreshold}): ${r.passAA ? "PASS" : "FAIL"}\n` +
      `WCAG AAA (>=${r.aaaThreshold}): ${r.passAAA ? "PASS" : "FAIL"}\n` +
      `Verdict: ${verdict}`;
    return {
      content: [{ type: "text", text }],
      structuredContent: r,
      isError: false,
    };
  }
);

// --- Tool 2: check many pairs at once (a whole palette/screen) ---
server.registerTool(
  "check_palette",
  {
    title: "Check many contrast pairs (WCAG 2.2)",
    description:
      "Evaluate a list of foreground/background pairs at once — e.g. every text/surface " +
      "combination on a screen or in a DESIGN.md palette. Returns each result plus a " +
      "summary of how many pass/fail WCAG AA.",
    inputSchema: {
      pairs: z
        .array(
          z.object({
            foreground: z.string(),
            background: z.string(),
            textSize: z.enum(["normal", "large"]).default("normal"),
            label: z.string().optional(),
          })
        )
        .describe("List of colour pairs to check"),
    },
  },
  async ({ pairs }) => {
    const { results, summary } = evaluatePairs(pairs);
    const lines = results.map((r) => {
      const v = r.passAAA ? "AAA" : r.passAA ? "AA" : "FAIL";
      return `  ${(r.label || `${r.foreground} on ${r.background}`).padEnd(34)} ${String(r.ratio).padStart(6)}:1  ${v}`;
    });
    const text = `Checked ${summary.total} pair(s) — ${summary.verdict}\n` + lines.join("\n");
    return {
      content: [{ type: "text", text }],
      structuredContent: { results, summary },
      isError: false,
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
// stderr is safe for logs (stdout is the MCP channel)
console.error("designpowers-accessibility MCP server running on stdio");
