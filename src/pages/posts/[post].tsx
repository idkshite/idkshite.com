import { GetStaticProps, GetStaticPaths } from "next";
import { MDXRemote } from 'next-mdx-remote'
import matter from "gray-matter";
import { fetchPostContent } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from "date-fns";
import PostLayout from "../../components/PostLayout";

import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { CodeSandbox } from "../../components/rich-content/CodeSandbox";
import { Replit } from "../../components/rich-content/Replit";
import { Imgur } from "../../components/rich-content/Image";
import { ImgWithText } from "../../components/rich-content/ImageWithText";
import {serialize} from "next-mdx-remote/serialize";

export type Props = {
  title: string;
  subtitle?: string;
  dateString: string;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  source: any;
};

const components = {
  YouTube,
  TwitterTweetEmbed,
  CodeSandbox,
  Replit,
  Imgur,
  ImgWithText,
};
const slugToPostContent = ((postContents) => {
  let hash = {};
  postContents.forEach((it) => (hash[it.slug] = it));
  return hash;
})(fetchPostContent());

export default function Post({
  title,
  subtitle,
  dateString,
  slug,
  tags,
  author,
  description = "",
  source,
}: Props) {
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
      <MDXRemote {...source} components={components}/>
    </PostLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map((it) => "/posts/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string;
  const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  const mdxSource = await serialize(content, { scope: data });
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
    },
  };
};
