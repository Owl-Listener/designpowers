---
name: "Template: On-Demand Design Skill"
description: "A loadable module demonstrating how stateless agents consume specific design knowledge when needed."
---

# Design Knowledge: Dynamic Skill Usage

## When to Load
An agent should only load this file if the current task explicitly requires this specific domain (e.g., motion curves, advanced accessibility roles, or voice-and-tone guides).

## Core Instructions
1. Read the rules below carefully.
2. Apply the constraints to your immediate task output.
3. Unload this skill from your context once the turn is over.

## Example Domain: Smooth Motion Curves
- Use `cubic-bezier(0.2, 0.8, 0.2, 1)` for UI elements entering the screen (decelerating).
- Use `cubic-bezier(0.4, 0, 1, 1)` for UI elements leaving the screen (accelerating).
