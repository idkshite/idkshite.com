import { defineType, defineField } from "sanity";
import { CodeBlockIcon } from "@sanity/icons";

// Maps to <CodeSandbox url /> — also covers CodePen/codesandbox.io embeds.
export const codeSandbox = defineType({
  name: "codeSandbox",
  title: "CodeSandbox / CodePen",
  type: "object",
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: "url",
      title: "Embed URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { url: "url" },
    prepare: ({ url }) => ({ title: "CodeSandbox", subtitle: url }),
  },
});
