
// import { Client } from "https://deno.land/x/notion_sdk/src/mod.ts";
// import {getFlagEmojiByLanguageCode} from "./flags.ts";

export default async (req: Request, context: any) => {

    try {
        // only get page requests
        if(req.headers.get("sec-fetch-dest") !== "document"){
            return await context.next({sendConditionalRequest: true});
        }

        /*const notion = new Client({
            auth: Deno.env.get("NOTION_API_TOKEN")
        })*/

        //const emoji = getFlagEmojiByLanguageCode(context.geo?.country?.code ?? "poop");
        //console.log("emoji",emoji, typeof emoji);
        console.log("pathname", new URL(req.url).pathname);

        /*await notion.pages.create({
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
*/
        return await context.next({sendConditionalRequest: true});
    }catch(error){
        return await context.next({sendConditionalRequest: true});
    }

};



export function createRichTextProperty(content: string): any{
    return {
        rich_text: [
            {
                text: {
                    content,
                },
            },
        ],
    }
}

export function createTitleProperty(content: string): any{
    return {
        title: [
            {
                text: {
                    content,
                },
            },
        ],
    }
}
