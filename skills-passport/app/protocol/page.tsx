import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Protocol",
  description:
    "The Skills Passport protocol: the passport.md manifest format, the one-liner, and how any AI tool can implement it.",
};

const EXAMPLE_MANIFEST = `---
name: Marie-Claire Dean
version: 1.0
updated: 2026-06-16
skills:
  - name: Design Critique
    description: How I like to give and receive design feedback
    file: https://raw.githubusercontent.com/username/skills/main/design-critique.md
  - name: Writing Voice
    description: My tone, style, and formatting preferences
    file: https://raw.githubusercontent.com/username/skills/main/voice.md
  - name: Accessibility Review
    description: My accessibility standards and review process
    file: https://raw.githubusercontent.com/username/skills/main/accessibility.md
---

# Marie-Claire Dean — Skills

Optional human-readable notes can follow the frontmatter. Everything a
machine needs lives in the YAML block above.`;

export default function ProtocolPage() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="mx-auto my-12 max-w-prose rounded-3xl border border-line bg-paper px-6 py-12 shadow-[0_12px_40px_-20px_rgba(21,19,15,0.22)] sm:px-12"
      >
        <p className="font-mono text-sm font-medium text-forest">Specification · v1</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
          The Skills Passport protocol
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Skills Passport is an open protocol. Anyone can implement it — there is no
          gatekeeper and no required service. This page defines the format so any
          tool, host, or AI can read and apply a passport.
        </p>

        <Section title="The one-liner" id="one-liner">
          <p>
            A passport is applied with a single line of natural language, pasted into
            any AI tool&rsquo;s system prompt or instruction field:
          </p>
          <Pre>{`Apply my skills passport: https://skillspassport.io/u/<token>`}</Pre>
          <p>
            The AI fetches the URL, reads the manifest, and follows the linked skills
            for the rest of the conversation. The AI is the adapter — no extension or
            integration is required.
          </p>
        </Section>

        <Section title="The passport.md manifest" id="manifest">
          <p>
            A passport is a single markdown file, conventionally named{" "}
            <code className="font-mono text-sm">passport.md</code>. It opens with a
            YAML frontmatter block — the machine-readable part — optionally followed
            by human-readable markdown.
          </p>
          <Pre>{EXAMPLE_MANIFEST}</Pre>
        </Section>

        <Section title="Fields" id="fields">
          <FieldTable />
        </Section>

        <Section title="Rules" id="rules">
          <ul className="ml-5 list-disc space-y-2">
            <li>The file MUST begin with a YAML frontmatter block fenced by <code className="font-mono text-sm">---</code>.</li>
            <li><code className="font-mono text-sm">name</code>, <code className="font-mono text-sm">version</code>, and a non-empty <code className="font-mono text-sm">skills</code> list are REQUIRED.</li>
            <li>Every skill MUST have a <code className="font-mono text-sm">name</code>, a <code className="font-mono text-sm">description</code>, and an <code className="font-mono text-sm">https://</code> <code className="font-mono text-sm">file</code> URL.</li>
            <li>All URLs MUST use HTTPS. Plain HTTP is rejected.</li>
            <li>Skill files are fetched live at conversation time. They are never cached or copied by the protocol.</li>
          </ul>
        </Section>

        <Section title="Hosting & identity" id="hosting">
          <p>
            You host your <code className="font-mono text-sm">passport.md</code>{" "}
            wherever you like — typically a public GitHub repo, served as a raw URL.
            A registry (like this one) maps a private, unguessable token to your
            source URL, so your passport link can be public without exposing the
            underlying repo path. The token is the identity: whoever holds it can
            view the passport, and it can be rotated at any time.
          </p>
        </Section>

        <Section title="Implementing it yourself" id="implement">
          <p>
            Nothing here is proprietary. To support Skills Passport in your own tool,
            detect the one-liner, fetch the URL, parse the frontmatter, and load each
            skill&rsquo;s <code className="font-mono text-sm">file</code>. That&rsquo;s
            the whole protocol.
          </p>
          <p className="mt-4">
            <Link href="/register" className="font-mono text-sm text-accent hover:underline">
              Get your own passport →
            </Link>
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-line pt-10">
      <h2 id={id} className="text-xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Pre({ children }: { children: string }) {
  return (
    <pre className="my-2 overflow-x-auto rounded-lg border border-line bg-white p-4 font-mono text-xs leading-relaxed text-ink">
      <code>{children}</code>
    </pre>
  );
}

function FieldTable() {
  const rows: [string, string, string][] = [
    ["name", "string · required", "The passport holder's display name."],
    ["version", "string · required", "Manifest version, e.g. 1.0."],
    ["updated", "date · optional", "When the passport was last changed."],
    ["skills[]", "list · required", "One or more skill entries (below)."],
    ["skills[].name", "string · required", "Short label for the skill."],
    ["skills[].description", "string · required", "What the skill is, in a sentence."],
    ["skills[].file", "https url · required", "Where the skill's instructions live."],
  ];
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-paper">
            <th className="px-4 py-2 font-mono text-xs font-medium text-faint">field</th>
            <th className="px-4 py-2 font-mono text-xs font-medium text-faint">type</th>
            <th className="px-4 py-2 font-mono text-xs font-medium text-faint">meaning</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([field, type, meaning]) => (
            <tr key={field} className="border-b border-line last:border-0">
              <td className="px-4 py-2 font-mono text-xs text-ink">{field}</td>
              <td className="px-4 py-2 text-xs text-muted">{type}</td>
              <td className="px-4 py-2 text-muted">{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
