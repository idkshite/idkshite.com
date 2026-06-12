import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

// Singleton (fixed _id "siteSettings") holding editable chrome that lives
// outside any post — currently just the home page intro.
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "homeIntro",
      title: "Home page intro",
      // Plain rich text: paragraphs with bold/italic, matching the hardcoded
      // fallback in pages/index.tsx. No custom blocks needed here.
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [],
          },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
