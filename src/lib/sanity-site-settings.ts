import { freshClient, previewClient } from "../sanity/lib/client";
import { siteSettingsQuery } from "../sanity/lib/queries";

// Portable Text intro shown on the home page; null when the singleton is unset
// so the page can fall back to its hardcoded copy.
export type HomeIntro = any[] | null;

// Build-time/webhook read: bypasses the CDN so freshly published edits show up.
// Degrades gracefully — a Sanity outage keeps the hardcoded fallback rather than
// failing the static build.
export async function fetchHomeIntro(): Promise<HomeIntro> {
  try {
    const settings = await freshClient.fetch(siteSettingsQuery);
    return settings?.homeIntro ?? null;
  } catch (err: any) {
    console.warn(
      `[home] Could not load siteSettings (${err?.message ?? err}); ` +
        `using hardcoded intro.`
    );
    return null;
  }
}

// Preview-only: drafts perspective + stega, so unpublished edits render with
// click-to-edit overlays.
export async function fetchDraftHomeIntro(): Promise<HomeIntro> {
  const settings = await previewClient.fetch(siteSettingsQuery);
  return settings?.homeIntro ?? null;
}
