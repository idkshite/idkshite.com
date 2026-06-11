import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { fetchPostContent, getPostBySlug } from "../../lib/posts";
import { fetchSanityPostBySlug } from "../../lib/sanity-posts";
import { highlightBodyCode } from "../../lib/highlight";
import fs from "fs";
import { parseISO } from "date-fns";
import PostLayout from "../../components/PostLayout";

import YouTube from "../../components/rich-content/YouTubeWrapper";
import { CodeSandbox } from "../../components/rich-content/CodeSandbox";
import { Replit } from "../../components/rich-content/Replit";
import { Imgur } from "../../components/rich-content/Image";
import { ImgWithText } from "../../components/rich-content/ImageWithText";
import { serialize } from "next-mdx-remote/serialize";
import { Video } from "../../components/rich-content/Video";
import { Link } from "../../components/rich-content/Link";
import { MathDisclaimer } from "../../components/MathDisclaimer";
import { PortableBody } from "../../components/PortableBody";

type SharedProps = {
  title: string;
  subtitle?: string;
  dateString: string;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
};

// Discriminated on `source`: MDX carries a serialized payload, Sanity a
// Portable Text body. The component branches on it at render time.
export type Props =
  | (SharedProps & { source: "mdx"; mdxSource: any })
  | (SharedProps & { source: "sanity"; body: any[] });

const components = {
  YouTube,
  CodeSandbox,
  Replit,
  Video,
  Link,
  Imgur,
  ImgWithText,
  MathDisclaimer,
};

export type CustomMDXComponentName =
  | "YouTube"
  | "CodeSandbox"
  | "Replit"
  | "Video"
  | "Link"
  | "Imgur"
  | "ImgWithText"
  | "MathDisclaimer";

export default function Post(props: Props) {
  return (
    <PostLayout
      title={props.title}
      subtitle={props.subtitle}
      date={parseISO(props.dateString)}
      slug={props.slug}
      tags={props.tags}
      author={props.author}
      description={props.description}
    >
      {props.source === "mdx" ? (
        <MDXRemote {...props.mdxSource} components={components} />
      ) : (
        <PortableBody value={props.body} />
      )}
    </PostLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPostContent();
  return {
    paths: posts.map((post) => "/posts/" + post.slug),
    // Brand-new Sanity posts render on first request without a rebuild.
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { notFound: true };
  }

  if (post.source === "mdx") {
    const file = fs.readFileSync(post.fullPath, "utf8");
    // Using next-mdx-remote v5 API
    const mdxSource = await serialize(file, {
      parseFrontmatter: true,
      mdxOptions: {
        format: "mdx",
        remarkPlugins: [require("remark-prism")],
        development: process.env.NODE_ENV === "development",
      },
    });
    const frontmatter = mdxSource?.frontmatter as any;

    return {
      props: {
        source: "mdx",
        title: frontmatter.title,
        subtitle: frontmatter.subtitle ?? "",
        dateString: frontmatter.date,
        slug: frontmatter.slug,
        description: "",
        tags: frontmatter.tags,
        author: frontmatter.author,
        mdxSource,
      },
    };
  }

  const doc = await fetchSanityPostBySlug(slug);
  if (!doc) {
    return { notFound: true };
  }

  return {
    props: {
      source: "sanity",
      title: doc.title,
      subtitle: doc.subtitle ?? "",
      dateString: doc.date,
      slug: doc.slug,
      description: "",
      tags: doc.tags ?? [],
      author: doc.author,
      body: highlightBodyCode(doc.body ?? []),
    },
    // On-demand ISR backstop in case a publish webhook is missed.
    revalidate: 60,
  };
};
