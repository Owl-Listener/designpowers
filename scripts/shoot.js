// Render an HTML file to a PNG with headless Chromium (Playwright).
// Used to produce screenshot-checkpoint images and example artifacts.
//   node scripts/shoot.js <input.html> <output.png> [width] [height]
const { chromium } = require("playwright");

(async () => {
  const [, , input, output, w = "900", h = "760"] = process.argv;
  if (!input || !output) {
    console.error("usage: node scripts/shoot.js <input.html> <output.png> [width] [height]");
    process.exit(2);
  }
  const path = require("path");
  const fileUrl = "file://" + path.resolve(input);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: parseInt(w, 10), height: parseInt(h, 10) },
    deviceScaleFactor: 2,
  });
  await page.goto(fileUrl);
  await page.screenshot({ path: output });
  await browser.close();
  console.log("wrote " + output);
})();
