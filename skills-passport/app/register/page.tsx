import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Get your passport",
  description: "Register your passport.md and get a personal Skills Passport URL.",
};

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-prose px-6 py-16">
        <p className="font-mono text-sm text-accent">Register</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
          Get your passport
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Paste the raw URL to your <code className="font-mono text-base">passport.md</code>.
          We&rsquo;ll check it&rsquo;s reachable and correctly formatted, then hand you a
          personal passport URL with a private token.
        </p>

        <div className="mt-10">
          <RegisterForm />
        </div>

        <aside className="mt-12 rounded-lg border border-line bg-white px-5 py-5 text-sm leading-relaxed text-muted">
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
