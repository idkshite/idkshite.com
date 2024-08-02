import React from "react";
import Author from "./Author";
import Copyright from "./Copyright";
import Date from "./Date";
import Layout from "./Layout";
import BasicMeta from "./meta/BasicMeta";
import JsonLdMeta from "./meta/JsonLdMeta";
import OpenGraphMeta from "./meta/OpenGraphMeta";
import TwitterCardMeta from "./meta/TwitterCardMeta";
import { SocialList } from "./SocialList";
import TagButton from "./TagButton";
import { getAuthor } from "../lib/authors";
import { getTag } from "../lib/tags";
import PostContent from "./PostContent";
import { COLOR } from "../../public/styles/colors";
import { LINE_HEIGHT, VERTICAL_MARGIN } from "../../public/styles/font";

type Props = {
  title: string;
  subtitle?: string;
  date: Date;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  children: React.ReactNode;
};
export default function PostLayout({
  title,
  subtitle,
  date,
  slug,
  author,
  tags,
  description = "",
  children,
}: Props) {
  const keywords = tags?.map((it) => getTag(it).name);
  const authorName = author; // getAuthor(author).name;
  return (
    <Layout>
      <BasicMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        description={description}
      />
      <TwitterCardMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <OpenGraphMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={date}
        author={authorName}
        description={description}
      />
      <div className={"container"}>
        <article>
          <header>
            <h3 className={"small-title3 tagline-title"}>
              I don't know shite about:
            </h3>
            <h1 className={"title2 post-title"}>{title}</h1>
            <h2 className={"small-title1 post-subtitle"}>{subtitle}</h2>
          </header>
          <PostContent>{children}</PostContent>
        </article>
        <footer>
          <div className={"metadata"}>
            <ul className={"tag-list"}>
              {tags?.map((it, i) => (
                <li key={i}>
                  <TagButton tag={getTag(it)} />
                </li>
              ))}
            </ul>
            <div>
              <Date date={date} />
            </div>
          </div>
          <Copyright />
        </footer>
      </div>
      <style jsx>
        {`
          .container {
            display: block;
            max-width: 800px;
            width: 100%;
            margin: 0 auto;
            padding: 0 1.5rem;
            box-sizing: border-box;
            z-index: 0;
          }
          .metadata {
            display: flex;
            justify-content: space-between;
          }
          article {
            flex: 1 0 auto;
          }
          .post-title {
            margin-bottom: 5px;
          }
          .post-subtitle {
            color: ${COLOR.DEFAULT_TITLE};
            margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
          }
          .tagline-title {
            color: ${COLOR.SUBTLE_LABEL};
            line-height: ${LINE_HEIGHT.DENSE}px;
            margin-bottom: ${VERTICAL_MARGIN.QUARTER}px;
          }
          .tag-list {
            list-style: none;
            margin: 0 0.5rem 0 0;
            padding: 0;
          }
          .tag-list li {
            display: inline-block;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .social-list {
            margin-top: 3rem;
            text-align: center;
          }

          @media (min-width: 769px) {
            .container {
              display: flex;
              flex-direction: column;
            }
          }
        `}
      </style>
    </Layout>
  );
}
