/**
 * kv.ts — a tiny key/value abstraction.
 *
 * In production we use Vercel KV (Upstash Redis). But we never want the
 * app to be un-runnable locally just because someone hasn't configured a
 * database. So this module does one thing: it picks a backend.
 *
 *   - If KV_REST_API_URL is set  -> use Vercel KV (real Redis).
 *   - Otherwise                  -> use a local JSON file on disk.
 *
 * Everything else in the app talks to `kv.get/set/del` and never has to
 * know which backend is live. This is a common pattern: program against
 * an interface, swap the implementation underneath.
 */

export interface KVStore {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  del(key: string): Promise<void>;
}

/** True when real Vercel KV credentials are present in the environment. */
const hasVercelKV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

/**
 * Vercel KV backend. We import lazily so the dependency is only touched
 * when it's actually configured (importing it without env vars throws).
 */
function vercelKvStore(): KVStore {
  return {
    async get<T>(key: string): Promise<T | null> {
      const { kv } = await import("@vercel/kv");
      return (await kv.get<T>(key)) ?? null;
    },
    async set<T>(key: string, value: T): Promise<void> {
      const { kv } = await import("@vercel/kv");
      await kv.set(key, value);
    },
    async del(key: string): Promise<void> {
      const { kv } = await import("@vercel/kv");
      await kv.del(key);
    },
  };
}

/**
 * Local file backend for development. Stores everything in a single JSON
 * file at the project root. Gitignored — registered passports are never
 * committed. Not for production (no concurrency guarantees), but perfect
 * for "clone the repo and it just runs".
 */
function localFileStore(): KVStore {
  const STORE_PATH = ".passport-store.json";

  async function readAll(): Promise<Record<string, unknown>> {
    const fs = await import("node:fs/promises");
    try {
      const raw = await fs.readFile(STORE_PATH, "utf8");
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return {};
    }
  }

  async function writeAll(data: Record<string, unknown>): Promise<void> {
    const fs = await import("node:fs/promises");
    await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
  }

  return {
    async get<T>(key: string): Promise<T | null> {
      const all = await readAll();
      return (all[key] as T) ?? null;
    },
    async set<T>(key: string, value: T): Promise<void> {
      const all = await readAll();
      all[key] = value;
      await writeAll(all);
    },
    async del(key: string): Promise<void> {
      const all = await readAll();
      delete all[key];
      await writeAll(all);
    },
  };
}

export const kv: KVStore = hasVercelKV ? vercelKvStore() : localFileStore();

/** Surfaced in the UI so it's obvious which backend is active in dev. */
export const kvBackend = hasVercelKV ? "vercel-kv" : "local-file";
