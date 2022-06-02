import { Client } from "https://deno.land/x/notion_sdk/src/mod.ts";

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



function createRichTextProperty(content: string): any{
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

function createTitleProperty(content: string): any{
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

function getFlagEmojiByLanguageCode(code: string){
    const found = flags.find((flag) => {
        return flag.name === `flag-${code.toLowerCase()}`;
    })
    if (found) return found.char;
    return "💩"
}

const flags = [
    {
        name: "flag-ac",
        char: "🇦🇨"
    }, {
        name: "flag-ad",
        char: "🇦🇩"
    }, {
        name: "flag-ae",
        char: "🇦🇪"
    }, {
        name: "flag-af",
        char: "🇦🇫"
    }, {
        name: "flag-ag",
        char: "🇦🇬"
    }, {
        name: "flag-ai",
        char: "🇦🇮"
    }, {
        name: "flag-al",
        char: "🇦🇱"
    }, {
        name: "flag-am",
        char: "🇦🇲"
    }, {
        name: "flag-ao",
        char: "🇦🇴"
    }, {
        name: "flag-aq",
        char: "🇦🇶"
    }, {
        name: "flag-ar",
        char: "🇦🇷"
    }, {
        name: "flag-as",
        char: "🇦🇸"
    }, {
        name: "flag-at",
        char: "🇦🇹"
    }, {
        name: "flag-au",
        char: "🇦🇺"
    }, {
        name: "flag-aw",
        char: "🇦🇼"
    }, {
        name: "flag-ax",
        char: "🇦🇽"
    }, {
        name: "flag-az",
        char: "🇦🇿"
    }, {
        name: "flag-ba",
        char: "🇧🇦"
    }, {
        name: "flag-bb",
        char: "🇧🇧"
    }, {
        name: "flag-bd",
        char: "🇧🇩"
    }, {
        name: "flag-be",
        char: "🇧🇪"
    }, {
        name: "flag-bf",
        char: "🇧🇫"
    }, {
        name: "flag-bg",
        char: "🇧🇬"
    }, {
        name: "flag-bh",
        char: "🇧🇭"
    }, {
        name: "flag-bi",
        char: "🇧🇮"
    }, {
        name: "flag-bj",
        char: "🇧🇯"
    }, {
        name: "flag-bl",
        char: "🇧🇱"
    }, {
        name: "flag-bm",
        char: "🇧🇲"
    }, {
        name: "flag-bn",
        char: "🇧🇳"
    }, {
        name: "flag-bo",
        char: "🇧🇴"
    }, {
        name: "flag-bq",
        char: "🇧🇶"
    }, {
        name: "flag-br",
        char: "🇧🇷"
    }, {
        name: "flag-bs",
        char: "🇧🇸"
    }, {
        name: "flag-bt",
        char: "🇧🇹"
    }, {
        name: "flag-bv",
        char: "🇧🇻"
    }, {
        name: "flag-bw",
        char: "🇧🇼"
    }, {
        name: "flag-by",
        char: "🇧🇾"
    }, {
        name: "flag-bz",
        char: "🇧🇿"
    }, {
        name: "flag-ca",
        char: "🇨🇦"
    }, {
        name: "flag-cc",
        char: "🇨🇨"
    }, {
        name: "flag-cd",
        char: "🇨🇩"
    }, {
        name: "flag-cf",
        char: "🇨🇫"
    }, {
        name: "flag-cg",
        char: "🇨🇬"
    }, {
        name: "flag-ch",
        char: "🇨🇭"
    }, {
        name: "flag-ci",
        char: "🇨🇮"
    }, {
        name: "flag-ck",
        char: "🇨🇰"
    }, {
        name: "flag-cl",
        char: "🇨🇱"
    }, {
        name: "flag-cm",
        char: "🇨🇲"
    }, {
        name: "cn",
        char: "🇨🇳"
    }, {
        name: "flag-cn",
        char: "🇨🇳"
    }, {
        name: "flag-co",
        char: "🇨🇴"
    }, {
        name: "flag-cp",
        char: "🇨🇵"
    }, {
        name: "flag-cr",
        char: "🇨🇷"
    }, {
        name: "flag-cu",
        char: "🇨🇺"
    }, {
        name: "flag-cv",
        char: "🇨🇻"
    }, {
        name: "flag-cw",
        char: "🇨🇼"
    }, {
        name: "flag-cx",
        char: "🇨🇽"
    }, {
        name: "flag-cy",
        char: "🇨🇾"
    }, {
        name: "flag-cz",
        char: "🇨🇿"
    }, {
        name: "de",
        char: "🇩🇪"
    }, {
        name: "flag-de",
        char: "🇩🇪"
    }, {
        name: "flag-dg",
        char: "🇩🇬"
    }, {
        name: "flag-dj",
        char: "🇩🇯"
    }, {
        name: "flag-dk",
        char: "🇩🇰"
    }, {
        name: "flag-dm",
        char: "🇩🇲"
    }, {
        name: "flag-do",
        char: "🇩🇴"
    }, {
        name: "flag-dz",
        char: "🇩🇿"
    }, {
        name: "flag-ea",
        char: "🇪🇦"
    }, {
        name: "flag-ec",
        char: "🇪🇨"
    }, {
        name: "flag-ee",
        char: "🇪🇪"
    }, {
        name: "flag-eg",
        char: "🇪🇬"
    }, {
        name: "flag-eh",
        char: "🇪🇭"
    }, {
        name: "flag-er",
        char: "🇪🇷"
    }, {
        name: "es",
        char: "🇪🇸"
    }, {
        name: "flag-es",
        char: "🇪🇸"
    }, {
        name: "flag-et",
        char: "🇪🇹"
    }, {
        name: "flag-eu",
        char: "🇪🇺"
    }, {
        name: "flag-fi",
        char: "🇫🇮"
    }, {
        name: "flag-fj",
        char: "🇫🇯"
    }, {
        name: "flag-fk",
        char: "🇫🇰"
    }, {
        name: "flag-fm",
        char: "🇫🇲"
    }, {
        name: "flag-fo",
        char: "🇫🇴"
    }, {
        name: "fr",
        char: "🇫🇷"
    }, {
        name: "flag-fr",
        char: "🇫🇷"
    }, {
        name: "flag-ga",
        char: "🇬🇦"
    }, {
        name: "gb",
        char: "🇬🇧"
    }, {
        name: "uk",
        char: "🇬🇧"
    }, {
        name: "flag-gb",
        char: "🇬🇧"
    }, {
        name: "flag-gd",
        char: "🇬🇩"
    }, {
        name: "flag-ge",
        char: "🇬🇪"
    }, {
        name: "flag-gf",
        char: "🇬🇫"
    }, {
        name: "flag-gg",
        char: "🇬🇬"
    }, {
        name: "flag-gh",
        char: "🇬🇭"
    }, {
        name: "flag-gi",
        char: "🇬🇮"
    }, {
        name: "flag-gl",
        char: "🇬🇱"
    }, {
        name: "flag-gm",
        char: "🇬🇲"
    }, {
        name: "flag-gn",
        char: "🇬🇳"
    }, {
        name: "flag-gp",
        char: "🇬🇵"
    }, {
        name: "flag-gq",
        char: "🇬🇶"
    }, {
        name: "flag-gr",
        char: "🇬🇷"
    }, {
        name: "flag-gs",
        char: "🇬🇸"
    }, {
        name: "flag-gt",
        char: "🇬🇹"
    }, {
        name: "flag-gu",
        char: "🇬🇺"
    }, {
        name: "flag-gw",
        char: "🇬🇼"
    }, {
        name: "flag-gy",
        char: "🇬🇾"
    }, {
        name: "flag-hk",
        char: "🇭🇰"
    }, {
        name: "flag-hm",
        char: "🇭🇲"
    }, {
        name: "flag-hn",
        char: "🇭🇳"
    }, {
        name: "flag-hr",
        char: "🇭🇷"
    }, {
        name: "flag-ht",
        char: "🇭🇹"
    }, {
        name: "flag-hu",
        char: "🇭🇺"
    }, {
        name: "flag-ic",
        char: "🇮🇨"
    }, {
        name: "flag-id",
        char: "🇮🇩"
    }, {
        name: "flag-ie",
        char: "🇮🇪"
    }, {
        name: "flag-il",
        char: "🇮🇱"
    }, {
        name: "flag-im",
        char: "🇮🇲"
    }, {
        name: "flag-in",
        char: "🇮🇳"
    }, {
        name: "flag-io",
        char: "🇮🇴"
    }, {
        name: "flag-iq",
        char: "🇮🇶"
    }, {
        name: "flag-ir",
        char: "🇮🇷"
    }, {
        name: "flag-is",
        char: "🇮🇸"
    }, {
        name: "it",
        char: "🇮🇹"
    }, {
        name: "flag-it",
        char: "🇮🇹"
    }, {
        name: "flag-je",
        char: "🇯🇪"
    }, {
        name: "flag-jm",
        char: "🇯🇲"
    }, {
        name: "flag-jo",
        char: "🇯🇴"
    }, {
        name: "jp",
        char: "🇯🇵"
    }, {
        name: "flag-jp",
        char: "🇯🇵"
    }, {
        name: "flag-ke",
        char: "🇰🇪"
    }, {
        name: "flag-kg",
        char: "🇰🇬"
    }, {
        name: "flag-kh",
        char: "🇰🇭"
    }, {
        name: "flag-ki",
        char: "🇰🇮"
    }, {
        name: "flag-km",
        char: "🇰🇲"
    }, {
        name: "flag-kn",
        char: "🇰🇳"
    }, {
        name: "flag-kp",
        char: "🇰🇵"
    }, {
        name: "kr",
        char: "🇰🇷"
    }, {
        name: "flag-kr",
        char: "🇰🇷"
    }, {
        name: "flag-kw",
        char: "🇰🇼"
    }, {
        name: "flag-ky",
        char: "🇰🇾"
    }, {
        name: "flag-kz",
        char: "🇰🇿"
    }, {
        name: "flag-la",
        char: "🇱🇦"
    }, {
        name: "flag-lb",
        char: "🇱🇧"
    }, {
        name: "flag-lc",
        char: "🇱🇨"
    }, {
        name: "flag-li",
        char: "🇱🇮"
    }, {
        name: "flag-lk",
        char: "🇱🇰"
    }, {
        name: "flag-lr",
        char: "🇱🇷"
    }, {
        name: "flag-ls",
        char: "🇱🇸"
    }, {
        name: "flag-lt",
        char: "🇱🇹"
    }, {
        name: "flag-lu",
        char: "🇱🇺"
    }, {
        name: "flag-lv",
        char: "🇱🇻"
    }, {
        name: "flag-ly",
        char: "🇱🇾"
    }, {
        name: "flag-ma",
        char: "🇲🇦"
    }, {
        name: "flag-mc",
        char: "🇲🇨"
    }, {
        name: "flag-md",
        char: "🇲🇩"
    }, {
        name: "flag-me",
        char: "🇲🇪"
    }, {
        name: "flag-mf",
        char: "🇲🇫"
    }, {
        name: "flag-mg",
        char: "🇲🇬"
    }, {
        name: "flag-mh",
        char: "🇲🇭"
    }, {
        name: "flag-mk",
        char: "🇲🇰"
    }, {
        name: "flag-ml",
        char: "🇲🇱"
    }, {
        name: "flag-mm",
        char: "🇲🇲"
    }, {
        name: "flag-mn",
        char: "🇲🇳"
    }, {
        name: "flag-mo",
        char: "🇲🇴"
    }, {
        name: "flag-mp",
        char: "🇲🇵"
    }, {
        name: "flag-mq",
        char: "🇲🇶"
    }, {
        name: "flag-mr",
        char: "🇲🇷"
    }, {
        name: "flag-ms",
        char: "🇲🇸"
    }, {
        name: "flag-mt",
        char: "🇲🇹"
    }, {
        name: "flag-mu",
        char: "🇲🇺"
    }, {
        name: "flag-mv",
        char: "🇲🇻"
    }, {
        name: "flag-mw",
        char: "🇲🇼"
    }, {
        name: "flag-mx",
        char: "🇲🇽"
    }, {
        name: "flag-my",
        char: "🇲🇾"
    }, {
        name: "flag-mz",
        char: "🇲🇿"
    }, {
        name: "flag-na",
        char: "🇳🇦"
    }, {
        name: "flag-nc",
        char: "🇳🇨"
    }, {
        name: "flag-ne",
        char: "🇳🇪"
    }, {
        name: "flag-nf",
        char: "🇳🇫"
    }, {
        name: "flag-ng",
        char: "🇳🇬"
    }, {
        name: "flag-ni",
        char: "🇳🇮"
    }, {
        name: "flag-nl",
        char: "🇳🇱"
    }, {
        name: "flag-no",
        char: "🇳🇴"
    }, {
        name: "flag-np",
        char: "🇳🇵"
    }, {
        name: "flag-nr",
        char: "🇳🇷"
    }, {
        name: "flag-nu",
        char: "🇳🇺"
    }, {
        name: "flag-nz",
        char: "🇳🇿"
    }, {
        name: "flag-om",
        char: "🇴🇲"
    }, {
        name: "flag-pa",
        char: "🇵🇦"
    }, {
        name: "flag-pe",
        char: "🇵🇪"
    }, {
        name: "flag-pf",
        char: "🇵🇫"
    }, {
        name: "flag-pg",
        char: "🇵🇬"
    }, {
        name: "flag-ph",
        char: "🇵🇭"
    }, {
        name: "flag-pk",
        char: "🇵🇰"
    }, {
        name: "flag-pl",
        char: "🇵🇱"
    }, {
        name: "flag-pm",
        char: "🇵🇲"
    }, {
        name: "flag-pn",
        char: "🇵🇳"
    }, {
        name: "flag-pr",
        char: "🇵🇷"
    }, {
        name: "flag-ps",
        char: "🇵🇸"
    }, {
        name: "flag-pt",
        char: "🇵🇹"
    }, {
        name: "flag-pw",
        char: "🇵🇼"
    }, {
        name: "flag-py",
        char: "🇵🇾"
    }, {
        name: "flag-qa",
        char: "🇶🇦"
    }, {
        name: "flag-re",
        char: "🇷🇪"
    }, {
        name: "flag-ro",
        char: "🇷🇴"
    }, {
        name: "flag-rs",
        char: "🇷🇸"
    }, {
        name: "ru",
        char: "🇷🇺"
    }, {
        name: "flag-ru",
        char: "🇷🇺"
    }, {
        name: "flag-rw",
        char: "🇷🇼"
    }, {
        name: "flag-sa",
        char: "🇸🇦"
    }, {
        name: "flag-sb",
        char: "🇸🇧"
    }, {
        name: "flag-sc",
        char: "🇸🇨"
    }, {
        name: "flag-sd",
        char: "🇸🇩"
    }, {
        name: "flag-se",
        char: "🇸🇪"
    }, {
        name: "flag-sg",
        char: "🇸🇬"
    }, {
        name: "flag-sh",
        char: "🇸🇭"
    }, {
        name: "flag-si",
        char: "🇸🇮"
    }, {
        name: "flag-sj",
        char: "🇸🇯"
    }, {
        name: "flag-sk",
        char: "🇸🇰"
    }, {
        name: "flag-sl",
        char: "🇸🇱"
    }, {
        name: "flag-sm",
        char: "🇸🇲"
    }, {
        name: "flag-sn",
        char: "🇸🇳"
    }, {
        name: "flag-so",
        char: "🇸🇴"
    }, {
        name: "flag-sr",
        char: "🇸🇷"
    }, {
        name: "flag-ss",
        char: "🇸🇸"
    }, {
        name: "flag-st",
        char: "🇸🇹"
    }, {
        name: "flag-sv",
        char: "🇸🇻"
    }, {
        name: "flag-sx",
        char: "🇸🇽"
    }, {
        name: "flag-sy",
        char: "🇸🇾"
    }, {
        name: "flag-sz",
        char: "🇸🇿"
    }, {
        name: "flag-ta",
        char: "🇹🇦"
    }, {
        name: "flag-tc",
        char: "🇹🇨"
    }, {
        name: "flag-td",
        char: "🇹🇩"
    }, {
        name: "flag-tf",
        char: "🇹🇫"
    }, {
        name: "flag-tg",
        char: "🇹🇬"
    }, {
        name: "flag-th",
        char: "🇹🇭"
    }, {
        name: "flag-tj",
        char: "🇹🇯"
    }, {
        name: "flag-tk",
        char: "🇹🇰"
    }, {
        name: "flag-tl",
        char: "🇹🇱"
    }, {
        name: "flag-tm",
        char: "🇹🇲"
    }, {
        name: "flag-tn",
        char: "🇹🇳"
    }, {
        name: "flag-to",
        char: "🇹🇴"
    }, {
        name: "flag-tr",
        char: "🇹🇷"
    }, {
        name: "flag-tt",
        char: "🇹🇹"
    }, {
        name: "flag-tv",
        char: "🇹🇻"
    }, {
        name: "flag-tw",
        char: "🇹🇼"
    }, {
        name: "flag-tz",
        char: "🇹🇿"
    }, {
        name: "flag-ua",
        char: "🇺🇦"
    }, {
        name: "flag-ug",
        char: "🇺🇬"
    }, {
        name: "flag-um",
        char: "🇺🇲"
    }, {
        name: "flag-un",
        char: "🇺🇳"
    }, {
        name: "us",
        char: "🇺🇸"
    }, {
        name: "flag-us",
        char: "🇺🇸"
    }, {
        name: "flag-uy",
        char: "🇺🇾"
    }, {
        name: "flag-uz",
        char: "🇺🇿"
    }, {
        name: "flag-va",
        char: "🇻🇦"
    }, {
        name: "flag-vc",
        char: "🇻🇨"
    }, {
        name: "flag-ve",
        char: "🇻🇪"
    }, {
        name: "flag-vg",
        char: "🇻🇬"
    }, {
        name: "flag-vi",
        char: "🇻🇮"
    }, {
        name: "flag-vn",
        char: "🇻🇳"
    }, {
        name: "flag-vu",
        char: "🇻🇺"
    }, {
        name: "flag-wf",
        char: "🇼🇫"
    }, {
        name: "flag-ws",
        char: "🇼🇸"
    }, {
        name: "flag-xk",
        char: "🇽🇰"
    }, {
        name: "flag-ye",
        char: "🇾🇪"
    }, {
        name: "flag-yt",
        char: "🇾🇹"
    }, {
        name: "flag-za",
        char: "🇿🇦"
    }, {
        name: "flag-zm",
        char: "🇿🇲"
    }, {
        name: "flag-zw",
        char: "🇿🇼"
    }
]

