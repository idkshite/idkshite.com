import axios from "axios";
import { PostFrontMatter } from "../../pages/api/publish/[postSlug]";
import configJSON from "/config.json";

export async function createDevToPost({
  slug,
  markdown,
  frontMatter,
}: {
  slug: string;
  markdown: string;
  frontMatter: PostFrontMatter;
}) {
  const pageConfig = configJSON;

  return axios.post(
    "https://dev.to/api/articles",
    {
      article: {
        title: frontMatter.title,
        published: false,
        body_markdown: prependFrontMatter(markdown, frontMatter, pageConfig),
        ...(frontMatter?.dev_to_tags ? { tags: frontMatter?.dev_to_tags } : {}),
      },
    },
    {
      headers: {
        "api-key": process.env.DEV_TO_API_TOKEN,
      },
    }
  );
}

function prependFrontMatter(
  markdown: string,
  frontMatter: PostFrontMatter,
  pageConfig
) {
  const cover_image = frontMatter?.cover_image
    ? `"cover_image": ${frontMatter.cover_image}`
    : "";
  return `
            ---
            "canonical_url": ${pageConfig.base_url}posts/${frontMatter.slug},
            ${cover_image}
            ---
        \n\n${markdown}`;
}
