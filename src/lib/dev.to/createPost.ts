import axios from "axios";

export async function createDevToPost(slug:string, markdown: string){
    return axios.post("https://dev.to/api/articles",{
        "article": {
            "title":slug,
            "published": false,
            "body_markdown": markdown,
            "tags": [
                "discuss",
                "help"
            ],
            "series": "Hello series"
        }
    }, {
        headers: {
            "api-key": process.env.DEV_TO_API_TOKEN
        }
    })
}
