import { describe, expect, it } from "vitest";
import { fetchPostContent, MdxPostContent, PostSources } from "./posts";
import { SanityPostContent } from "./sanity-posts";

// The hybrid contract lives entirely in the unified merge seam. Inject a fake
// MDX list and a fake Sanity client (the only dependency boundary) — no fs, no
// network — and assert the merged behaviour.
const mdx: MdxPostContent[] = [
  {
    source: "mdx",
    slug: "older-mdx",
    title: "Older MDX",
    date: "2022-01-01",
    tags: ["react"],
    fullPath: "/content/older-mdx.mdx",
  },
  {
    source: "mdx",
    slug: "newest-mdx",
    title: "Newest MDX",
    date: "2022-04-01",
    tags: ["css"],
    fullPath: "/content/newest-mdx.mdx",
  },
];

const sanity: SanityPostContent[] = [
  {
    source: "sanity",
    _id: "sanity-1",
    slug: "middle-sanity",
    title: "Middle Sanity",
    date: "2022-02-15",
    tags: ["react"],
  },
];

const fakeSources = (
  mdxPosts: MdxPostContent[],
  sanityPosts: SanityPostContent[]
): PostSources => ({
  loadMdxPosts: () => mdxPosts,
  loadSanityPosts: async () => sanityPosts,
});

describe("fetchPostContent merge seam", () => {
  it("sorts the merged result by date descending across both sources", async () => {
    const posts = await fetchPostContent(fakeSources(mdx, sanity));
    expect(posts.map((p) => p.slug)).toEqual([
      "newest-mdx",
      "middle-sanity",
      "older-mdx",
    ]);
  });

  it("preserves the source tag on each entry", async () => {
    const posts = await fetchPostContent(fakeSources(mdx, sanity));
    const bySlug = Object.fromEntries(posts.map((p) => [p.slug, p.source]));
    expect(bySlug["newest-mdx"]).toBe("mdx");
    expect(bySlug["middle-sanity"]).toBe("sanity");
  });

  it("filters by tag across both sources", async () => {
    const posts = await fetchPostContent(fakeSources(mdx, sanity));
    const react = posts.filter((p) => p.tags?.includes("react"));
    expect(react.map((p) => p.slug).sort()).toEqual([
      "middle-sanity",
      "older-mdx",
    ]);
  });

  it("throws on a slug shared between MDX and Sanity (collision guard)", async () => {
    const collidingSanity: SanityPostContent[] = [
      { ...sanity[0], slug: "older-mdx" },
    ];
    await expect(
      fetchPostContent(fakeSources(mdx, collidingSanity))
    ).rejects.toThrow(/collision/i);
  });
});
