import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

// Mirrors meta/tags.yml so Sanity tags resolve to the same tag pages as MDX.
export const tag = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      // Slug must match the MDX tag slug so getTag() resolves both sources.
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "name", subtitle: "slug.current" } },
});
