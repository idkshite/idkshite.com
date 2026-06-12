import { getPostBySlug, MdxPostContent, PostContent } from "./posts";
import { fetchDraftPostBySlug, fetchSanityPostBySlug } from "./sanity-posts";

// Full Sanity post as the page query returns it (title, body, byline slugs…).
export type SanityFullPost = Record<string, any>;

// What the post page should render, after the draft-mode routing decision.
// MDX carries the merge entry (the page reads its file); Sanity carries the
// fetched document; notFound short-circuits to a 404.
export type PostDecision =
  | { kind: "mdx"; post: MdxPostContent }
  | { kind: "sanity"; doc: SanityFullPost }
  | { kind: "notFound" };

// Injected like `PostSources` so the routing decision is unit-testable with
// fakes — no fs, no network.
export type PostResolverDeps = {
  getPublished: (slug: string) => Promise<PostContent | undefined>;
  fetchPublishedSanity: (slug: string) => Promise<SanityFullPost | null>;
  fetchDraftSanity: (slug: string) => Promise<SanityFullPost | null>;
};

const defaultDeps: PostResolverDeps = {
  getPublished: getPostBySlug,
  fetchPublishedSanity: fetchSanityPostBySlug,
  fetchDraftSanity: fetchDraftPostBySlug,
};

// The single draft-mode routing seam. Pure given its deps:
//  - MDX posts are file-based and entirely outside draft mode — always MDX.
//  - draft mode on → fetch the draft directly (covers brand-new drafts the
//    published merge never surfaces, and unpublished edits to live posts).
//  - draft mode off → today's behaviour exactly (published merge + CDN-bypass
//    published fetch).
export async function resolvePost(
  { slug, draftMode }: { slug: string; draftMode: boolean },
  deps: PostResolverDeps = defaultDeps
): Promise<PostDecision> {
  const published = await deps.getPublished(slug);

  if (published?.source === "mdx") {
    return { kind: "mdx", post: published };
  }

  if (draftMode) {
    const doc = await deps.fetchDraftSanity(slug);
    return doc ? { kind: "sanity", doc } : { kind: "notFound" };
  }

  if (!published) {
    return { kind: "notFound" };
  }

  const doc = await deps.fetchPublishedSanity(slug);
  return doc ? { kind: "sanity", doc } : { kind: "notFound" };
}
