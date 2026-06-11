import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

// Mirrors meta/authors.yml so Sanity authors resolve to the same byline as MDX.
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      // Slug must match the MDX author slug so getAuthor() resolves both sources.
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "introduction", type: "text" }),
  ],
  preview: { select: { title: "name", subtitle: "slug.current" } },
});
