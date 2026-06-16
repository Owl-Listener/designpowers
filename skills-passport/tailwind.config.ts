import type { Config } from "tailwindcss";

/**
 * Design tokens live here as the single source of truth.
 * The palette is deliberately small: an off-white paper background,
 * near-black ink, a muted grey scale for structure, and ONE accent.
 * Swapping the accent is a one-line change (see `accent` below).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF9", // off-white background (warm stone, not clinical white)
        ink: "#1C1917", // near-black body text
        muted: "#57534E", // secondary text
        faint: "#A8A29E", // tertiary / captions
        line: "#E7E5E4", // hairline borders
        // The single accent. Change this hex to re-skin the whole product.
        accent: {
          DEFAULT: "#4F46E5", // electric indigo — protocol/infrastructure read
          hover: "#4338CA",
          soft: "#EEF2FF", // tint for subtle backgrounds
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
