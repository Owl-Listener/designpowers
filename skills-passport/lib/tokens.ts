/**
 * tokens.ts — the identity layer.
 *
 * A passport is identified ONLY by a long random token. There are no
 * usernames, no passwords. The token IS the secret, like an unguessable
 * share link. Whoever holds the URL can view the passport; whoever wants
 * to rotate it proves ownership by presenting the current token.
 *
 * We store the absolute minimum against each token:
 *   - the GitHub raw URL of their passport.md
 *   - their display name (cached from the manifest, for the viewer header)
 *   - when it was created
 *
 * We never store the skills content itself — that's always fetched live
 * from the source (see lib/manifest.ts).
 */

import { kv } from "./kv";

export interface PassportRecord {
  /** HTTPS URL to the user's raw passport.md */
  githubUrl: string;
  /** Display name, cached from the manifest at registration time */
  name: string;
  /** ISO timestamp */
  createdAt: string;
}

/** Namespaced key so passports don't collide with other KV data. */
function keyFor(token: string): string {
  return `passport:${token}`;
}

/**
 * Generate a new token. crypto.randomUUID() is a v4 UUID: 122 bits of
 * randomness, which is far too large to guess or enumerate. This is the
 * security boundary of the whole product, so we lean on the platform's
 * CSPRNG rather than rolling our own.
 */
export function generateToken(): string {
  return crypto.randomUUID();
}

export async function storePassport(token: string, record: PassportRecord): Promise<void> {
  await kv.set(keyFor(token), record);
}

export async function getPassport(token: string): Promise<PassportRecord | null> {
  // Defensive: tokens come from the URL, so reject anything that isn't a
  // plausible UUID before touching the store.
  if (!isValidTokenShape(token)) return null;
  return kv.get<PassportRecord>(keyFor(token));
}

export async function deletePassport(token: string): Promise<void> {
  await kv.del(keyFor(token));
}

/**
 * Rotate a token: mint a new one, copy the record across, delete the old.
 * The old URL stops working immediately. Returns the new token, or null
 * if the supplied token doesn't exist.
 */
export async function rotateToken(currentToken: string): Promise<string | null> {
  const record = await getPassport(currentToken);
  if (!record) return null;
  const newToken = generateToken();
  await storePassport(newToken, record);
  await deletePassport(currentToken);
  return newToken;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidTokenShape(token: string): boolean {
  return UUID_RE.test(token);
}
