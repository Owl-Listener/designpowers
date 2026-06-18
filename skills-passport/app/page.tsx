import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OneLiner from "@/components/OneLiner";
import SkillGlyph from "@/components/SkillGlyph";
import { HeroMotifs, MotifRow } from "@/components/Motifs";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <HeroMotifs />
          <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-16 sm:pt-24">
            <p className="font-mono text-sm font-medium text-forest">An open protocol</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-7xl">
              Your AI skills.
              <br />
              Everywhere you work.
            </h1>

            {/* Mobile-only sticker row — the big scatter is hidden on small screens. */}
            <MotifRow
              seeds={["m-burst", "m-clover", "m-star", "m-asterisk", "m-daisy"]}
              size={36}
              className="mt-8 lg:hidden"
            />

            <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
              The instructions, preferences, and working style you&rsquo;ve built up in
              one AI tool should follow you everywhere. One URL represents how you
              work. Paste it into any AI tool and it instantly knows you.
            </p>

            <div className="mt-10 max-w-2xl">
              <OneLiner
                text="Apply my skills passport: https://skillspassport.io/u/your-token"
                label="Paste this into any AI tool"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-forest"
              >
                Get your passport
              </Link>
              <Link
                href="/protocol"
                className="rounded-full px-5 py-3 text-sm font-medium text-ink hover:text-forest"
              >
                Read the protocol →
              </Link>
            </div>
          </div>
        </section>

        {/* How it works ─────────────────────────────────────── */}
        <section aria-labelledby="how-it-works" className="mx-auto max-w-5xl px-6 py-10">
          <div className="rounded-3xl border border-line bg-paper px-6 py-12 shadow-[0_12px_32px_-16px_rgba(21,19,15,0.18)] sm:px-12">
            <h2
              id="how-it-works"
              className="text-sm font-medium uppercase tracking-wide text-faint"
            >
              How it works
            </h2>
            <ol className="mt-8 grid gap-10 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <div className="flex items-center gap-3">
                    <SkillGlyph name={step.seed} size={40} />
                    <span className="font-mono text-sm font-medium text-forest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3 font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* The adapter idea ─────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="max-w-prose">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              No extension. No per-tool integration.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              The AI itself is the adapter. When you paste your one-liner, the tool
              fetches your skills manifest at conversation time and applies it. It
              works in Claude, ChatGPT, Gemini, Figma AI, Cursor — anything with an
              instruction field.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Your skills live in your own GitHub repo. We only ever store a token
              that points at them. The content is fetched live from the source, never
              copied onto our servers.
            </p>
            <div className="mt-8">
              <Link
                href="/protocol"
                className="font-mono text-sm text-accent hover:underline"
              >
                Read the full protocol spec →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const STEPS = [
  {
    seed: "step-write",
    title: "Write your passport.md",
    body: "A small markdown file listing your skills — each one a name, a description, and a link to where it lives.",
  },
  {
    seed: "step-register",
    title: "Register your URL",
    body: "Host the file on GitHub, paste the raw URL here, and get a personal passport URL with a private token.",
  },
  {
    seed: "step-paste",
    title: "Paste the one-liner",
    body: "Drop the single line into any AI tool's instructions. It fetches your skills and applies them, instantly.",
  },
];
