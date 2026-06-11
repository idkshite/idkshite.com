import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon, ImageIcon } from "@sanity/icons";

// Mirrors the MDX frontmatter (title/slug/subtitle/date/author/tags) plus a
// Portable Text body whose custom blocks map 1:1 to the existing rich-content
// React components.
export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Publish date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          // Inline link annotation maps to the existing <a> mark renderer.
          marks: {
            annotations: [
              defineArrayMember({
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    validation: (rule) =>
                      rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({ type: "code" }),
        defineArrayMember({
          type: "image",
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
              validation: (rule) =>
                rule.required().warning("Alt text is important for accessibility and SEO"),
            }),
            defineField({ name: "caption", type: "string" }),
          ],
        }),
        defineArrayMember({ type: "youtube" }),
        defineArrayMember({ type: "video" }),
        defineArrayMember({ type: "codeSandbox" }),
        defineArrayMember({ type: "replit" }),
        defineArrayMember({ type: "mathDisclaimer" }),
        defineArrayMember({ type: "customEmbed" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", date: "date" },
    prepare: ({ title, subtitle, date }) => ({
      title,
      subtitle: [date, subtitle].filter(Boolean).join(" — "),
    }),
  },
});
