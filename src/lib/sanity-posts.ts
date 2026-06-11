import { freshClient } from "../sanity/lib/client";
import { postBySlugQuery, postListQuery } from "../sanity/lib/queries";

// A Sanity post as it enters the unified merge seam — same shape as an MDX
// PostContent entry, tagged with its source.
export type SanityPostContent = {
  readonly source: "sanity";
  readonly _id: string;
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly subtitle?: string;
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
      subtitle: p.subtitle ?? undefined,
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
