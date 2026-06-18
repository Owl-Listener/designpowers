/**
 * manifest.ts — fetch + validate a passport.md file.
 *
 * A passport.md is markdown with a YAML frontmatter block:
 *
 *   ---
 *   name: Marie-Claire Dean
 *   version: 1.0
 *   updated: 2026-06-16
 *   skills:
 *     - name: Design Critique
 *       description: How I like to give and receive design feedback
 *       file: https://raw.githubusercontent.com/.../design-critique.md
 *   ---
 *
 * This module fetches that file over HTTPS, parses the frontmatter, and
 * validates its shape. Validation is deliberately strict and returns
 * friendly errors, because this is the one moment we get to catch a
 * malformed passport before a user pastes their one-liner everywhere.
 */

import yaml from "js-yaml";

export interface Skill {
  name: string;
  description: string;
  file: string;
}

export interface Manifest {
  name: string;
  version: string;
  updated?: string;
  skills: Skill[];
}

export type ManifestResult =
  | { ok: true; manifest: Manifest }
  | { ok: false; error: string };

/** Hard cap on response size — a manifest should be a few KB, not megabytes. */
const MAX_BYTES = 256 * 1024;
const FETCH_TIMEOUT_MS = 8000;

/**
 * Validate that a string is a usable https:// URL. We refuse http:// and
 * anything exotic — manifests and skill files are always fetched over TLS.
 */
export function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Pull the YAML frontmatter out of a markdown document. Returns the raw
 * YAML string between the leading `---` fences, or null if absent.
 */
function extractFrontmatter(source: string): string | null {
  // Allow an optional BOM / leading whitespace before the first fence.
  const match = source.match(/^﻿?\s*---\s*\n([\s\S]*?)\n---/);
  return match ? match[1] : null;
}

/**
 * Normalize the optional `updated` field. YAML parses an unquoted date
 * (e.g. `updated: 2026-06-16`) into a JS Date, but a quoted one stays a
 * string — so we accept both and emit a plain YYYY-MM-DD string. Anything
 * else is dropped.
 */
function normalizeUpdated(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim() !== "") {
    return value.trim();
  }
  return undefined;
}

/**
 * Validate a parsed frontmatter object into a typed Manifest, or return
 * a human-readable reason it failed. Kept separate from fetching so it's
 * easy to unit test.
 */
export function validateManifest(data: unknown): ManifestResult {
  if (typeof data !== "object" || data === null) {
    return { ok: false, error: "Frontmatter did not parse to an object." };
  }
  const obj = data as Record<string, unknown>;

  if (typeof obj.name !== "string" || obj.name.trim() === "") {
    return { ok: false, error: "Missing required field: name." };
  }
  if (obj.version === undefined || obj.version === null) {
    return { ok: false, error: "Missing required field: version." };
  }
  if (!Array.isArray(obj.skills)) {
    return { ok: false, error: "Missing required field: skills (must be a list)." };
  }
  if (obj.skills.length === 0) {
    return { ok: false, error: "Your passport lists no skills. Add at least one." };
  }

  const skills: Skill[] = [];
  for (let i = 0; i < obj.skills.length; i++) {
    const raw = obj.skills[i];
    const label = `Skill #${i + 1}`;
    if (typeof raw !== "object" || raw === null) {
      return { ok: false, error: `${label} is not a valid entry.` };
    }
    const s = raw as Record<string, unknown>;
    if (typeof s.name !== "string" || s.name.trim() === "") {
      return { ok: false, error: `${label} is missing a name.` };
    }
    if (typeof s.description !== "string" || s.description.trim() === "") {
      return { ok: false, error: `${label} ("${s.name}") is missing a description.` };
    }
    if (!isHttpsUrl(s.file)) {
      return {
        ok: false,
        error: `${label} ("${s.name}") needs an https file URL.`,
      };
    }
    skills.push({ name: s.name, description: s.description, file: s.file });
  }

  return {
    ok: true,
    manifest: {
      name: obj.name,
      version: String(obj.version),
      updated: normalizeUpdated(obj.updated),
      skills,
    },
  };
}

/**
 * Fetch a passport.md from `url`, parse and validate it.
 * Returns a typed result with a friendly error message on any failure.
 */
export async function fetchManifest(url: string): Promise<ManifestResult> {
  if (!isHttpsUrl(url)) {
    return { ok: false, error: "URL must start with https://" };
  }

  let response: Response;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: "text/plain, text/markdown, */*" },
        // Always pull a fresh copy — skills are a living document.
        cache: "no-store",
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    return { ok: false, error: "Could not reach that URL. Is it public and correct?" };
  }

  if (!response.ok) {
    return { ok: false, error: `Source responded with ${response.status}. Check the URL.` };
  }

  // Guard against oversized responses.
  const declaredLength = Number(response.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BYTES) {
    return { ok: false, error: "That file is too large to be a passport manifest." };
  }

  const text = await response.text();
  if (text.length > MAX_BYTES) {
    return { ok: false, error: "That file is too large to be a passport manifest." };
  }

  const frontmatter = extractFrontmatter(text);
  if (frontmatter === null) {
    return {
      ok: false,
      error: "No YAML frontmatter found. A passport.md must start with a --- block.",
    };
  }

  let parsed: unknown;
  try {
    parsed = yaml.load(frontmatter);
  } catch {
    return { ok: false, error: "The frontmatter is not valid YAML." };
  }

  return validateManifest(parsed);
}
