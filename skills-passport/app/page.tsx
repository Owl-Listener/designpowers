import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OneLiner from "@/components/OneLiner";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* Hero ─────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
          <p className="font-mono text-sm text-accent">An open protocol</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            Your AI skills.
            <br />
            Everywhere you work.
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
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
              className="rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-accent"
            >
              Get your passport
            </Link>
            <Link
              href="/protocol"
              className="rounded-md px-5 py-3 text-sm font-medium text-ink hover:text-accent"
            >
              Read the protocol →
            </Link>
          </div>
        </section>

        {/* How it works ─────────────────────────────────────── */}
        <section
          aria-labelledby="how-it-works"
          className="border-t border-line bg-white"
        >
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2
              id="how-it-works"
              className="text-sm font-medium uppercase tracking-wide text-faint"
            >
              How it works
            </h2>
            <ol className="mt-8 grid gap-10 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <div className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 font-medium text-ink">{step.title}</h3>
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
    title: "Write your passport.md",
    body: "A small markdown file listing your skills — each one a name, a description, and a link to where it lives.",
  },
  {
    title: "Register your URL",
    body: "Host the file on GitHub, paste the raw URL here, and get a personal passport URL with a private token.",
  },
  {
    title: "Paste the one-liner",
    body: "Drop the single line into any AI tool's instructions. It fetches your skills and applies them, instantly.",
  },
];
