---
name: moodboard-creator
description: Use when the user shares a Pinterest board URL and wants its images in Figma — captures every pin on the board through the user's Chrome session, then places the images in a masonry auto-layout frame in a Figma file. Also use when inspiration-scouting receives a Pinterest board as reference material
argument-hint: <pinterest-board-url> [figma-url | new]
---

# Moodboard Creator

A Pinterest board is where a lot of designers collect their references. This skill brings a board into Figma as a working mood board: every pin, at full resolution, in a masonry auto-layout frame that keeps each image's proportions and the board's order.

The images belong to other people. This skill is for internal reference only — never for publishing, client deliverables, or anything that passes the images off as original work.

## When to Use

- The user pastes a Pinterest board URL (`pinterest.com/<user>/<board>/`) and asks to get it into Figma
- `inspiration-scouting` receives a Pinterest board as the user's own reference material
- The user says "pull my Pinterest board into Figma", "make a mood board from this board", or similar

## Do Not Use When

- The URL is a single pin, a search results page, or a profile — ask for the board URL instead
- The user wants the references curated or annotated — run `inspiration-scouting` after this skill, on the frame it produces
- The destination is not Figma (local folder, FigJam sticky wall, slides) — ask what they need

## Requirements

- **Claude in Chrome** (`mcp__claude-in-chrome__*`), signed in to Pinterest in the user's Chrome. This is what makes secret and private boards work. If Chrome is not connected, stop and tell the user. Do not fall back to the built-in browser without asking — it is signed out and only sees public boards.
- **Figma MCP** (`use_figma`, `upload_assets`). Load the `figma-use` skill before the first `use_figma` call.
- A scratch directory for downloads (the session's scratchpad, or `$TMPDIR` if there is none).

## Process

### Step 1: Confirm the Inputs

Read the inputs from the arguments first. The skill is usually run as:

```
/moodboard-creator <pinterest-board-url> [<figma-url> | new]
```

- Accept the two URLs in either order. Tell them apart by host: `pinterest.*` (any country domain, e.g. `au.pinterest.com`) is the board; `figma.com/design/...` is the destination. The word `new` means create a new file.
- If the Figma URL has a `node-id`, that node (usually a page) is the target. Without one, use the file's current page.
- A `figma.com/board/...` (FigJam) or `/slides/...` link is not a design file — say so and ask for a design file instead.
- Anything else in the arguments (e.g. "10 columns", "group by colour") sets the matching option below.

Then ask only for what is still missing, in one message:

```
BOARD:   [Pinterest board URL]
FIGMA:   [Figma design file URL — or "new file"]
COLUMNS: [default: chosen from pin count — see Step 5]
ORDER:   [board order (default) — or grouped by colour and tone]
```

If the board has **sections**, ask whether to include them. Section pins live at `<board-url>/<section-slug>/` and are captured the same way, one section at a time, in board order.

### Step 2: Capture the Pin Image URLs

Open the board in Chrome (`tabs_context_mcp`, then `navigate`). Take a screenshot to confirm the board loaded and you are signed in, and read the pin count from the board header ("N Pins").

Pinterest virtualises the grid — pins scrolled off-screen are removed from the page. URLs must be collected **while scrolling**, not read once at the end.

**Scroll with the mouse wheel, not with JavaScript.** `window.scrollBy()` moves the page but does not trigger Pinterest's lazy loading — the board stops growing after the first screenful. Use `computer` `scroll` actions between collection calls.

First, install the collector with `javascript_tool`:

```js
window.__dpPins ??= new Map();
window.__dpCollect = () => {
  const more = [...document.querySelectorAll('h2, h3')]
    .find(h => /more ideas|more like this/i.test(h.textContent));
  document.querySelectorAll('[data-test-id="pin"], [data-grid-item="true"]').forEach(pin => {
    if (more && !(more.compareDocumentPosition(pin) & Node.DOCUMENT_POSITION_PRECEDING)) return;
    const img = pin.querySelector('img[src*="i.pinimg.com"]');
    const link = pin.querySelector('a[href*="/pin/"]');
    if (!img || !link) return;
    const id = link.getAttribute('href').match(/\/pin\/(\d+)/)?.[1];
    if (!id || window.__dpPins.has(id)) return;
    const c = (img.srcset || '').split(',').map(s => s.trim().split(' ')[0]).filter(Boolean);
    const src = c.find(u => u.includes('/originals/')) || c.at(-1) || img.src;
    window.__dpPins.set(id, { id, order: window.__dpPins.size, src });
  });
  return { collected: window.__dpPins.size, moreVisible: !!(more && more.getBoundingClientRect().top < innerHeight) };
};
window.__dpCollect()
```

Then, in one `browser_batch`, repeat this triple 4–5 times: `computer` scroll down 5 ticks over the grid → `computer` wait 1.5s → `javascript_tool` `window.__dpCollect()`. Run further batches until `collected` stops rising for two rounds or `moreVisible` is true.

Check the count:

- **Collected = board count** — continue.
- **Collected < board count** — scroll back to the top and run the batches again (the Map keeps what you already have). Some pins are video-only or removed and never render an image; if the gap stays the same after two passes, report the missing number and continue.
- **Collected > board count** — "More ideas" pins got through. Trim to the first N by `order` and tell the user.

**Read the list out in chunks of 10.** `javascript_tool` results are truncated at roughly 1,000 characters, so a full dump loses most of the board. Strip the common host to keep each line short:

```js
window.__dpList ??= [...window.__dpPins.values()].sort((a, b) => a.order - b.order);
window.__dpList.slice(0, 10).map(p => p.id + ' ' + p.src.replace('https://i.pinimg.com/', '')).join('\n')
```

Run every chunk (`slice(0,10)`, `slice(10,20)`, …) in a single `browser_batch`, then write the combined list to `list.txt` in the scratch folder. Do not try the clipboard instead — `navigator.clipboard` from the page hangs the tab.

**Verify the transcription.** On a large board, copying hundreds of lines out of tool results is where typos creep in. In the same batch, have the page compute a checksum of the exact text you will write:

```js
const t = window.__dpList.map(p => p.id + ' ' + p.src.replace('https://i.pinimg.com/', '')).join('\n') + '\n';
let s = 0; for (let i = 0; i < t.length; i++) s = (s * 31 + t.charCodeAt(i)) % 1000000007;
({ len: t.length, sum: s })
```

Then compute the same over `list.txt` with Python (`for ch in text: s = (s*31 + ord(ch)) % 1000000007`). Length and sum must both match before you download anything.

Two things that look like problems but are not:

- Video pins have a thumbnail path (`videos/thumbnails/originals/…`) instead of an image path. They download fine and show as their poster frame.
- Below the board, Pinterest shows a "Find some ideas for this board" carousel. Those items are not `/pin/` links, so the collector never picks them up.

The selectors above match Pinterest's markup at the time of writing. If a run collects 0 pins on a board that visibly has pins, inspect one pin with `read_page` and update the selectors — do not guess.

### Step 3: Download the Images

For each pin, build the full-resolution URL. Pinterest image URLs follow the pattern `https://i.pinimg.com/<size>/<aa>/<bb>/<cc>/<hash>.<ext>`:

1. Try `/originals/` in place of the size segment.
2. If that returns 403/404 (the original often has a different extension), try `/736x/` with the same path.
3. If an original is over 10 MB (the Figma upload limit), use `/736x/` instead. Animated GIFs and very large PNGs are the usual culprits — and the 736px version is always served as **`.jpg`**, whatever the original format (`736x/<path>/<hash>.jpg`). Figma shows image fills as a still frame anyway.

Download with numbered filenames so board order survives. Do not name a shell variable `path` — in zsh it is tied to `PATH`, and every command after it fails with "command not found":

```bash
cd "$SCRATCH/pinterest-<board-slug>"
n=0
while read id src; do
  n=$((n+1)); out="$(printf %03d $n)-$id.${src##*.}"
  curl -sfL -o "$out" "https://i.pinimg.com/$src" \
    || curl -sfL -o "$out" "https://i.pinimg.com/${src/originals\//736x/}" \
    || echo "FAILED $n $src"
done < list.txt
find . -size +10M
ls [0-9][0-9][0-9]-* | wc -l
```

Count files with `[0-9][0-9][0-9]-*`, not `0*` — past pin 99 the filenames start with `1` or `2`, and a `0*` glob silently undercounts. For boards over ~100 pins, run the `curl` calls in the background, about 12 at a time.

Then read each image's real dimensions (macOS):

```bash
sips -g pixelWidth -g pixelHeight "$SCRATCH/pinterest-<board-slug>/"*
```

Check the actual file type (`file <path>`) rather than trusting the extension — the `Content-Type` sent to Figma in Step 6 must match it. Supported: PNG, JPEG, GIF, WebP.

### Step 4: Resolve the Figma Target

- **Existing file:** extract the `fileKey` (and `node-id` if given) from the URL.
- **New file:** load `figma-create-new-file`, call `whoami` for the plan key (ask if there is more than one plan), and create a design file named after the board.

Inspect the file with `use_figma` before building:

- Which page to use (the page in the URL, or the current page).
- Where existing content ends, so the new frame is placed to the right of it rather than on top.
- Whether the file defines **spacing variables**. Prefer a semantic gap token if one fits; otherwise bind to the spacing primitive closest to 16 (e.g. `Spacing/16`). Page-layout tokens (margins, gutters for web layouts) are not the right fit. If there are no spacing variables at all, stop and tell the user the gap/padding values would be hard-coded, and ask whether to go ahead. Do not invent tokens.

### Step 5: Build the Masonry Frame

Choose the column count from the number of pins unless the user gave one:

| Pins | Columns |
|------|---------|
| 1–8 | 3 |
| 9–30 | 4 |
| 31–100 | 5 |
| 101+ | 10 — at 5 columns a 250-pin board is ~16,000px tall; offer 8 or 10 |

Structure (one `use_figma` call):

```
[Board name]                       ← horizontal auto-layout, hug both axes, no fill
├── Column 1                       ← vertical auto-layout, fixed width, hug height, no fill
│   ├── Pin 001 · <pin-id>         ← rectangle, width = column width, height = width × h / w
│   └── ...
├── Column 2
└── ...
```

- Column width: 240 px. Gap between columns and between images: the spacing variable from Step 4.
- Place pins in board order, each one into the **currently shortest** column. This is how Pinterest builds its own grid, and it keeps the board order readable left to right.
- Rectangles have no fill until the image arrives. Name each one `Pin <nnn> · <pin-id>` so every image can be traced back to its source pin.
- After building, read the rectangles back and return `<pin number>:<node id>` for each (parse the number from the layer name). Rectangle IDs are not sequential once there are several columns or groups, so map files to slots by pin number, never by creation order.

Do not use `createImageAsync` — it is not supported through the Figma MCP.

#### Optional: group by colour and tone

When the user asks for it, measure each image's average colour and group before building. No extra libraries are needed on macOS — `sips` shrinks each image to a 24×24 BMP, and Python's standard library can read BMP pixels:

```bash
sips -s format bmp -z 24 24 "$f" --out "bmp/${f%.*}.bmp"
```

Parse the BMP (pixel offset at byte 10, width/height at 18, bits per pixel at 28; rows are padded to 4 bytes and stored bottom-up), convert each pixel from sRGB to CIE Lab, and average L, a and b. Chroma is `hypot(a, b)` and hue is `atan2(b, a)` in degrees.

Groups, in this order, each sorted light to dark by L:

| Group | Rule |
|-------|------|
| Light neutrals | chroma < 7, L ≥ 65 |
| Sand & gold | hue 60–100° |
| Terracotta & brown | hue 30–60° |
| Reds & burgundy | hue ≥ 330° or < 30° |
| Greens | hue 100–200° |
| Blues & violets | hue 200–330° |
| Mid greys | chroma < 7, 30 ≤ L < 65 |
| Charcoal & black | chroma < 7, L < 30 |

Build each group as its own masonry block — a horizontal auto-layout of the columns, named after the group — and stack the blocks in a vertical auto-layout with a larger gap between groups than between images, so the groups read as separate. Keep the original board number in each layer name.

Average colour is a blunt measure: a small bright mark on a large grey background reads as grey. Tell the user this, and that misplaced images can be dragged between groups.

### Step 6: Upload the Images

Call `upload_assets` with:

- `fileKey`
- `count`: up to 60
- `nodeIds`: the rectangle IDs for those pins, in the same order
- `scaleMode`: `FILL` (rectangles already match the images' proportions, so nothing is cropped)

Each returned upload carries a `targetNodeId`. Pair every URL with its file **through that node ID** (node → pin number → file), not by position, and write `<node id> <upload uuid>` lines. Then POST them in parallel (10 at a time), with the MIME type read from the file, and check each response:

```python
# node2file.json maps node id -> filename, built from the Step 5 read-back
url = f'https://mcp.figma.com/mcp/upload/{uuid}/submit?scaleMode=FILL&currentPageId={page}'
# curl -X POST -H "Content-Type: <mime>" --data-binary @<file> <url>
# response JSON: {"success": true, "placedOnNodeId": "<node id>", ...}
```

Treat an upload as done only when the status is 200 **and** `placedOnNodeId` equals the node you meant. Pairing by node ID and checking the response means a typo in a transcribed URL fails loudly instead of putting an image in the wrong slot.

Send **raw bytes**, not multipart. A multipart upload renames the layer to the filename, which overwrites the `Pin <nnn> · <pin-id>` names. Each URL is single-use and expires after 10 minutes.

Every returned URL must be POSTed before the next `upload_assets` call. Repeat in batches of 60 until all pins are uploaded.

### Step 7: Verify, Then Clean Up

1. Take a `get_screenshot` of the frame and check that no rectangle is still empty and the columns look balanced.
2. Check with `use_figma` that every rectangle has an `IMAGE` fill. Retry any that do not, once.
3. Only once that passes, delete the scratch folder:

```bash
rm -rf "$SCRATCH/pinterest-<board-slug>"
```

### Step 8: Report

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BOARD IMPORTED
  [Board name] → [Figma file name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Pins on board:   [N]
  Placed in Figma: [N]  ([n] at original size, [n] at 736px)
  Skipped:         [n] — [reason: video pin / removed / download failed]
  Layout:          [c] masonry columns, [w]px wide

  [Figma link to the frame]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Want me to run inspiration-scouting on this
  board — what to take, what to leave?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Never report a count you have not verified in Step 7.

## Integration

- **Called by:** `using-designpowers` (when the user shares a Pinterest board), `inspiration-scouting` (when the user's references live on Pinterest)
- **Hands off to:** `inspiration-scouting` (to curate the imported board), `design-taste` (the board is a strong taste signal)
- **Pairs with:** `design-memory` — what the user pins is a taste data point worth recording

## Anti-Patterns

| Pattern | Why It Fails |
|---------|-------------|
| Reading the pins once after scrolling to the bottom | Pinterest removes off-screen pins from the page — you get only the last screenful |
| Including "More ideas" pins | Those are Pinterest's recommendations, not the user's choices — they pollute the taste signal |
| Using thumbnail URLs (`/236x/`) | Blurry in Figma at any useful size |
| Uniform cropped cells | Crops out the very detail the user pinned it for. Masonry keeps the proportions |
| Hard-coding gaps when the file has spacing variables | Breaks the design system contract — bind to tokens |
| Reporting success without checking the fills | Uploads can fail quietly — verify before claiming done |
| Deleting the downloads before verifying | Leaves nothing to retry with |
| Using the images outside internal reference | They are other people's work |
