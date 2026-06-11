import { defineType, defineField } from "sanity";
import { DocumentVideoIcon } from "@sanity/icons";

// URL-based video embed (maps to the <Video src /> MDX component).
export const video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: "src",
      title: "Video URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { src: "src" },
    prepare: ({ src }) => ({ title: "Video", subtitle: src }),
  },
});
