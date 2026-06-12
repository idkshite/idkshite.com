import config from "./config";
import { countPosts } from "./posts";
import { listTags } from "./tags";

// Inclusive integer range [start, end]; empty when end < start.
const range = (start: number, end: number): number[] =>
  Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

// Every statically-generated path that embeds a post title: the main paginated
// list plus each tag's paginated list. The revalidate webhook refreshes all of
// them when a post changes, since the single post page is not the only place a
// title appears. Mirrors the getStaticPaths logic of the listing routes.
export async function postListingPaths(): Promise<string[]> {
  const perPage = config.posts_per_page;

  const totalPages = Math.ceil((await countPosts()) / perPage);
  // Page 1 lives at /posts; pages 2..N at /posts/page/N.
  const mainPaths = [
    "/posts",
    ...range(2, totalPages).map((n) => `/posts/page/${n}`),
  ];

  const tagPaths = (
    await Promise.all(
      listTags().map(async (tag) => {
        const pages = Math.ceil((await countPosts(tag.slug)) / perPage);
        // A tag with no posts generates no static path (matches getStaticPaths).
        // Page 1 at /posts/tags/<slug>; pages 2..N append /<n>.
        return pages === 0
          ? []
          : [
              `/posts/tags/${tag.slug}`,
              ...range(2, pages).map((n) => `/posts/tags/${tag.slug}/${n}`),
            ];
      })
    )
  ).flat();

  return [...mainPaths, ...tagPaths];
}
