import { describe, expect, it, vi } from "vitest";
import { resolvePost, PostResolverDeps } from "./post-resolver";
import { MdxPostContent } from "./posts";
import { SanityPostContent } from "./sanity-posts";

// The whole draft-mode contract lives in resolvePost: which source renders, and
// whether the draft fetch runs at all. Inject fakes for the published lookup and
// both Sanity fetches (the only dependency boundaries) — no fs, no network.

const mdxPost: MdxPostContent = {
  source: "mdx",
  slug: "an-mdx-post",
  title: "An MDX post",
  date: "2022-01-01",
  tags: ["react"],
  fullPath: "/content/an-mdx-post.mdx",
};

const publishedSanity: SanityPostContent = {
  source: "sanity",
  _id: "sanity-1",
  slug: "live-post",
  title: "Live post",
  date: "2022-02-15",
};

const draftDoc = { _id: "drafts.x", title: "Draft only", body: [] };
const publishedDoc = { _id: "live-post", title: "Live post", body: [] };

const deps = (over: Partial<PostResolverDeps>): PostResolverDeps => ({
  getPublished: async () => undefined,
  fetchPublishedSanity: async () => null,
  fetchDraftSanity: async () => null,
  ...over,
});

describe("resolvePost draft-mode routing", () => {
  it("(a) draft mode on + a draft-only slug → resolves the draft the merge never surfaces", async () => {
    const fetchDraftSanity = vi.fn(async () => draftDoc);
    // The published merge has no record of this brand-new draft.
    const decision = await resolvePost(
      { slug: "draft-only", draftMode: true },
      deps({ getPublished: async () => undefined, fetchDraftSanity })
    );
    expect(decision).toEqual({ kind: "sanity", doc: draftDoc });
    expect(fetchDraftSanity).toHaveBeenCalledWith("draft-only");
  });

  it("(a') draft mode on + a published post → previews the unpublished edits, not the live version", async () => {
    const fetchPublishedSanity = vi.fn(async () => publishedDoc);
    const fetchDraftSanity = vi.fn(async () => draftDoc);
    const decision = await resolvePost(
      { slug: "live-post", draftMode: true },
      deps({
        getPublished: async () => publishedSanity,
        fetchPublishedSanity,
        fetchDraftSanity,
      })
    );
    expect(decision).toEqual({ kind: "sanity", doc: draftDoc });
    expect(fetchPublishedSanity).not.toHaveBeenCalled();
  });

  it("(b) draft mode off → published path, draft fetch never runs", async () => {
    const fetchDraftSanity = vi.fn(async () => draftDoc);
    const fetchPublishedSanity = vi.fn(async () => publishedDoc);
    const decision = await resolvePost(
      { slug: "live-post", draftMode: false },
      deps({
        getPublished: async () => publishedSanity,
        fetchPublishedSanity,
        fetchDraftSanity,
      })
    );
    expect(decision).toEqual({ kind: "sanity", doc: publishedDoc });
    expect(fetchDraftSanity).not.toHaveBeenCalled();
  });

  it("(c) draft mode on + an MDX slug → falls through to MDX, no draft fetch", async () => {
    const fetchDraftSanity = vi.fn(async () => draftDoc);
    const decision = await resolvePost(
      { slug: "an-mdx-post", draftMode: true },
      deps({ getPublished: async () => mdxPost, fetchDraftSanity })
    );
    expect(decision).toEqual({ kind: "mdx", post: mdxPost });
    expect(fetchDraftSanity).not.toHaveBeenCalled();
  });

  it("draft mode on + nonexistent draft → notFound", async () => {
    const decision = await resolvePost(
      { slug: "ghost", draftMode: true },
      deps({ fetchDraftSanity: async () => null })
    );
    expect(decision).toEqual({ kind: "notFound" });
  });
});
