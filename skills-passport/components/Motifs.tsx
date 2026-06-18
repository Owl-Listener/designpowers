import SkillGlyph, { SHAPES, C } from "./SkillGlyph";

/**
 * Decorative motifs for the playful "skills colour the world" direction.
 *
 * Everything here is purely ornamental: aria-hidden, pointer-events-none,
 * and toned down / hidden on small screens so it never competes with the
 * actual content. The seeds passed to SkillGlyph just pick stable shapes.
 */

/**
 * The "string" — a looping squiggle that threads through the hero. Two
 * offset dashed strokes (turquoise + bright pink) with rounded caps give
 * it a soft, stitched feel. It loops over itself once, so it reads as our
 * own gesture rather than a simple swoosh.
 */
export function DashedPath({ className = "" }: { className?: string }) {
  const d =
    "M -20 70 C 90 70, 90 8, 150 8 C 212 8, 212 112, 150 112 C 110 112, 122 50, 214 56 C 338 64, 366 152, 540 96";
  return (
    <svg
      viewBox="0 0 500 170"
      preserveAspectRatio="none"
      className={`string-sway ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="string-march-a"
        d={d}
        fill="none"
        stroke={C.teal}
        strokeWidth="13"
        strokeLinecap="round"
        strokeDasharray="14 18"
      />
      <path
        className="string-march-b"
        d={d}
        fill="none"
        stroke={C.magenta}
        strokeWidth="13"
        strokeLinecap="round"
        strokeDasharray="14 18"
        strokeDashoffset="16"
      />
    </svg>
  );
}

/**
 * A bare (un-tiled) shape floating on the canvas. Mixing these with the
 * tiled stickers breaks up the uniform "sticker sheet" look.
 */
function FloatingShape({
  shape,
  color,
  size,
  className = "",
}: {
  shape: number;
  color: string;
  size: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {SHAPES[shape % SHAPES.length](color)}
    </svg>
  );
}

/**
 * The hero composition: a looping string with a loose, varied cluster of
 * marks — some tiled stickers, some bare shapes, mixed sizes and angles.
 * Hidden on small screens (the headline carries those on its own).
 */
export function HeroMotifs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 select-none lg:block"
    >
      <DashedPath className="absolute right-[2%] top-10 h-52 w-[118%]" />

      {/* Tiled stickers — varied sizes + angles, not a grid. */}
      <SkillGlyph name="hero-a" size={96} className="absolute right-[30%] top-1 rotate-6 drop-shadow-sm" />
      <SkillGlyph name="hero-b" size={64} className="absolute right-[7%] top-16 -rotate-6 drop-shadow-sm" />
      <SkillGlyph name="hero-c" size={112} className="absolute right-[15%] top-56 -rotate-3 drop-shadow-sm" />
      <SkillGlyph name="hero-d" size={56} className="absolute right-[44%] top-44 rotate-12 drop-shadow-sm" />

      {/* Bare floating shapes — break up the sticker-sheet read. */}
      <FloatingShape shape={1} color={C.rust} size={70} className="absolute right-[40%] top-2 -rotate-6" />
      <FloatingShape shape={6} color={C.forest} size={52} className="absolute right-[5%] top-60 rotate-3" />
      <FloatingShape shape={4} color={C.orange} size={40} className="absolute right-[33%] top-72 rotate-12" />
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
