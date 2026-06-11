import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import TagPostList from "../../../components/TagPostList";
import config from "../../../lib/config";
import { countPosts, listPostContent, PostContent } from "../../../lib/posts";
import { getTag, listTags, TagContent } from "../../../lib/tags";
import Head from "next/head";

type Props = {
  posts: PostContent[];
  tag: TagContent;
  page?: string;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ posts, tag, pagination, page }: Props) {
  const url = `/posts/tags/${tag.name}` + (page ? `/${page}` : "");
  const title = tag.name;
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <TagPostList posts={posts} tag={tag} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queries = params.slug as string[];
  const [slug, page] = [queries[0], queries[1]];
  const tag = getTag(slug);
  // fallback: "blocking" can hit arbitrary slugs; only known tags exist.
  if (!tag) {
    return { notFound: true };
  }
  const posts = await listPostContent(
    page ? parseInt(page as string) : 1,
    config.posts_per_page,
    slug
  );
  const pagination = {
    current: page ? parseInt(page as string) : 1,
    pages: Math.ceil((await countPosts(slug)) / config.posts_per_page),
  };
  const props: {
    posts: PostContent[];
    tag: TagContent;
    pagination: { current: number; pages: number };
    page?: string;
  } = { posts, tag, pagination };
  if (page) {
    props.page = page;
  }
  return {
    props,
    // Time-based backstop so newly published Sanity posts surface on tag pages.
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tagPaths = await Promise.all(
    listTags().map(async (tag) => {
      const pages = Math.ceil((await countPosts(tag.slug)) / config.posts_per_page);
      return Array.from(Array(pages).keys()).map((page) =>
        page === 0
          ? {
              params: { slug: [tag.slug] },
            }
          : {
              params: { slug: [tag.slug, (page + 1).toString()] },
            }
      );
    })
  );
  return {
    // New Sanity posts can push a tag past a page boundary; render the new
    // pagination page on first request instead of 404ing until a rebuild.
    paths: tagPaths.flat(),
    fallback: "blocking",
  };
};
