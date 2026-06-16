import Link from "next/link";

/**
 * Site header. Deliberately minimal — wordmark + a couple of links.
 * The wordmark uses monospace to reinforce the "protocol, not startup"
 * feeling: this is infrastructure you read, not a brand you consume.
 */
export default function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-ink hover:text-accent"
        >
          skills<span className="text-accent">/</span>passport
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
          <Link href="/protocol" className="text-muted hover:text-ink">
            Protocol
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-ink px-3 py-1.5 text-paper hover:bg-accent"
          >
            Get your passport
          </Link>
        </nav>
      </div>
    </header>
  );
}
