import Link from "next/link";
import SkillGlyph from "./SkillGlyph";

/**
 * Site header. A little sticker-mark + wordmark, then a couple of links.
 * The wordmark stays monospace to keep the "protocol, not startup" read;
 * the glyph adds the playful, textural note from the design direction.
 */
export default function Header() {
  return (
    <header className="border-b border-sage-deep/40">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-ink"
        >
          <SkillGlyph name="wordmark-passport" size={28} rounded={9} className="transition-transform group-hover:rotate-12" />
          <span className="font-mono">
            skills<span className="text-forest">/</span>passport
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
          <Link href="/protocol" className="text-muted hover:text-ink">
            Protocol
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-ink px-4 py-1.5 text-paper hover:bg-forest"
          >
            Get your passport
          </Link>
        </nav>
      </div>
    </header>
  );
}
