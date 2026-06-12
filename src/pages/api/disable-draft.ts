import type { NextApiRequest, NextApiResponse } from "next";

// Exit Draft Mode and return to published content.
export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<void>
): void {
  res.setDraftMode({ enable: false });
  res.writeHead(307, { Location: "/" });
  res.end();
}
