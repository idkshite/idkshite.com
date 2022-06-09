import {CustomMDXComponentName} from "../../pages/posts/[post]";

export function convertCustomComponentsToJekyll(content: string):string {
    let convertedContent = content
    convertedContent = replaceComponent({name:"Link", tagName: "Link", selfClosing: false} , convertedContent, (tag) => `[${tag.content}](${tag.attributes.url})`);
    return replaceComponent({name: "Replit", tagName: "Replit", selfClosing: true }, convertedContent, (tag) => `{% replit ${tag.attributes.url} %}`);
    // return replaceComponent({name: "ImgWithText", tagName: "ImgWithText", selfClosing: false } , convertedContent, (tag) => `![${tag.attributes?.alt ?? "no alt tag provided"}](${tag.attributes.url}.jpg)`);
}

function replaceComponent(componentType: CustomMDXComponent, content, replaceWith: (tag: CustomMDXTag) => string){
    const allTags = getTagsByType(componentType,content);
    if(!allTags) {
        console.log(`Didn't find any tags for: ${componentType.name}'s`);
        return content
    }

    return allTags.reduce((newContent, tag) => {
        return newContent.replace(tag.expression, replaceWith(tag));
    },content)
}

type CustomMDXTag = {expression: string, tag: string, attributes:CustomMDXTagAttributes , content: string}
type CustomMDXTagAttributes = { [key in string]: string | number }
type CustomMDXComponent = {name: CustomMDXComponentName, tagName: string, selfClosing: boolean }

function getTagsByType(componentType: CustomMDXComponent, content: string): CustomMDXTag[]{
    try {
        let pattern = `<(${componentType.tagName}+)([^<]+)*(?:>(.*)<\/${componentType.tagName}>|\s+\/>)`;
        if(componentType.selfClosing) pattern = `<(${componentType.tagName}+)([^<]+)\/>`;

        const regexSingleTag = new RegExp(pattern);
        const regexAllTags = new RegExp(pattern, "g");

        const matches = content.match(regexAllTags);
        if(!matches) return null;

        return matches.map((link) => {
            const content = link.match(regexSingleTag);
            console.log("content",content);
            return {
                expression: content[0],
                tag: content[1],
                attributes: parseAttributes(content[2]),
                content: content[3]
            } as CustomMDXTag
        });

    }catch(error){
        console.error(error);
    }
}

function parseAttributes(attributes:string): CustomMDXTagAttributes {
    const attributeKeyValueRegex = /(.*)\={?"+(.*)["}||}||"]/
    return attributes
        .trim()
        .split(" ").reduce((sum, curr) => {
            const match = curr.match(attributeKeyValueRegex);
            return {...sum,[match[1]]: match[2] }
        },{});
}

