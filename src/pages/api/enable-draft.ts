import type { NextApiRequest, NextApiResponse } from "next";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { previewClient } from "../../sanity/lib/client";

// Presentation tool (and preview sharing links) hit this to enter Draft Mode.
// The incoming URL carries a single-use signed secret; validatePreviewUrl checks
// it against Sanity using the Viewer token, so a visitor can't enable drafts by
// guessing a URL.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.url) {
    return res.status(500).json({ message: "Missing request URL" });
  }

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    previewClient,
    req.url
  );

  if (!isValid) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  res.setDraftMode({ enable: true });
  res.writeHead(307, { Location: redirectTo });
  res.end();
}
