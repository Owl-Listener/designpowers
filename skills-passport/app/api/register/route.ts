import { NextResponse } from "next/server";
import { fetchManifest, isHttpsUrl } from "@/lib/manifest";
import { generateToken, storePassport } from "@/lib/tokens";

/**
 * POST /api/register
 *
 * Body: { githubUrl: string }
 *
 * Validates that the URL points at a reachable, well-formed passport.md,
 * mints a token, stores token -> { githubUrl, name }, and returns the
 * token plus the holder's name. The skills content itself is never stored.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const githubUrl = (body as { githubUrl?: unknown })?.githubUrl;
  if (!isHttpsUrl(githubUrl)) {
    return NextResponse.json(
      { error: "Provide an https:// URL to your passport.md" },
      { status: 400 },
    );
  }

  const result = await fetchManifest(githubUrl);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  const token = generateToken();
  await storePassport(token, {
    githubUrl,
    name: result.manifest.name,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    token,
    name: result.manifest.name,
    skillCount: result.manifest.skills.length,
  });
}
