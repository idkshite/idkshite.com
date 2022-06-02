import { Client } from "https://deno.land/x/notion_sdk/src/mod.ts";
import {getFlagEmojiByLanguageCode} from "../lib/getFlagByLanguageCode.ts";
import {createTitleProperty} from "../lib/notion/createTitleProperty.ts";
import {createRichTextProperty} from "../lib/notion/createRichTextProperty.ts";

export default async (req: Request, context: any) => {

    try {
        // only get page requests
        if(req.headers.get("sec-fetch-dest") !== "document"){
            return await context.next({sendConditionalRequest: true});
        }

        const notion = new Client({
            auth: Deno.env.get("NOTION_API_TOKEN")
        })

        const emoji = getFlagEmojiByLanguageCode(context.geo?.country?.code ?? "poop");
        console.log("emoji",emoji, typeof emoji);

        await notion.pages.create({
            parent: {
                database_id: Deno.env.get("ANALYTICS_NOTION_DATABASE_ID")!,
            },
            icon: {
                type: "emoji",
                emoji: emoji as any
            },
            properties: {
                Path: createTitleProperty(new URL(req.url).pathname ?? req?.url ),
                Country: createRichTextProperty(context.geo?.country?.name ?? "null"),
                City: createRichTextProperty(context.geo?.city ?? "null"),
                DateTime: createRichTextProperty(new Date().toString()),
                Environment: createRichTextProperty(new URL(req.url).host.includes("localhost") ? "local" : "prod")
            },
        })

        return await context.next({sendConditionalRequest: true});
    }catch(error){
        return await context.next({sendConditionalRequest: true});
    }

};







