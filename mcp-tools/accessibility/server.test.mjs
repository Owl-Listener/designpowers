// End-to-end MCP smoke test: launches server.js over stdio via a real MCP
// client, lists tools, and calls them — proving the server actually speaks the
// protocol, not just that the file parses. Run: node server.test.mjs
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import assert from "node:assert";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
let pass = 0, fail = 0;
const ok = (n) => { pass++; console.log("  ✓ " + n); };
const no = (n, e) => { fail++; console.log("  ✗ " + n + " — " + e.message); };

const transport = new StdioClientTransport({
  command: process.execPath,
  args: [join(here, "server.js")],
});
const client = new Client({ name: "test", version: "0.0.0" });

console.log("MCP server e2e tests");
try {
  await client.connect(transport);
  ok("server connects over stdio");

  const { tools } = await client.listTools();
  const names = tools.map((t) => t.name).sort();
  try { assert.deepEqual(names, ["check_contrast", "check_palette"]); ok("advertises check_contrast + check_palette"); }
  catch (e) { no("advertises expected tools", e); }

  // check_contrast on a known failing pair
  try {
    const res = await client.callTool({
      name: "check_contrast",
      arguments: { foreground: "#9aa0a6", background: "#e8eaed", label: "Save button" },
    });
    const sc = res.structuredContent;
    assert.ok(Math.abs(sc.ratio - 2.19) < 0.03, `ratio ${sc.ratio}`);
    assert.equal(sc.passAA, false);
    assert.match(res.content[0].text, /FAIL/);
    ok("check_contrast returns measured ratio + FAIL for low-contrast pair");
  } catch (e) { no("check_contrast works", e); }

  // check_contrast on a known passing pair
  try {
    const res = await client.callTool({
      name: "check_contrast",
      arguments: { foreground: "#000000", background: "#ffffff" },
    });
    assert.equal(res.structuredContent.ratio, 21);
    assert.equal(res.structuredContent.passAAA, true);
    ok("check_contrast: black on white = 21, AAA");
  } catch (e) { no("check_contrast passing pair", e); }

  // check_palette batch
  try {
    const res = await client.callTool({
      name: "check_palette",
      arguments: { pairs: [
        { foreground: "#000", background: "#fff", label: "body" },
        { foreground: "#9aa0a6", background: "#e8eaed", label: "save" },
      ] },
    });
    assert.equal(res.structuredContent.summary.total, 2);
    assert.equal(res.structuredContent.summary.failAA, 1);
    ok("check_palette summarises a multi-pair check");
  } catch (e) { no("check_palette works", e); }
} catch (e) {
  no("server connection", e);
} finally {
  await client.close().catch(() => {});
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
