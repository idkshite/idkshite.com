import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";
import Logo from "../assets/idkshite-logo.svg";

export default function Index() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container">
        <div>
          <Logo></Logo>
          <h1>
            Hi, We're Next.js & Netlify<span className="fancy">.</span>
          </h1>
          <h2>A blog template with Next.js and Netlify.</h2>
          <SocialList />
        </div>
        <style jsx>
          {`
            .container {
              display: flex;
              align-items: center;
              justify-content: center;
              flex: 1 1 auto;
              padding: 0 1.5rem;
            }
          `}
        </style>
      </div>
    </Layout>
  );
}
