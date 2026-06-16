import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PassportCard from "@/components/PassportCard";
import { getPassport } from "@/lib/tokens";
import { fetchManifest } from "@/lib/manifest";

// Always render fresh — the underlying skills are a living document and the
// token lookup must reflect rotations immediately.
export const dynamic = "force-dynamic";

type Props = { params: { token: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const record = await getPassport(params.token);
  if (!record) return { title: "Passport not found" };
  return {
    title: `${record.name}'s Skills Passport`,
    description: `The skills and working style of ${record.name}.`,
  };
}

export default async function PassportViewerPage({ params }: Props) {
  const record = await getPassport(params.token);

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-prose px-6 py-16">
        {!record ? (
          <NotFound />
        ) : (
          <PassportBody token={params.token} githubUrl={record.githubUrl} fallbackName={record.name} />
        )}
      </main>
      <Footer />
    </>
  );
}

async function PassportBody({
  githubUrl,
  fallbackName,
}: {
  token: string;
  githubUrl: string;
  fallbackName: string;
}) {
  const result = await fetchManifest(githubUrl);

  if (!result.ok) {
    return (
      <div>
        <p className="font-mono text-sm text-accent">Skills Passport</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
          {fallbackName}
        </h1>
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <p className="font-medium">This passport&rsquo;s source can&rsquo;t be loaded right now.</p>
          <p className="mt-1">{result.error}</p>
          <p className="mt-2 text-amber-800">
            Skills are fetched live from the source, so this will resolve as soon as
            the source is reachable again.
          </p>
        </div>
      </div>
    );
  }

  return <PassportCard manifest={result.manifest} />;
}

function NotFound() {
  return (
    <div className="text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
        No passport here
      </h1>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
        This token doesn&rsquo;t match a passport. It may have been rotated, or the
        link may be incomplete.
      </p>
      <div className="mt-8">
        <Link
          href="/register"
          className="rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-accent"
        >
          Get your own passport
        </Link>
      </div>
    </div>
  );
}
