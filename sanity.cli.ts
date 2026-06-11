import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Studio is embedded in the Next.js app; no standalone autoUpdates host.
  autoUpdates: true,
});
