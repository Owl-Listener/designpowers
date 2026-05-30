#!/usr/bin/env bash
# Structural consistency checks for the Designpowers repo.
#
# Catches drift that accumulates as skills/agents are added:
#   1. Orphaned skills   — a skill dir with no trigger reference in the router
#   2. Dead skill refs   — a router *table row* points at a skills/<x> that is missing
#   3. README counts     — "N skills" / "N agents" must match what's on disk
#   4. Agent tallies     — "Agents used/dispatched: [X of N]" must use the real agent count
#
# Exits non-zero on any problem so CI can gate on it. Pure bash + grep.
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ROUTER="$ROOT/skills/using-designpowers/SKILL.md"
README="$ROOT/README.md"
fail=0
note() { echo "  $*"; }

[ -f "$ROUTER" ] || { echo "ERROR: router not found at $ROUTER" >&2; exit 2; }

skill_count=$(find "$ROOT/skills" -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
agent_count=$(find "$ROOT/agents" -maxdepth 1 -name '*.md' | wc -l | tr -d ' ')
echo "Skills on disk: $skill_count   Agents on disk: $agent_count"

# 1. Orphaned skills: every skill (except the router itself) must be
#    referenced as `skill-name` somewhere in the router.
echo ""; echo "[1] Orphaned skills (no router reference):"
orphans=0
for d in "$ROOT"/skills/*/; do
  s=$(basename "$d")
  [ "$s" = "using-designpowers" ] && continue
  grep -q "\`$s\`" "$ROUTER" || { note "ORPHAN: $s"; orphans=1; fail=1; }
done
[ "$orphans" -eq 0 ] && note "none"

# 2. Dead skill refs: in the router's markdown TABLE ROWS (lines starting with
#    "|"), the second column is a backticked skill slug. Verify each exists.
echo ""; echo "[2] Dead skill references in router tables:"
dead=0
while IFS= read -r tok; do
  [ -d "$ROOT/skills/$tok" ] && continue
  note "DEAD REF: router table row references \`$tok\` but skills/$tok is missing"
  dead=1; fail=1
done < <(grep -E '^\| *[A-Za-z].*\| *`[a-z0-9-]+` *\|' "$ROUTER" \
           | grep -oE '`[a-z0-9-]+`' | tr -d '`' | sort -u)
[ "$dead" -eq 0 ] && note "none"

# 3. README count drift
echo ""; echo "[3] README counts:"
if [ -f "$README" ]; then
  readme_skills=$(grep -oiE '\*\*[0-9]+ skills\*\*' "$README" | grep -oE '[0-9]+' | head -1)
  readme_agents=$(grep -oiE '[0-9]+ agents' "$README" | grep -oE '[0-9]+' | head -1)
  if [ -n "${readme_skills:-}" ] && [ "$readme_skills" != "$skill_count" ]; then
    note "MISMATCH: README says $readme_skills skills, disk has $skill_count"; fail=1
  else note "skills: README=${readme_skills:-?} disk=$skill_count OK"; fi
  if [ -n "${readme_agents:-}" ] && [ "$readme_agents" != "$agent_count" ]; then
    note "MISMATCH: README says $readme_agents agents, disk has $agent_count"; fail=1
  else note "agents: README=${readme_agents:-?} disk=$agent_count OK"; fi
else
  note "README not found (skipped)"
fi

# 4. Stale agent tallies. Only lines that explicitly tally agents
#    ("Agents used: [X of N]" / "Agents dispatched: [X of N]") are checked, so
#    unrelated counts like "[X of 3] debt items" or "Persona 2 of 3" are ignored.
echo ""; echo "[4] Agent tallies (Agents used/dispatched: [X of N]):"
bad=0
while IFS= read -r line; do
  n=$(printf '%s' "$line" | grep -oE 'of [0-9]+' | grep -oE '[0-9]+' | head -1)
  [ -n "$n" ] && [ "$n" != "$agent_count" ] && { note "STALE: '$(printf '%s' "$line" | sed 's/^ *//')' (agents=$agent_count)"; bad=1; fail=1; }
done < <(grep -rhiE 'Agents (used|dispatched):? *\[?X? *of [0-9]+' "$ROOT"/skills 2>/dev/null | sort -u)
[ "$bad" -eq 0 ] && note "none"

echo ""
if [ "$fail" -ne 0 ]; then echo "FAIL — consistency problems found (see above)."; exit 1; fi
echo "OK — repo is internally consistent."
