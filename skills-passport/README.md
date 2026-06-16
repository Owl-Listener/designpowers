# Skills Passport

**Your AI skills, everywhere you work.**

The instructions, preferences, and working style you build up in one AI tool
should follow you everywhere. Skills Passport is an open protocol: one URL
represents how you work, and you paste a single line into any AI tool to bring
your skills with you.

```
Apply my skills passport: https://skillspassport.io/u/<token>
```

That line works in Claude, ChatGPT, Gemini, Figma AI, Cursor — anything with an
instruction field. The AI itself is the adapter: it fetches your skills manifest
at conversation time and applies it. No browser extension, no per-tool
integration.

---

## How it works

1. You write a `passport.md` — a markdown file listing your skills (see
   [`public/passport.example.md`](./public/passport.example.md)).
2. You host it on GitHub and grab the **raw** URL.
3. You register at `/register`, which validates the file and gives you a personal
   passport URL with a private token.
4. You paste the one-liner into any AI tool.
5. The AI fetches your manifest live and applies your skills.

Your skills content is **never stored on our servers** — only a token that points
at your source. The content is always fetched live from GitHub.

---

## The manifest format

A `passport.md` is markdown with a YAML frontmatter block:

```yaml
---
name: Marie-Claire Dean
version: 1.0
updated: 2026-06-16
skills:
  - name: Design Critique
    description: How I like to give and receive design feedback
    file: https://raw.githubusercontent.com/username/skills/main/design-critique.md
---
```

| Field                  | Type                | Required | Notes                              |
| ---------------------- | ------------------- | -------- | ---------------------------------- |
| `name`                 | string              | yes      | The holder's display name.         |
| `version`              | string              | yes      | Manifest version, e.g. `1.0`.      |
| `updated`              | date                | no       | Last changed.                      |
| `skills[].name`        | string              | yes      | Short label.                       |
| `skills[].description` | string              | yes      | One sentence.                      |
| `skills[].file`        | https url           | yes      | Where the skill instructions live. |

All URLs must be HTTPS. The full spec lives at `/protocol`.

---

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling (design tokens in `tailwind.config.ts`)
- **Vercel KV** (Upstash Redis) for token → source mappings
- **Vercel** for deployment

---

## Project structure

```
skills-passport/
├── app/
│   ├── page.tsx                  # landing page
│   ├── protocol/page.tsx         # protocol spec
│   ├── register/
│   │   ├── page.tsx              # registration page (server)
│   │   └── RegisterForm.tsx      # registration form (client)
│   ├── api/register/route.ts     # validate + mint token
│   └── u/[token]/page.tsx        # passport viewer
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PassportCard.tsx
│   └── OneLiner.tsx              # the copyable one-liner
├── lib/
│   ├── manifest.ts               # fetch + validate passport.md
│   ├── tokens.ts                 # generate + store tokens
│   ├── kv.ts                     # KV abstraction (Vercel KV / local file)
│   └── url.ts                    # base-URL + one-liner helpers
└── public/
    └── passport.example.md       # starter manifest
```

---

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

**No database required for local dev.** If `KV_REST_API_URL` is not set, the app
automatically falls back to a local JSON file store (`.passport-store.json`,
gitignored). To point local dev at a real Vercel KV, copy `.env.example` to
`.env.local` and fill in the credentials.

Useful scripts:

```bash
npm run dev        # start the dev server
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

---

## Deploying to Vercel

1. Import the repo into Vercel and set the project root to `skills-passport/`.
2. Add a **Vercel KV** store to the project (this injects `KV_REST_API_URL` and
   `KV_REST_API_TOKEN` automatically).
3. Optionally set `NEXT_PUBLIC_BASE_URL` to your custom domain so generated
   one-liners use it.
4. Deploy.

---

## Security model

- Passport URLs use long random tokens (UUID v4). No usernames, no enumeration.
- Tokens are stored in Vercel KV, never in source.
- Manifests and skill files are fetched over HTTPS only.
- We store the minimum: token, source URL, display name, creation date.
- Skills content is never stored — always fetched live from the source.
- Tokens can be rotated (see `rotateToken` in `lib/tokens.ts`), which immediately
  invalidates the old URL.

---

## It's an open protocol

Nothing here is proprietary. To support Skills Passport in your own tool, detect
the one-liner, fetch the URL, parse the frontmatter, and load each skill's file.
That's the whole protocol. See `/protocol` for the full spec.
