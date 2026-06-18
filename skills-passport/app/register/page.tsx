import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MotifRow } from "@/components/Motifs";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Get your passport",
  description: "Register your passport.md and get a personal Skills Passport URL.",
};

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="mx-auto my-12 max-w-prose rounded-3xl border border-line bg-paper px-6 py-12 shadow-[0_12px_40px_-20px_rgba(21,19,15,0.22)] sm:px-12"
      >
        <p className="font-mono text-sm font-medium text-forest">Register</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
          Get your passport
        </h1>
        <MotifRow seeds={["r-burst", "r-clover", "r-star", "r-daisy"]} size={34} className="mt-5" />
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Paste the raw URL to your <code className="font-mono text-base">passport.md</code>.
          We&rsquo;ll check it&rsquo;s reachable and correctly formatted, then hand you a
          personal passport URL with a private token.
        </p>

        <div className="mt-10">
          <RegisterForm />
        </div>

        <aside className="mt-12 rounded-xl border border-line bg-sage-light/30 px-5 py-5 text-sm leading-relaxed text-muted">
          <p className="font-medium text-ink">Don&rsquo;t have a passport.md yet?</p>
          <p className="mt-1">
            It&rsquo;s a small markdown file with a YAML frontmatter block. The{" "}
            <Link href="/protocol" className="text-accent hover:underline">
              protocol page
            </Link>{" "}
            has a copy-paste example you can adapt in a minute.
          </p>
        </aside>
      </main>
      <Footer />
    </>
  );
}
