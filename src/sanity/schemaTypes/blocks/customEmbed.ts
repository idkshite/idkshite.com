import { defineType, defineField } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

// Escape hatch: embed any URL as an iframe so future interactive demos need no
// code or deploy. Mirrors how interactivity is already externalised (Replit etc).
export const customEmbed = defineType({
  name: "customEmbed",
  title: "Custom Embed (iframe)",
  type: "object",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title (accessibility)",
      type: "string",
    }),
    defineField({
      name: "height",
      title: "Height (px)",
      type: "number",
      initialValue: 500,
    }),
  ],
  preview: {
    select: { url: "url", title: "title" },
    prepare: ({ url, title }) => ({ title: title || "Custom Embed", subtitle: url }),
  },
});
