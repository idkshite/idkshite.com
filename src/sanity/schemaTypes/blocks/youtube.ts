import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons";

// Maps 1:1 to the react-youtube <YouTube videoId opts /> MDX component.
export const youtube = defineType({
  name: "youtube",
  title: "YouTube",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "videoId",
      title: "Video ID",
      type: "string",
      description: "The id after ?v= in a YouTube URL, e.g. Xy9ZXRRgpLk",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "start",
      title: "Start (seconds)",
      type: "number",
    }),
    defineField({
      name: "end",
      title: "End (seconds)",
      type: "number",
    }),
  ],
  preview: {
    select: { videoId: "videoId" },
    prepare: ({ videoId }) => ({ title: "YouTube", subtitle: videoId }),
  },
});
