import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { resolve } from "./src/sanity/presentation/resolve";

// Preview origin: unset → same origin as the embedded Studio (the common case).
// Set SANITY_STUDIO_PREVIEW_ORIGIN to point a deployed Studio at another host.
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_ORIGIN;

// Embedded Studio mounted at /studio (see src/pages/studio/[[...index]].tsx).
export default defineConfig({
  name: "default",
  title: "idkshite.com",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    // Presentation renders the live site in an iframe and previews drafts via
    // the enable/disable-draft routes (see src/pages/api).
    presentationTool({
      resolve,
      previewUrl: {
        ...(previewOrigin ? { origin: previewOrigin } : {}),
        preview: "/",
        previewMode: {
          enable: "/api/enable-draft",
          disable: "/api/disable-draft",
        },
      },
    }),
    structureTool(),
    codeInput(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
