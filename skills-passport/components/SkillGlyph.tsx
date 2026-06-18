/**
 * SkillGlyph — a playful "sticker" for a skill.
 *
 * Direction: skills colour the world of AI, so every skill gets its own
 * bright, textural tile. The shape + colour are chosen *deterministically*
 * from the skill's name, so the same skill always looks the same — it
 * becomes a tiny recognizable mark, not random noise.
 *
 * Purely decorative: the tile carries no meaning a screen reader needs,
 * so the SVG is aria-hidden and the skill's real name sits next to it.
 *
 * Hex values mirror the tokens in tailwind.config.ts. They live here too
 * because SVG fills need raw colours, not utility classes.
 */

export const C = {
  ink: "#15130F",
  sage: "#9DB4A6",
  forest: "#1E5C3A",
  magenta: "#EC36AE",
  teal: "#34C7CD",
  orange: "#F2792B",
  maroon: "#7E2D1C",
  rust: "#A8201A",
  lime: "#DDEC9B",
  orchid: "#D98CE8",
  white: "#FBFBF8",
} as const;

/** [tile background, shape colour] pairs — each one a deliberate, legible duo. */
const TILES: [string, string][] = [
  [C.maroon, C.orange],
  [C.orchid, C.maroon],
  [C.forest, C.teal],
  [C.lime, C.ink],
  [C.magenta, C.lime],
  [C.ink, C.lime],
  [C.orange, C.maroon],
  [C.teal, C.forest],
];

type ShapeFn = (color: string) => React.ReactNode;

/** Eight simple, geometric marks. Exported so motifs can draw them bare. */
export const SHAPES: ShapeFn[] = [
  // 0 — sunburst
  (c) => (
    <g fill={c}>
      {Array.from({ length: 16 }).map((_, i) => (
        <rect
          key={i}
          x="48"
          y="6"
          width="4"
          height="26"
          rx="2"
          transform={`rotate(${i * 22.5} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="12" />
    </g>
  ),
  // 1 — fat asterisk
  (c) => (
    <g fill={c}>
      {Array.from({ length: 6 }).map((_, i) => (
        <rect
          key={i}
          x="43"
          y="14"
          width="14"
          height="72"
          rx="7"
          transform={`rotate(${i * 60} 50 50)`}
        />
      ))}
    </g>
  ),
  // 2 — quatrefoil / clover
  (c) => (
    <g fill={c}>
      <circle cx="36" cy="36" r="20" />
      <circle cx="64" cy="36" r="20" />
      <circle cx="36" cy="64" r="20" />
      <circle cx="64" cy="64" r="20" />
    </g>
  ),
  // 3 — daisy (petals around a center)
  (c) => (
    <g fill={c}>
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="24"
          rx="8"
          ry="16"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="10" fill={C.white} />
    </g>
  ),
  // 4 — four-point star
  (c) => (
    <path
      fill={c}
      d="M50 8 L60 40 L92 50 L60 60 L50 92 L40 60 L8 50 L40 40 Z"
    />
  ),
  // 5 — 2x2 dots
  (c) => (
    <g fill={c}>
      <circle cx="34" cy="34" r="14" />
      <circle cx="66" cy="34" r="14" />
      <circle cx="34" cy="66" r="14" />
      <circle cx="66" cy="66" r="14" />
    </g>
  ),
  // 6 — bullseye / arches
  (c) => (
    <g fill="none" stroke={c} strokeWidth="9">
      <circle cx="50" cy="50" r="36" />
      <circle cx="50" cy="50" r="20" />
      <circle cx="50" cy="50" r="5" fill={c} />
    </g>
  ),
  // 7 — soft cross / plus
  (c) => (
    <path
      fill={c}
      d="M40 12 h20 v20 h20 v20 h-20 v20 h-20 v-20 h-20 v-20 h20 z"
      transform="rotate(45 50 50)"
      rx="6"
    />
  ),
];

/** Tiny stable string hash (FNV-ish) → non-negative int. */
function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export default function SkillGlyph({
  name,
  size = 48,
  className = "",
  rounded = 16,
}: {
  name: string;
  size?: number;
  className?: string;
  rounded?: number;
}) {
  const h = hash(name);
  const [tile, shapeColor] = TILES[h % TILES.length];
  const shape = SHAPES[(h >> 3) % SHAPES.length];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="100" height="100" rx={rounded} fill={tile} />
      {shape(shapeColor)}
    </svg>
  );
}
