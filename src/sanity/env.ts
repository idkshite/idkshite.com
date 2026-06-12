// Public Sanity connection values. apiVersion/dataset fall back to sensible
// defaults; projectId must be provided via NEXT_PUBLIC_SANITY_PROJECT_ID
// (project x6znc9mw for idkshite.com).
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Absolute URL of the embedded Studio (e.g. https://idkshite.com/studio). Drives
// stega click-to-edit links in preview; public so the browser overlay can use it.
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;
