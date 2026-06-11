import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import type { NextApiRequest, NextApiResponse } from "next";

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
//   filter:     _type == "post"
//   projection: { "path": "/posts/" + slug.current }
//   secret:     SANITY_REVALIDATE_SECRET
// On a valid signature, on-demand-revalidates the post path plus the listing.
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

  try {
    await res.revalidate(body.path);
    // The post must also appear in the list immediately.
    await res.revalidate("/posts");
    return res.status(200).json({ revalidated: true, path: body.path });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
