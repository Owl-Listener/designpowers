import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-faint">
          Skills Passport — an open protocol.
        </p>
        <nav aria-label="Footer" className="flex gap-6">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <Link href="/protocol" className="hover:text-ink">
            Protocol
          </Link>
          <Link href="/register" className="hover:text-ink">
            Register
          </Link>
        </nav>
      </div>
    </footer>
  );
}
