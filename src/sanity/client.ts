// ./src/sanity/lib/client.ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-03-25", // https://www.sanity.io/docs/api-versioning
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
