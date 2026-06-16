/**
 * url.ts — resolve the public base URL used in passport one-liners.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_BASE_URL (explicit override, e.g. a custom domain)
 *   2. VERCEL_URL (automatically set on Vercel deployments)
 *   3. the canonical production domain
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://skillspassport.io";
}

/** The full passport URL for a token. */
export function passportUrl(token: string, base = getBaseUrl()): string {
  return `${base}/u/${token}`;
}

/** The copyable one-liner a user pastes into any AI tool. */
export function oneLiner(token: string, base = getBaseUrl()): string {
  return `Apply my skills passport: ${passportUrl(token, base)}`;
}
