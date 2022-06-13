import { CustomMDXComponentName } from "../../pages/posts/[post]";
import fs from "node:fs/promises";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxFromMarkdown, mdxToMarkdown } from "mdast-util-mdx";
import { Content, Root } from "mdast-util-from-markdown/lib";
import { mdxjs } from "micromark-extension-mdxjs";
import flattendeep from "lodash.flattendeep";

type CustomMDXTag = {
  expression: string;
  position: { start: number; end: number };
  tagName: string;
  attributes: CustomMDXTagAttributes;
  content: string;
};
type CustomMDXTagAttributes = { [key in string]: string | number };
type CustomMDXComponent = {
  tagName: string;
  tokenEqualsThisTag: (token: Content) => boolean;
};

const LinkMDXComponent = {
  tagName: "Link",
  tokenEqualsThisTag: findTokenByNameFunction("Link"),
};

const ReplitMDXComponent = {
  tagName: "Replit",
  tokenEqualsThisTag: findTokenByNameFunction("Replit"),
};

const ImgWithTextMDXComponent = {
  tagName: "ImgWithText",
  tokenEqualsThisTag: findTokenByNameFunction("ImgWithText"),
};

function findTokenByNameFunction(tagName) {
  return (token) => token.name === tagName;
}

function getTokenChild(token) {
  if (token?.children) {
    return [token, getTokenChild(token?.children)];
  }
  return token;
}

export function convertCustomComponentsToJekyll(markdown: string) {
  const flatFileTokens = flattendeep(
    getFileTree(markdown).children.reduce<Content[]>((allTokens, token) => {
      return [...allTokens, getTokenChild(token)];
    }, [])
  ).filter(
    (token) =>
      token.type === "mdxJsxFlowElement" || token.type === "mdxJsxTextElement"
  );

  // console.log("flatFileTokens", flatFileTokens);

  // TODO: make this dry
  let convertedContent = markdown;
  convertedContent = replaceComponent({
    flatFileTokens,
    markdown: convertedContent,
    componentToReplace: LinkMDXComponent,
    replaceWith: (tag) => `[${tag.content}](${tag.attributes.url})`,
  });
  convertedContent = replaceComponent({
    flatFileTokens,
    markdown: convertedContent,
    componentToReplace: ReplitMDXComponent,
    replaceWith: (tag) => {
      return `{% replit ${tag.attributes.url} %}`;
    },
  });
  convertedContent = replaceComponent({
    flatFileTokens,
    markdown: convertedContent,
    componentToReplace: ImgWithTextMDXComponent,
    replaceWith: (tag) => {
      return `![${tag.content ?? "no alt tag provided"}](${
        tag.attributes.url
      }.jpg)`;
    },
  });
  return convertedContent;

  /*let convertedContent = content
    convertedContent = replaceComponent({name:"Link", tagName: "Link", selfClosing: false} , convertedContent, (tag) => `[${tag.content}](${tag.attributes.url})`);
    return replaceComponent({name: "Replit", tagName: "Replit", selfClosing: true }, convertedContent, (tag) => `{% replit ${tag.attributes.url} %}`);
    // return replaceComponent({name: "ImgWithText", tagName: "ImgWithText", selfClosing: false } , convertedContent, (tag) => `![${tag.attributes?.alt ?? "no alt tag provided"}](${tag.attributes.url}.jpg)`);*/
}

function getFileTree(content: string) {
  return fromMarkdown(content, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  });
}

function getTokenByCondition({
  flatFileTokens,
  predicateFunction,
}: {
  flatFileTokens: Content[];
  predicateFunction: (token: Content) => boolean;
}) {
  return flatFileTokens.filter((token) => {
    return predicateFunction(token);
  });
}

function replaceComponent({
  flatFileTokens,
  markdown,
  componentToReplace,
  replaceWith,
}: {
  flatFileTokens: Content[];
  markdown: string;
  componentToReplace: CustomMDXComponent;
  replaceWith: (tag: CustomMDXTag) => string;
}) {
  const tokens = getTokenByCondition({
    flatFileTokens,
    predicateFunction: componentToReplace.tokenEqualsThisTag,
  });

  if (!tokens) {
    console.log(
      `Didn't find any tokens for tag: ${componentToReplace.tagName}'s`
    );
    return markdown;
  }

  //console.log(`found ${tokens.length} ${componentToReplace.tagName} tokens`);
  //console.log(tokens);

  return tokens
    .map((token) => convertTokenToTag(token, markdown))
    .reduce((newMarkdown, tag, index) => {
      // TODO: replace by position for more reliable results
      const replacedMarkdown = replaceTag({
        markdown: newMarkdown,
        tag,
        replaceWith,
      });
      // console.log("replacedMarkdown", replacedMarkdown, "INDEX: ", index);
      return (newMarkdown = replacedMarkdown);
    }, markdown);

  /*return tokens.reduce((newContent, tag) => {
    return newContent.replace(tag.expression, replaceWith(tag));
  }, content);*/
}

function replaceTag({
  markdown,
  tag,
  replaceWith,
}: {
  markdown: string;
  tag: CustomMDXTag;
  replaceWith: (tag: CustomMDXTag) => string;
}) {
  // console.log("tag", tag.expression, "replace with ", replaceWith(tag));
  return markdown.replace(tag.expression, replaceWith(tag));
}

/*function replaceTagByPosition({
  markdown,
  tag,
  replaceWith,
}: {
  markdown: string;
  tag: CustomMDXTag;
  replaceWith: (tag: CustomMDXTag) => string;
}) {
  console.log("tag", tag, "replace with ", replaceWith(tag));
  return (
    markdown.substring(0, tag.position.start) +
    replaceWith(tag) +
    markdown.substring(tag.position.end + 1)
  );
}*/

// TODO: fix token type
function convertTokenToTag(token, markdown): CustomMDXTag {
  const startPos = token.position.start.offset;
  const endPos = token.position.end.offset;
  console.log(
    "\n\n SUBSTRING",
    startPos,
    "until",
    endPos,
    "is: ",
    markdown.substring(startPos, endPos + 1),
    "\n\n"
  );
  return {
    expression: markdown.substring(startPos, endPos + 1),
    position: {
      start: startPos,
      end: endPos,
    },
    tagName: token.name,
    attributes: getAttributes(token),
    content: getContent(token),
  };
}

function getAttributes(token) {
  if (!token?.attributes) return {};
  return token.attributes.reduce((attributes, prevAttribute) => {
    // console.log("prevAttribute?.value", getAttributeValue(prevAttribute));
    return {
      ...attributes,
      [prevAttribute.name]: getAttributeValue(prevAttribute),
    };
  }, {});
}

function getAttributeValue(attribute) {
  // value isn't always inside value.value but also sometimes just as a string in value. idk why
  if (attribute?.value?.value)
    return attribute.value.value.replace(/['"]+/g, "").trim();
  if (attribute?.value) return attribute?.value.replace(/['"]+/g, "").trim();
  return "";
}

function getContent(token) {
  //console.log(`${token.name} has children ${JSON.stringify(token?.children)}`);
  if (!token?.children) return null;
  const flattenedChildrenWithValue = flattendeep(getTokenChild(token)).filter(
    (token) => token?.value
  );
  // console.log("flattenedChildren", JSON.stringify(flattenedChildrenWithValue));

  return flattenedChildrenWithValue.reduce((content, child) => {
    return content + " " + child.value.trim();
  }, "");
}
