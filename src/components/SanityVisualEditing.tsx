import { VisualEditing } from "@sanity/visual-editing/next-pages-router";
import { DisableDraftMode } from "./DisableDraftMode";

// Mounted only in Draft Mode (see _app). VisualEditing renders the click-to-edit
// overlays and, on each draft save, re-runs getStaticProps so the preview
// updates automatically (its built-in `router.replace` refresh).
//
// Deliberately NO useLiveMode: it flags `livePreviewEnabled`, which makes
// VisualEditing SKIP that refresh and instead wait for `@sanity/react-loader`
// useQuery to stream updates. We render through getStaticProps/PortableText (no
// useQuery) — partly so server-side code highlighting re-runs — so live mode
// would leave the preview frozen until a manual reload.
export default function SanityVisualEditing() {
  return (
    <>
      <VisualEditing />
      <DisableDraftMode />
    </>
  );
}
