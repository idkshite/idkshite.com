import { freshClient, previewClient } from "../sanity/lib/client";
import { postBySlugQuery, postListQuery } from "../sanity/lib/queries";

// A Sanity post as it enters the unified merge seam — same shape as an MDX
// PostContent entry, tagged with its source.
export type SanityPostContent = {
  readonly source: "sanity";
  readonly _id: string;
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  // null, never undefined: this entry is serialized straight into getStaticProps
  // and Next rejects undefined in props.
  readonly subtitle?: string | null;
  readonly tags?: string[];
};

// Build-time/webhook reads bypass the CDN so freshly published posts are never
// missed (the production dataset is public, so the token is optional here).
// Degrades gracefully: a Sanity outage logs a warning and yields no Sanity
// posts rather than failing the whole static build of the MDX site.
export async function loadSanityPosts(): Promise<SanityPostContent[]> {
  try {
    const posts = await freshClient.fetch(postListQuery);
    return (posts ?? []).map((p: any) => ({
      source: "sanity" as const,
      _id: p._id,
      slug: p.slug,
      title: p.title,
      date: p.date,
      subtitle: p.subtitle ?? null,
      tags: (p.tags ?? []).filter(Boolean),
    }));
  } catch (err: any) {
    console.warn(
      `[posts] Could not load Sanity posts (${err?.message ?? err}); ` +
        `continuing with MDX posts only.`
    );
    return [];
  }
}

// Full post (expanded body) for rendering a single page.
export async function fetchSanityPostBySlug(slug: string) {
  return freshClient.fetch(postBySlugQuery, { slug });
}

// Preview-only: same query, but through the drafts-perspective client so the
// unpublished version (a brand-new draft, or pending edits to a live post) is
// what renders. Bypasses the published merge seam entirely.
export async function fetchDraftPostBySlug(slug: string) {
  return previewClient.fetch(postBySlugQuery, { slug });
}
