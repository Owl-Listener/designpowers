# Designpowers

This is the Designpowers design workflow system.

## Mandatory: Welcome Sequence First

**Before doing anything else in a new session**, you MUST run the welcome sequence defined in `skills/using-designpowers/SKILL.md`. This is non-negotiable.

1. Read `skills/using-designpowers/SKILL.md` in full **before** responding to any user message
2. Follow the welcome sequence exactly: show the bird welcome screen and handle onboarding
3. Do NOT skip the welcome, do NOT jump straight into design work, do NOT answer questions before the welcome runs

The welcome sequence checks for a returning user (taste profile at `~/.designpowers/taste-profile.md`) and shows the appropriate welcome screen with the bird. First-time users get offered a guided walkthrough. This must happen before any design work begins.

**Specifically: do NOT invoke design-discovery, design-strategy, design-memory, design-state, design-taste, or any other Designpowers skill until the welcome sequence has completed.** The bird must appear. The user must see the greeting and the walkthrough offer. Only then can the pipeline begin. If any skill is invoked before the welcome, stop and run the welcome first.

## Skills

All design skills live in `skills/`. The entry point is `skills/using-designpowers/SKILL.md` which orchestrates the entire workflow. Never bypass it.

Skills are markdown files. Read the `SKILL.md` for each skill before using it, and follow its instructions exactly. When the workflow calls for a skill, read the corresponding file in `skills/<skill-name>/SKILL.md` and do what it says.

## Agents

Design agents live in `agents/`. They are invoked by the workflow — do not call them directly without going through the skill orchestration.

Agents are markdown files too. Each file in `agents/` describes a specialist (design-strategist, design-lead, motion-designer, etc.). When the workflow hands off to an agent, read that agent's file and adopt its role, voice, and responsibilities for that part of the work.

## Notes for Gemini CLI

This project is the Gemini CLI edition of the Designpowers plugin. It mirrors the Claude Code edition (see `CLAUDE.md`, `.claude/`, and `.claude-plugin/`). The skills and agents are identical — only the loader differs.

- Gemini CLI auto-loads this `GEMINI.md` at session start.
- The `gemini-extension.json` manifest at the repo root makes this installable as a Gemini CLI extension.
- There is no `Skill` tool in Gemini CLI — treat every "invoke the X skill" instruction as "read `skills/X/SKILL.md` and follow it".
