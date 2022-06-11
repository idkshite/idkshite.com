import axios from "axios";
import {PostFrontMatter} from "../../pages/api/publish/[postSlug]";
import configJSON from "/config.json";

export async function createDevToPost({slug,markdown,frontMatter}:{slug:string, markdown: string, frontMatter: PostFrontMatter }){

    const pageConfig = configJSON;

    return axios.post("https://dev.to/api/articles",{
        "article": {
            "title":frontMatter.title,
            "published": false,
            "body_markdown": markdown,
            "tags": frontMatter.tags.join(","),
            "canonical_url": `${pageConfig.base_url}posts/${frontMatter.slug}`
        }
    }, {
        headers: {
            "api-key": process.env.DEV_TO_API_TOKEN
        }
    })
}
