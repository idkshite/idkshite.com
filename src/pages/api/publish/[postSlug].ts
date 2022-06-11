import {createDevToPost} from "../../../lib/dev.to/createPost";
import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import {serialize} from "next-mdx-remote/serialize";
import {MDXRemote} from "next-mdx-remote";
import YouTube from "react-youtube";
import {TwitterTweetEmbed} from "react-twitter-embed";
import {CodeSandbox} from "../../../components/rich-content/CodeSandbox";
import {Replit} from "../../../components/rich-content/Replit";
import {Video} from "../../../components/rich-content/Video";
import {Link} from "../../../components/rich-content/Link";
import {Imgur} from "../../../components/rich-content/Image";
import {ImgWithText} from "../../../components/rich-content/ImageWithText";
import {convertCustomComponentsToJekyll} from "../../../lib/dev.to/convertCustomComponentsToJekyll";
import {slugToPostContent} from "../../../lib/posts";

export default async function handler(req, res) {

    if (req.method === 'GET') {
        const slug = req?.query?.postSlug;
        if(!slug || !slug.trim()) return res.status(400).send("missing post slug query parameter");
        const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
        const { content, data } = matter(source, {
            engines: {
                yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
            },
        });

        const cleanedContent = convertCustomComponentsToJekyll(content);

        const result = await createDevToPost(slug,cleanedContent).catch((error) => {
            res.status(500).send(error);
        });
        return res.status(200).send(`published: ${slug}`);
    } else {
        return res.status(405).send("only GET request is valid");
    }
}

const getCircularReplacer = () => {
    const seen = new WeakSet()
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return
            }
            seen.add(value)
        }
        return value
    }
}
