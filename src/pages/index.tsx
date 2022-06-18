import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";
import Logo from "../assets/idkshite-logo.svg";
import PostList from "../components/PostList";
import { GetStaticProps } from "next";
import { countPosts, listPostContent } from "../lib/posts";
import config from "../lib/config";
import { listTags } from "../lib/tags";
import { VERTICAL_MARGIN } from "../../public/styles/font";
import { ViewerLocations } from "../components/ViewerLocations";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Index({ posts, tags, pagination, flags }) {
  return (
    <>
      <Layout>
        <BasicMeta url={"/"} />
        <OpenGraphMeta url={"/"} />
        <TwitterCardMeta url={"/"} />
        <div className="container">
          <div className={"content min-h-screen"}>
            <div className={"logo"}>
              <Logo></Logo>
            </div>
            <h1 className="title2 title">“I don’t know shite about...”</h1>
            <p>
              I often realize I don't know shite about certain concepts,
              technologies and processes that I should understand. I have a
              superficial understanding but not enough in depth knowledge to be
              productive.
            </p>
            <p>
              This blog aims to educate myself to close knowledge gaps and "know
              my shite".
            </p>
            {flags.length >= 3 ? (
              <div className="flex w-full">
                <ViewerLocations flags={flags} />
              </div>
            ) : null}
          </div>

          <style jsx>
            {`
              .logo {
                margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
                max-width: 300px;
                min-width: 100px;
              }
              .title {
                margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
              }
              .container {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1 1 auto;
                padding: 0 1.5rem;
              }
              .content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                max-width: 547px;
              }
            `}
          </style>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      flags: await getCountryFlagsWhoVisited(),
    },
  };
}

async function getCountryFlagsWhoVisited() {
  const results = await getAllResultsFromAnalyticsDB();

  const countries = results
    .map((page) => {
      if ("icon" in page && "emoji" in page.icon) return page?.icon?.emoji;
      return false;
    })
    .filter((flag: string | boolean) => flag && flag !== "💩");
  const distinctFlags = Array.from(new Set(countries));

  return distinctFlags;
}
// TODO: this is broken and will not yield the whole db. its good enough for now but need fixing
// TODO: Make this less imperative
async function getAllResultsFromAnalyticsDB() {
  let start_page_id; // notion will start requesting pages from the db starting with this page
  let results = [];
  let currentResponse = await getPaginatedResultsFromAnalyticsDB(start_page_id);
  console.log("currentResponse", currentResponse.length);
  while (currentResponse.length === 100) {
    results = [...results, ...currentResponse];
    start_page_id = (
      currentResponse[currentResponse.length - 1] as { id: string }
    ).id;
    currentResponse = await getPaginatedResultsFromAnalyticsDB(start_page_id);
  }
  return results;
}

async function getPaginatedResultsFromAnalyticsDB(start_page_id, limit = 100) {
  const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
  });

  const notionResponse = await notion.databases.query({
    database_id: process.env.ANALYTICS_NOTION_DATABASE_ID,
    start_cursor: start_page_id,
    page_size: limit,
    sorts: [
      {
        property: "Country",
        direction: "ascending",
      },
    ],
  });
  return notionResponse.results as {}[];
}
