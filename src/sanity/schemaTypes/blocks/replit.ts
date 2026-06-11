import { defineType, defineField } from "sanity";
import { TerminalIcon } from "@sanity/icons";

// Maps to <Replit url filename /> MDX component.
export const replit = defineType({
  name: "replit",
  title: "Replit",
  type: "object",
  icon: TerminalIcon,
  fields: [
    defineField({
      name: "url",
      title: "Replit URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "filename",
      title: "Filename to open",
      type: "string",
    }),
  ],
  preview: {
    select: { url: "url", filename: "filename" },
    prepare: ({ url, filename }) => ({
      title: "Replit",
      subtitle: filename ? `${url} (${filename})` : url,
    }),
  },
});
