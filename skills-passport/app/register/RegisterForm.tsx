"use client";

import { useState } from "react";
import Link from "next/link";
import OneLiner from "@/components/OneLiner";

type Success = { token: string; name: string; skillCount: number };

/**
 * RegisterForm — the client side of registration.
 * Posts the GitHub raw URL to /api/register, then either shows a friendly
 * validation error or the user's brand-new one-liner.
 *
 * We build the final URLs from the live origin (window.location) so they're
 * correct whether the app runs on localhost, a preview deploy, or production.
 */
export default function RegisterForm() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Success | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ githubUrl: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
      } else {
        setResult(data as Success);
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setStatus("idle");
    }
  }

  if (result) {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "https://skillspassport.io";
    const passportUrl = `${origin}/u/${result.token}`;
    const oneLiner = `Apply my skills passport: ${passportUrl}`;

    return (
      <div className="space-y-8">
        <div className="rounded-lg border border-accent/30 bg-accent-soft px-5 py-4">
          <p className="text-sm text-ink">
            <span className="font-medium">Passport created for {result.name}.</span>{" "}
            {result.skillCount} skill{result.skillCount === 1 ? "" : "s"} found.
          </p>
        </div>

        <OneLiner text={oneLiner} label="Your one-liner — paste this into any AI tool" />

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-faint">
            Your public passport page
          </p>
          <Link
            href={`/u/${result.token}`}
            className="break-all font-mono text-sm text-accent hover:underline"
          >
            {passportUrl}
          </Link>
        </div>

        <div className="rounded-lg border border-line bg-white px-5 py-4 text-sm text-muted">
          <p className="font-medium text-ink">Keep this link private.</p>
          <p className="mt-1">
            The token is your identity — anyone with it can view your passport. You
            can rotate it at any time, which instantly invalidates the old URL.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setResult(null);
            setUrl("");
          }}
          className="text-sm text-muted hover:text-ink"
        >
          ← Register another passport
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium text-ink">
          Raw URL to your passport.md
        </label>
        <p className="mt-1 text-sm text-muted">
          Host the file on GitHub and paste the <em>raw</em> URL (the one starting
          with <code className="font-mono text-xs">raw.githubusercontent.com</code>).
        </p>
        <input
          id="githubUrl"
          name="githubUrl"
          type="url"
          required
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://raw.githubusercontent.com/you/skills/main/passport.md"
          className="mt-3 w-full rounded-md border border-line bg-white px-4 py-3 font-mono text-sm text-ink placeholder:text-faint focus:border-accent"
          aria-describedby={error ? "register-error" : undefined}
          aria-invalid={error ? true : undefined}
        />
      </div>

      {error ? (
        <p
          id="register-error"
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Validating…" : "Create my passport"}
      </button>
    </form>
  );
}
