import type { Manifest } from "@/lib/manifest";
import SkillGlyph from "./SkillGlyph";

/**
 * PassportCard — renders a passport holder's identity and skill list.
 * Used on the public viewer (/u/[token]). Each skill gets its own colourful
 * sticker (its glyph) and links to its source markdown file — so a passport
 * reads as a small garden of textural skill-tiles, not a plain list.
 */
export default function PassportCard({ manifest }: { manifest: Manifest }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_1px_0_rgba(0,0,0,0.02),0_12px_32px_-12px_rgba(21,19,15,0.18)]">
      <header className="border-b border-line px-6 py-6 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-wide text-faint">
          Skills Passport
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
          {manifest.name}
        </h1>
        <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted">
          <div className="flex gap-1.5">
            <dt className="text-faint">version</dt>
            <dd className="font-mono">{manifest.version}</dd>
          </div>
          {manifest.updated ? (
            <div className="flex gap-1.5">
              <dt className="text-faint">updated</dt>
              <dd className="font-mono">{manifest.updated}</dd>
            </div>
          ) : null}
          <div className="flex gap-1.5">
            <dt className="text-faint">skills</dt>
            <dd className="font-mono">{manifest.skills.length}</dd>
          </div>
        </dl>
      </header>

      <ul className="divide-y divide-line">
        {manifest.skills.map((skill, i) => (
          <li key={`${skill.name}-${i}`} className="flex gap-4 px-6 py-5 sm:px-8">
            <SkillGlyph name={skill.name} size={44} className="mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-medium text-ink">{skill.name}</h2>
                <a
                  href={skill.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 font-mono text-xs text-forest hover:text-forest-hover hover:underline"
                >
                  source ↗
                </a>
              </div>
              <p className="mt-1 text-sm text-muted">{skill.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
