import type { Config } from "tailwindcss";

/**
 * Design tokens — the single source of truth.
 *
 * Direction: "skills color the world of AI." A muted sage canvas plays
 * host to bright, playful sticker-glyphs. The rule that keeps it CLEAR:
 * colour lives in the shapes; text stays high-contrast (ink + forest).
 * We never set body copy in the bright hues — those are decorative or
 * large-and-bold only.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Canvas + ink ────────────────────────────────────────────
        sage: {
          DEFAULT: "#9DB4A6", // the green canvas from the reference
          light: "#B6C9BB", // lighter wash for large fields
          deep: "#7E988A", // hairlines / borders on sage
        },
        paper: "#FBFBF8", // near-white card surface for dense content
        ink: "#15130F", // near-black text + primary buttons/wordmark
        muted: "#4A4742", // secondary text
        faint: "#7C8A80", // tertiary / captions (reads on sage + paper)
        line: "#E4E6DF", // hairline borders on paper

        // ── Forest: the legible interactive accent ──────────────────
        // High contrast on BOTH sage and paper — used for links/focus.
        forest: {
          DEFAULT: "#1E5C3A",
          hover: "#15441C",
        },

        // ── The playful set: decorative + large-bold ONLY ───────────
        magenta: "#EC36AE",
        teal: "#34C7CD",
        orange: "#F2792B",
        maroon: "#7E2D1C",
        rust: "#A8201A",
        lime: "#DDEC9B",
        orchid: "#D98CE8",

        // `accent` is kept as an alias → forest, so existing interactive
        // classes (links, buttons, focus rings) stay legible by default.
        accent: {
          DEFAULT: "#1E5C3A",
          hover: "#15441C",
          soft: "#E8F0E4", // soft green-tinted wash for success states
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      maxWidth: {
        prose: "44rem", // comfortable reading measure (~66 chars)
      },
    },
  },
  plugins: [],
};

export default config;
