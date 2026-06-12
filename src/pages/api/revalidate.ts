import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import type { NextApiRequest, NextApiResponse } from "next";
import { postListingPaths } from "../../lib/listing-paths";

// Raw body is required for HMAC signature verification.
export const config = { api: { bodyParser: false } };

async function readRawBody(req: NextApiRequest): Promise<string> {
  let data = "";
  for await (const chunk of req) {
    data += typeof chunk === "string" ? chunk : chunk.toString("utf8");
  }
  return data;
}

// Signed Sanity webhook (Pages Router). Configure a GROQ-powered webhook in
// Sanity Manage:
//   filter:     _type == "post" || _type == "siteSettings"
//   projection: { "path": select(_type == "siteSettings" => "/", "/posts/" + slug.current) }
//   secret:     SANITY_REVALIDATE_SECRET
// A siteSettings change revalidates "/". A post change revalidates the post page
// plus every listing that embeds a post title (main list, pagination, tags).
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "Missing SANITY_REVALIDATE_SECRET" });
  }

  const signature = req.headers[SIGNATURE_HEADER_NAME] as string | undefined;
  const rawBody = await readRawBody(req);

  const valid = signature
    ? await isValidSignature(rawBody, signature, secret.trim())
    : false;
  if (!valid) {
    return res.status(401).json({ message: "Invalid signature" });
  }

  const body = rawBody.trim() ? JSON.parse(rawBody) : {};
  if (!body?.path) {
    return res.status(400).json({ message: "Bad Request: missing path" });
  }

  // Absorb Content Lake / CDN eviction lag before revalidating.
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // A post title appears across every listing, so a post change must refresh
  // them all; the home page ("/") is the only thing a siteSettings change hits.
  const paths =
    body.path === "/"
      ? ["/"]
      : [body.path, ...(await postListingPaths())].filter(
          (path, i, all) => all.indexOf(path) === i
        );

  try {
    await Promise.all(paths.map((path) => res.revalidate(path)));
    return res.status(200).json({ revalidated: true, paths });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
