import SkillGlyph from "./SkillGlyph";

/**
 * Decorative motifs for the playful "skills colour the world" direction.
 *
 * Everything here is purely ornamental: aria-hidden, pointer-events-none,
 * and toned down / hidden on small screens so it never competes with the
 * actual content. The seeds passed to SkillGlyph just pick stable shapes.
 */

/**
 * The wandering segmented path from the reference — two offset dashed
 * strokes (magenta + forest) tracing the same curve to get the alternating
 * candy-stripe look.
 */
export function DashedPath({ className = "" }: { className?: string }) {
  const d = "M -10 40 C 120 10, 150 140, 260 120 S 420 60, 520 150";
  return (
    <svg
      viewBox="0 0 500 200"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} fill="none" stroke="#1E5C3A" strokeWidth="14" strokeDasharray="22 22" />
      <path
        d={d}
        fill="none"
        stroke="#EC36AE"
        strokeWidth="14"
        strokeDasharray="22 22"
        strokeDashoffset="22"
      />
    </svg>
  );
}

/**
 * A floating cluster of skill-stickers, sized for a hero corner. Hidden on
 * small screens (the headline carries those on its own).
 */
export function HeroMotifs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 select-none lg:block"
    >
      <DashedPath className="absolute right-0 top-6 h-44 w-[120%]" />
      <SkillGlyph name="hero-burst" size={92} className="absolute right-[34%] top-2 rotate-3 drop-shadow-sm" />
      <SkillGlyph name="hero-clover" size={76} className="absolute right-[8%] top-24 -rotate-6 drop-shadow-sm" />
      <SkillGlyph name="hero-star" size={60} className="absolute right-[46%] top-40 rotate-12 drop-shadow-sm" />
      <SkillGlyph name="hero-asterisk" size={104} className="absolute right-[18%] top-52 rotate-2 drop-shadow-sm" />
      <SkillGlyph name="hero-daisy" size={64} className="absolute right-[40%] top-72 -rotate-3 drop-shadow-sm" />
      <SkillGlyph name="hero-dots" size={72} className="absolute right-[6%] top-[19rem] rotate-6 drop-shadow-sm" />
    </div>
  );
}

/**
 * A small horizontal row of stickers — used as a light accent on simpler
 * pages (register, viewer states) and on mobile where the big scatter hides.
 */
export function MotifRow({
  seeds,
  size = 40,
  className = "",
}: {
  seeds: string[];
  size?: number;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-3 ${className}`}>
      {seeds.map((s, i) => (
        <SkillGlyph key={s} name={s} size={size} className={i % 2 ? "rotate-3" : "-rotate-3"} />
      ))}
    </div>
  );
}
