"use client";

import { useState } from "react";

/**
 * OneLiner — the heart of the product. Renders the single line a user
 * pastes into any AI tool, with a one-tap copy button.
 *
 * It's a client component because copying to the clipboard needs the
 * browser. The actual text is passed in as a prop so the same component
 * works on the landing page (illustrative) and the register/viewer pages
 * (a real token).
 */
export default function OneLiner({
  text,
  label = "Your one-liner",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can fail (permissions, http). Fail quietly — the text
      // is right there to select manually.
      setCopied(false);
    }
  }

  return (
    <div>
      {label ? (
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-faint">
          {label}
        </p>
      ) : null}
      <div className="flex items-stretch gap-2">
        <code className="flex-1 overflow-x-auto whitespace-nowrap rounded-md border border-line bg-white px-4 py-3 font-mono text-sm text-ink">
          {text}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied to clipboard" : "Copy one-liner to clipboard"}
          className="shrink-0 rounded-md bg-ink px-4 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
