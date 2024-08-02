import { GetStaticProps, GetStaticPaths } from "next";
import { MDXRemote } from "next-mdx-remote";
import matter from "gray-matter";
import { fetchPostContent, slugToPostContent } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from "date-fns";
import PostLayout from "../../components/PostLayout";

import YouTube from "../../components/rich-content/YouTubeWrapper";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { CodeSandbox } from "../../components/rich-content/CodeSandbox";
import { Replit } from "../../components/rich-content/Replit";
import { Imgur } from "../../components/rich-content/Image";
import { ImgWithText } from "../../components/rich-content/ImageWithText";
import { serialize } from "next-mdx-remote/serialize";
import { Video } from "../../components/rich-content/Video";
import { Link } from "../../components/rich-content/Link";
import { ReactNode } from "react";
import { MathDisclaimer } from "../../components/MathDisclaimer";
import { groq } from "next-sanity";
import { client } from "../../sanity/client";

export type Props = {
  title: string;
  subtitle?: string;
  dateString: string;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  source: any;
  postSource: "sanity" | "markdown";
  body?: any;
};

const components: { [key in CustomMDXComponentName]: ReactNode } = {
  YouTube,
  TwitterTweetEmbed,
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
  | "TwitterTweetEmbed"
  | "CodeSandbox"
  | "Replit"
  | "Video"
  | "Link"
  | "Imgur"
  | "ImgWithText"
  | "MathDisclaimer";

export default function Post({
  title,
  subtitle,
  dateString,
  slug,
  tags,
  author,
  description = "",
  source,
  postSource,
  body,
}: Props) {
  console.log("body", body);
  return (
    <PostLayout
      title={title}
      subtitle={subtitle}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
      author={author}
      description={description}
    >
      <ContentByPostSource
        postSource={postSource}
        source={source}
        components={components}
        sanityBody={body}
      />
    </PostLayout>
  );
}

const ContentByPostSource = ({
  components,
  postSource,
  source,
  sanityBody,
}) => {
  switch (postSource) {
    case "sanity": {
      return <h1>soon</h1>; // sanityBody
    }
    case "markdown": {
      return <MDXRemote {...source} components={components} />;
    }
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch Markdown posts
  const markdownPaths = fetchPostContent().map((it) => ({
    params: { post: it.slug },
  }));

  // Fetch Sanity posts
  const query = groq`
    *[_type == "blogPost" && defined(slug.current)] {
      "slug": slug.current
    }
  `;
  const sanityPosts = await client.fetch(query);
  const sanityPaths = sanityPosts.map((post) => ({
    params: { post: post.slug },
  }));

  return {
    paths: [...markdownPaths, ...sanityPaths],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string;

  // Check if the post exists in Markdown
  const markdownPath = slugToPostContent[slug]?.fullPath;
  if (markdownPath && fs.existsSync(markdownPath)) {
    const source = fs.readFileSync(markdownPath, "utf8");
    const { content, data } = matter(source, {
      engines: {
        yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
      },
    });
    const mdxSource = await serialize(content, {
      scope: data,
      mdxOptions: {
        remarkPlugins: [require("remark-prism"), {}],
      },
    });
    return {
      props: {
        title: data.title,
        subtitle: data.subtitle ?? "",
        dateString: data.date,
        slug: data.slug,
        description: "",
        tags: data.tags,
        author: data.author,
        source: mdxSource,
        postSource: "markdown",
      },
    };
  }

  // If not in Markdown, check Sanity
  const query = groq`
    *[_type == "blogPost" && slug.current == $slug][0] {
      title,
      subtitle,
      "dateString": publishedAt,
      "slug": slug.current,
      description,
      tags,
      "author": author->name,
      body
    }
  `;
  const post = await client.fetch(query, { slug });

  if (!!post) {
    return {
      props: {
        ...post,
        postSource: "sanity",
      },
    };
  }

  throw new Error(`Couldn't find post ${slug} in markdown or sanity`);
};
