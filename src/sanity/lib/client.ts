import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "../env";

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

// Draft-preview reads only. Fresh (no CDN), authenticated, and on the `drafts`
// perspective so unpublished documents resolve; stega-encodes strings for
// click-to-edit overlays. The token is server-only (the env var is not
// NEXT_PUBLIC), so the same instance is safe to hand to the browser's
// useLiveMode — there it carries no token and only opens the live channel.
// Published reads (client/freshClient) are deliberately left untouched.
export const previewClient = client.withConfig({
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "drafts",
  // `enabled` must be set explicitly — withConfig inherits the base client's
  // `enabled: false`, so passing only `studioUrl` would leave stega off and
  // produce no overlays. Guard on studioUrl: the client throws if enabled is
  // true without one.
  stega: { enabled: Boolean(studioUrl), studioUrl },
});
