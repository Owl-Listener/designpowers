// Pure WCAG contrast logic — deterministic, zero-dependency, unit-testable.
//
// This is the "truth layer": it computes facts (contrast ratios, pass/fail
// against WCAG 2.2), not judgments. It is intentionally separate from the MCP
// wrapper (server.js) so the math can be verified in CI without any protocol
// or network plumbing. The MCP server is a thin adapter over these functions.

/** Parse a hex colour (#rgb, #rrggbb, with/without #) to {r,g,b} 0-255. */
export function parseHex(hex) {
  if (typeof hex !== "string") throw new Error(`colour must be a string, got ${typeof hex}`);
  let h = hex.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`invalid hex colour: "${hex}"`);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/** sRGB channel (0-255) -> linear value, per WCAG. */
function linearize(channel) {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Relative luminance of a hex colour, per WCAG 2.x. */
export function relativeLuminance(hex) {
  const { r, g, b } = parseHex(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** Contrast ratio between two hex colours (1.0–21.0), rounded to 2 dp. */
export function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
}

/**
 * Evaluate a foreground/background pair against WCAG 2.2 contrast minimums.
 * `textSize`: "normal" (default) or "large" (>=18pt, or >=14pt bold).
 * Large text and UI components use the 3.0 threshold; normal text uses 4.5 (AA)
 * and 7.0 (AAA).
 */
export function evaluatePair({ foreground, background, textSize = "normal", label = "" }) {
  const ratio = contrastRatio(foreground, background);
  const large = textSize === "large";
  const aaThreshold = large ? 3.0 : 4.5;
  const aaaThreshold = large ? 4.5 : 7.0;
  return {
    label,
    foreground,
    background,
    textSize,
    ratio,
    aaThreshold,
    aaaThreshold,
    passAA: ratio >= aaThreshold,
    passAAA: ratio >= aaaThreshold,
  };
}

/** Evaluate many pairs; returns results plus a summary. */
export function evaluatePairs(pairs) {
  const results = pairs.map(evaluatePair);
  const failingAA = results.filter((r) => !r.passAA);
  return {
    results,
    summary: {
      total: results.length,
      passAA: results.filter((r) => r.passAA).length,
      failAA: failingAA.length,
      passAAA: results.filter((r) => r.passAAA).length,
      verdict: failingAA.length === 0 ? "all pairs pass WCAG AA" : `${failingAA.length} pair(s) FAIL WCAG AA`,
    },
  };
}
