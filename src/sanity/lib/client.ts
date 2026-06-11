import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Runtime reads hit the CDN (fast, may lag a few seconds behind publishes).
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Build-time (getStaticProps/Paths) and webhook reads must bypass the CDN and
// authenticate, so freshly published content is never missed.
export const freshClient = client.withConfig({
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});
