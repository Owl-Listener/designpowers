#!/usr/bin/env bash
# Verify the pinned design-library index against the live upstream library.
#
# The pinned index (skills/design-library/library-index.md) is an offline
# snapshot used for browsing without a network call. Upstream
# (VoltAgent/awesome-design-md) adds and removes brands over time, so this
# check flags drift: brands live upstream but missing from our index, or
# slugs in our index that no longer exist upstream.
#
# Exits non-zero on any drift so CI can catch it. Uses a blobless shallow
# clone (no API token, no rate limits, light download).
set -euo pipefail

REPO="https://github.com/VoltAgent/awesome-design-md.git"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
INDEX="$ROOT/skills/design-library/library-index.md"

[ -f "$INDEX" ] || { echo "ERROR: pinned index not found at $INDEX" >&2; exit 2; }

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

echo "Cloning live library (blobless, shallow)…"
git clone --depth 1 --filter=blob:none --quiet "$REPO" "$tmp/lib"

live="$(ls "$tmp/lib/design-md" | sort -u)"
# Pinned slugs: list items of the form  - **Name** · `slug` · description
pinned="$(grep -oE '^- \*\*.+\*\* · `[^`]+`' "$INDEX" | sed -E 's/.*· `([^`]+)`.*/\1/' | sort -u)"

live_count="$(echo "$live" | grep -c . || true)"
pin_count="$(echo "$pinned" | grep -c . || true)"
echo "Live brands: $live_count   Pinned brands: $pin_count"

missing="$(comm -23 <(echo "$live") <(echo "$pinned") || true)"   # upstream, not in index
stale="$(comm -13 <(echo "$live") <(echo "$pinned") || true)"     # index, not upstream

drift=0
if [ -n "$missing" ]; then
  drift=1
  echo ""
  echo "DRIFT — new upstream brands missing from the pinned index:"
  echo "$missing" | sed 's/^/  + /'
fi
if [ -n "$stale" ]; then
  drift=1
  echo ""
  echo "DRIFT — pinned index slugs no longer in the upstream library:"
  echo "$stale" | sed 's/^/  - /'
fi

if [ "$drift" -ne 0 ]; then
  echo ""
  echo "The pinned index has drifted from upstream. Update"
  echo "skills/design-library/library-index.md to match, then re-run this check."
  exit 1
fi

echo "OK — pinned index matches the live library ($live_count brands)."
