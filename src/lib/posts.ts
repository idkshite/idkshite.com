import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";
import { loadSanityPosts, SanityPostContent } from "./sanity-posts";

const postsDirectory = path.join(process.cwd(), "content/posts");

// Discriminated union on `source`: the per-post page branches on it at render
// time. Both variants share the listing/pagination/tag shape so no consumer
// needs to know which source a post came from.
export type MdxPostContent = {
  readonly source: "mdx";
  readonly date: string;
  readonly title: string;
  readonly slug: string;
  // null, never undefined — serialized directly into getStaticProps props.
  readonly subtitle?: string | null;
  readonly tags?: string[];
  readonly fullPath: string;
};

export type PostContent = MdxPostContent | SanityPostContent;

// Dependency boundary so the merge seam can be tested with fakes (no fs, no network).
export type PostSources = {
  loadMdxPosts: () => MdxPostContent[];
  loadSanityPosts: () => Promise<SanityPostContent[]>;
};

export function loadMdxPosts(): MdxPostContent[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        date: string;
        title: string;
        subtitle?: string;
        tags: string[];
        slug: string;
      };

      const slug = fileName.replace(/\.mdx$/, "");
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return {
        source: "mdx" as const,
        date: matterData.date,
        title: matterData.title,
        slug: matterData.slug,
        subtitle: matterData.subtitle ?? null,
        tags: matterData.tags,
        fullPath,
      };
    });
}

const defaultSources: PostSources = {
  loadMdxPosts,
  loadSanityPosts,
};

// The single merge point. Throws on a slug shared across sources (hard failure,
// never a silent URL collision), then returns one date-descending list.
export function mergePostSources(
  mdx: MdxPostContent[],
  sanity: SanityPostContent[]
): PostContent[] {
  const mdxSlugs = new Set(mdx.map((it) => it.slug));
  const collisions = sanity
    .map((it) => it.slug)
    .filter((slug) => mdxSlugs.has(slug));
  if (collisions.length > 0) {
    throw new Error(
      `Slug collision between MDX and Sanity posts: ${collisions.join(", ")}. ` +
        `Rename one source so every post has a unique /posts/<slug>.`
    );
  }

  return [...mdx, ...sanity].sort((a, b) => (a.date < b.date ? 1 : -1));
}

let postCache: Promise<PostContent[]> | undefined;

export function fetchPostContent(
  sources: PostSources = defaultSources
): Promise<PostContent[]> {
  const compute = async () => {
    const [mdx, sanity] = await Promise.all([
      sources.loadMdxPosts(),
      sources.loadSanityPosts(),
    ]);
    return mergePostSources(mdx, sanity);
  };
  // Only cache the real, default-sourced merge; injected fakes always recompute.
  if (sources === defaultSources) {
    return (postCache ??= compute());
  }
  return compute();
}

export async function countPosts(tag?: string): Promise<number> {
  const posts = await fetchPostContent();
  return posts.filter((it) => !tag || (it.tags && it.tags.includes(tag))).length;
}

export async function listPostContent(
  page: number,
  limit: number,
  tag?: string
): Promise<PostContent[]> {
  const posts = await fetchPostContent();
  return posts
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}

export async function getPostBySlug(
  slug: string
): Promise<PostContent | undefined> {
  const posts = await fetchPostContent();
  return posts.find((it) => it.slug === slug);
}
