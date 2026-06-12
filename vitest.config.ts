import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // The merge-seam test injects fakes and never calls Sanity, but importing
    // the module graph constructs the Sanity client, which requires a projectId.
    env: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: "test",
    },
  },
});
