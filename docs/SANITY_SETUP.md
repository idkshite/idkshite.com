# Sanity setup (one-time manual steps)

Posts can now come from **two sources**: existing `.mdx` files (unchanged) and
**Sanity**, edited in the embedded Studio at `/studio` and published live with
no code deploy. Code, project (`x6znc9mw`), and the `production` dataset already
exist — these are the only steps left, and they can't be automated.

Hosting is **Vercel**. On-demand ISR (`res.revalidate`) and `fallback: "blocking"`
work natively there — no plugin needed.

## 1. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (Production
+ Preview + Development) and in a local `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=x6znc9mw
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<viewer token, step 2>
SANITY_REVALIDATE_SECRET=<any long random string you invent>

# Draft preview (Presentation + Visual Editing) — see section 6.
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio
```

`NEXT_PUBLIC_SANITY_PROJECT_ID` is **required** (no code default) — set it or
the Sanity client has no project to talk to. Dataset/API version fall back to
the values above if unset.

`NEXT_PUBLIC_SANITY_STUDIO_URL` powers stega click-to-edit links in preview. Use
`http://localhost:3000/studio` locally and `https://<your-production-domain>/studio`
on Vercel.

## 2. Read token

[sanity.io/manage](https://www.sanity.io/manage) → project `x6znc9mw` → **API →
Tokens → Add API token** → name "web read", permission **Viewer** → copy it into
`SANITY_API_READ_TOKEN`. (The dataset is public, so reads work without it, but
the token future-proofs private reads and webhook-triggered fetches.)

## 3. CORS origin (so the Studio can talk to Sanity in the browser)

Sanity Manage → **API → CORS Origins → Add** for each:

- `https://<your-production-domain>` — **allow credentials: yes**
- `http://localhost:3000` — **allow credentials: yes**

## 4. Publish webhook (live updates without a deploy)

Sanity Manage → **API → Webhooks → Create Webhook**:

| Field | Value |
| --- | --- |
| URL | `https://<your-production-domain>/api/revalidate` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `_type == "post"` |
| Projection | `{ "path": "/posts/" + slug.current }` |
| HTTP method | `POST` |
| API version | `v2024-10-01` (or latest) |
| Secret | the same value as `SANITY_REVALIDATE_SECRET` |

On publish, `/api/revalidate` verifies the HMAC and revalidates `/posts/<slug>`
plus `/posts`. The listing/tag pages also self-revalidate every 60s as a backstop.

## 5. (Optional) Deploy the schema for tooling

The embedded Studio reads `sanity.config.ts` directly, so it needs nothing extra.
Only run this if you want the schema available to Sanity's hosted tooling /
typegen / MCP:

```bash
npx sanity schema deploy
```

## 6. Draft preview (Presentation + Visual Editing)

Preview unpublished drafts — rendered with the real `PostLayout` and Portable
Text — before publishing, with click-to-edit overlays. Preview-only: nothing
about how published posts are built or served changes.

**Reused, not new:** `SANITY_API_READ_TOKEN` (the Viewer token from step 2)
doubles as the preview token. The CORS origins from step 3 already cover
Presentation (the Studio is embedded, same origin).

**Env vars:**

- `NEXT_PUBLIC_SANITY_STUDIO_URL` — set per section 1 (the per-environment
  `/studio` URL). Add it in Vercel for Production + Preview + Development.
- `SANITY_STUDIO_PREVIEW_ORIGIN` — **optional**. Leave unset for the embedded
  Studio (preview defaults to the same origin). Only set it if you ever run a
  Studio on a different host than the site.

**How to use it:**

1. Open `/studio` → **Presentation** (new tab in the Studio).
2. Pick a post (or open one from the Structure tool's "Open in Presentation").
   A draft needs at least a **slug** to resolve to `/posts/<slug>` — give a new
   draft a slug first.
3. The site renders in the side iframe on the **draft**; edits refresh it live,
   and clicking any element jumps to its field. Outside Presentation a draft URL
   shows a "Disable Draft Mode" button to exit.

Brand-new drafts (never published) and unpublished edits to live posts both
preview. MDX posts are untouched by draft mode.

## Done — how publishing works now

- `npm run dev` → open `http://localhost:3000/studio`, write a post, **Publish**.
- The post appears at `/posts/<slug>`, in the post list, and on its tag pages —
  within seconds, no `git push`, no rebuild.
- MDX posts are untouched: keep writing `.mdx` files exactly as before
  (see [HOW_TO_CREATE_POSTS.md](../HOW_TO_CREATE_POSTS.md)).
- A slug used by **both** an MDX file and a Sanity post fails the build loudly —
  rename one.

Authors and tags were seeded into Sanity to mirror `meta/authors.yml` and
`meta/tags.yml`, so bylines and tag pages stay unified across both sources.
