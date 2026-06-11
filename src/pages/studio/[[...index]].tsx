import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

// Embedded Sanity Studio. Pages-Router catch-all so /studio and all nested
// Studio routes render the same SPA. Not statically optimised — it is a
// client-side app that talks to Sanity directly.
export default function StudioPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextStudio config={config} />
    </>
  );
}
