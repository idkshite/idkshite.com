import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import type { NextApiRequest, NextApiResponse } from "next";
import { postListingPaths } from "../../lib/listing-paths";
import {uniq} from "lodash";

// Raw body is required for HMAC signature verification.
export const config = { api: { bodyParser: false } };

async function readRawBody(req: NextApiRequest): Promise<string> {
  let data = "";
  for await (const chunk of req) {
    data += typeof chunk === "string" ? chunk : chunk.toString("utf8");
  }
  return data;
}

// The pages a changed document affects. null means "nothing to do" — the
// webhook has no filter, so unrelated types reach us and should no-op (not
// error, which Sanity would retry).
async function affectedPaths(body: {
  _type?: string;
  slug?: string;
}): Promise<string[] | null> {
  switch (body._type) {
    case "siteSettings":
      return ["/"];

    case "post":
      return body.slug
        ? uniq([`/posts/${body.slug}`, ...(await postListingPaths())])
        : await postListingPaths();

    case "author":
    case "tag":
      return await postListingPaths();

    default:
      return null;
  }
}

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

  const paths = await affectedPaths(body);
  if (!paths) {
    // Unrelated type (no filter on the webhook). 200 so Sanity treats it as
    // delivered instead of retrying.
    return res.status(200).json({ revalidated: false, type: body._type ?? null });
  }

  try {
    await Promise.all(paths.map((path) => res.revalidate(path)));
    return res.status(200).json({ revalidated: true, paths });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
