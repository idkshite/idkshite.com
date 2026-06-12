import { VisualEditing } from "@sanity/visual-editing/next-pages-router";
import { useLiveMode } from "@sanity/react-loader";
import { DisableDraftMode } from "./DisableDraftMode";
import { previewClient } from "../sanity/lib/client";

// Mounted only in Draft Mode (see _app). VisualEditing renders the click-to-edit
// overlays and refreshes the page when content changes in Presentation;
// useLiveMode opens the live channel that drives those refreshes. The token on
// previewClient is server-only, so in the browser this client just listens.
export default function SanityVisualEditing() {
  useLiveMode({ client: previewClient });

  return (
    <>
      <VisualEditing />
      <DisableDraftMode />
    </>
  );
}
