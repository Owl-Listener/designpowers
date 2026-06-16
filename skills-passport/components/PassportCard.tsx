import type { Manifest } from "@/lib/manifest";

/**
 * PassportCard — renders a passport holder's identity and skill list.
 * Used on the public viewer (/u/[token]). Each skill links to its source
 * markdown file. Intentionally calm and document-like: this is a living
 * identity page, not a dashboard.
 */
export default function PassportCard({ manifest }: { manifest: Manifest }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white">
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
          <li key={`${skill.name}-${i}`} className="px-6 py-5 sm:px-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-medium text-ink">{skill.name}</h2>
              <a
                href={skill.file}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 font-mono text-xs text-accent hover:text-accent-hover hover:underline"
              >
                source ↗
              </a>
            </div>
            <p className="mt-1 text-sm text-muted">{skill.description}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
