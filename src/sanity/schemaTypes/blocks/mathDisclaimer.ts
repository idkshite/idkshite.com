import { defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

// Maps to the static <MathDisclaimer /> MDX component. No fields — its copy is
// fixed in the React component.
export const mathDisclaimer = defineType({
  name: "mathDisclaimer",
  title: "Math Disclaimer",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    {
      name: "note",
      type: "string",
      hidden: true,
      readOnly: true,
      initialValue: "Renders the standard math disclaimer.",
    },
  ],
  preview: { prepare: () => ({ title: "Math Disclaimer" }) },
});
