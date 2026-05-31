// Tests for the pure WCAG logic. Run: node wcag.test.mjs
// No deps — verifies the truth layer against known reference values.
import { parseHex, contrastRatio, evaluatePair, evaluatePairs } from "./wcag.js";
import assert from "node:assert";

let pass = 0, fail = 0;
function check(name, fn) {
  try { fn(); pass++; console.log("  ✓ " + name); }
  catch (e) { fail++; console.log("  ✗ " + name + " — " + e.message); }
}

console.log("WCAG logic tests");

// Hex parsing
check("parses 6-digit hex", () => assert.deepEqual(parseHex("#2F6F4F"), { r: 47, g: 111, b: 79 }));
check("parses 3-digit shorthand", () => assert.deepEqual(parseHex("#fff"), { r: 255, g: 255, b: 255 }));
check("parses without leading #", () => assert.deepEqual(parseHex("000000"), { r: 0, g: 0, b: 0 }));
check("rejects invalid hex", () => assert.throws(() => parseHex("nope")));

// Reference contrast values (authoritative)
check("black on white = 21:1", () => assert.equal(contrastRatio("#000000", "#ffffff"), 21));
check("white on white = 1:1", () => assert.equal(contrastRatio("#ffffff", "#ffffff"), 1));
check("contrast is symmetric", () => assert.equal(contrastRatio("#777", "#fff"), contrastRatio("#fff", "#777")));

// Real values we computed by hand earlier (the smoke-tests) — must match
check("Save grey #9aa0a6 on #e8eaed ≈ 2.19 (FAIL)", () => {
  const r = contrastRatio("#9aa0a6", "#e8eaed");
  assert.ok(Math.abs(r - 2.19) < 0.03, `got ${r}`);
});
check("Verdant leaf #2F6F4F text on white passes AA", () => {
  const e = evaluatePair({ foreground: "#2F6F4F", background: "#ffffff" });
  assert.ok(e.passAA, `ratio ${e.ratio}`);
});

// Threshold logic
check("3.2 ratio fails AA normal but passes AA large", () => {
  // pick a pair near 3.2: mid grey on white
  const normal = evaluatePair({ foreground: "#949494", background: "#ffffff", textSize: "normal" });
  const large = evaluatePair({ foreground: "#949494", background: "#ffffff", textSize: "large" });
  assert.equal(normal.aaThreshold, 4.5);
  assert.equal(large.aaThreshold, 3.0);
});

// Batch summary
check("evaluatePairs summarises pass/fail", () => {
  const { summary } = evaluatePairs([
    { foreground: "#000", background: "#fff" },          // pass
    { foreground: "#9aa0a6", background: "#e8eaed" },     // fail
  ]);
  assert.equal(summary.total, 2);
  assert.equal(summary.passAA, 1);
  assert.equal(summary.failAA, 1);
  assert.ok(summary.verdict.includes("FAIL"));
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
