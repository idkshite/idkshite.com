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

export default function Index({ posts, tags, pagination }) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container">
        <div className={"content"}>
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
        </div>
        <style jsx>
          {`
            .logo {
              margin-bottom: ${VERTICAL_MARGIN.DEFAULT}px;
              max-width: 300px;
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
  );
}
