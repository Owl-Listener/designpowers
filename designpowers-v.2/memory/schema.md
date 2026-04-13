# Designpowers v2 Memory Schema

This folder (`memory/`) is exclusively managed by the **Design Ops** agent. Other agents are **forbidden** from writing to files in this directory directly. This ensures shared context remains clean and structured.

## 1. Taste Profile (`taste.md`)
Stores aesthetic preferences learned across multiple sessions.
- **Strong Opinions:** Confirmed by the user over 2+ projects.
- **Anti-Patterns:** Directions explicitly rejected by the user.
- **Inspiration References:** Curated benchmarks (e.g., "Feels calm like Open Breathwork").

## 2. Decisions Log (`decisions.md`)
A sequential ledger of key choices made during the current sprint.
- **Agent Debates:** When UI and UX designers disagree, the debate outcome is recorded here.
- **Quality Gate Overrides:** Notes when the Design Lead rejects an intermediate design.

## 3. Technical & Design Debt (`debt.md`)
Compromises made to hit a deadline.
- **Accessibility Deficits:** Must be explicitly acknowledged by the user before shipping.
- **Future Polish:** Micro-animations or advanced interactions deferred to a later release.
