import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

// Embedded Studio mounted at /studio (see src/pages/studio/[[...index]].tsx).
export default defineConfig({
  name: "default",
  title: "idkshite.com",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    codeInput(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
