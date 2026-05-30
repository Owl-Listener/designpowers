## Reconciliation Protocol

When reviewers evaluate the same work (typically **accessibility-reviewer**, **design-critic**, and **heuristic-evaluator** running in parallel after **design-builder** completes), their findings may conflict. Resolve conflicts using this protocol:

### Step 1: Dispatch Reviewers in Parallel

```
design-builder finishes
        |
   ┌────┼────────┐
   v    v        v
critic  reviewer  heuristic    (run simultaneously)
   |    |        |
   └────┼────────┘
        v
  reconciliation     (orchestrator resolves conflicts)
        v
  design-builder     (fix round)
        v
  synthetic-user-testing   (validate fixes with persona walkthroughs)
```

### Step 2: Classify Each Finding

Findings now come from three sources (critic, accessibility-reviewer, heuristic-evaluator). Classify all findings regardless of source:

| Category | Definition | Example |
|----------|-----------|---------|
| **Aligned** | Multiple agents flag the same issue | Critic says "missing empty state." Reviewer says "empty state has no screen reader announcement." Heuristic-evaluator says "empty state violates H1 — no system status." Same issue, three angles |
| **Complementary** | Different findings, no conflict | Critic says "colour is off-brand." Reviewer says "touch targets too small." Heuristic-evaluator says "no undo on delete." Fix all |
| **Conflicting** | Agents disagree on what to do | Critic says "add decorative animation for delight." Reviewer says "that animation is a vestibular risk." Heuristic-evaluator says "animation violates H8 — unnecessary element" |

### Step 3: Resolve Conflicts

When findings conflict, apply these rules in order:

1. **Accessibility wins over aesthetics** — if a visual recommendation creates an accessibility issue, the accessibility-reviewer's finding takes priority
2. **Usability wins over style** — if a heuristic violation conflicts with a craft recommendation, fix the usability problem first. A beautiful interface that confuses people has failed
3. **Brief wins over opinion** — if the conflict is about direction, refer to the design brief and principles. The answer that better serves the stated intent wins
4. **Personas break ties** — if the brief does not resolve it, evaluate from each persona's perspective. The option that serves more personas (especially those with the greatest access needs) wins
5. **Escalate to user if unresolvable** — if the rules above do not produce a clear answer, present all findings to the user with the trade-offs and ask them to decide

### Step 4: Create Fix Round

After reconciliation:
1. Compile a single prioritised fix list (critical first)
2. Note which agent sourced each fix and whether any were reconciled
3. Dispatch **design-builder** with the fix list
4. Update `design-state.md` with reconciliation decisions
5. Re-run reviewers ONLY on critical fixes (not the full review)

### Step 5: Synthetic User Testing

After the fix round, run `synthetic-user-testing` to validate the design works for real personas doing real tasks:

1. Walk through every key task as each persona from `inclusive-personas`
2. Test at the persona's actual conditions (zoom level, screen reader, device, emotional state)
3. Produce a barrier matrix showing which personas can/can't complete which tasks
4. Surface any issues the fix round introduced or failed to resolve

**If synthetic testing finds critical issues:**
- Dispatch **design-builder** with the specific persona-task failures
- Re-run synthetic testing on the fixed tasks only (not the full test suite)

**If synthetic testing passes:**
- Results feed directly into `verification-before-shipping` as evidence for the persona walkthrough section
- The verification report can now cite synthetic test results instead of guesswork
