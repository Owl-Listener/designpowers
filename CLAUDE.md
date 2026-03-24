# Designpowers

This is the Designpowers design workflow system.

## Mandatory: Welcome Sequence First

**Before doing anything else in a new session**, you MUST run the welcome sequence defined in `skills/using-designpowers/SKILL.md`. This is non-negotiable.

1. Invoke the `using-designpowers` skill using the Skill tool **before** responding to any user message
2. The skill will show the bird welcome screen and handle onboarding
3. Do NOT skip the welcome, do NOT jump straight into design work, do NOT answer questions before the welcome runs

The welcome sequence checks for a returning user (taste profile at `~/.designpowers/taste-profile.md`) and shows the appropriate welcome screen with the bird. First-time users get offered a guided walkthrough. This must happen before any design work begins.

## Skills

All design skills live in `skills/`. The entry point is `skills/using-designpowers/SKILL.md` which orchestrates the entire workflow. Never bypass it.

## Agents

Design agents live in `agents/`. They are invoked by the workflow — do not call them directly without going through the skill orchestration.
