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
  isThisTag: TagPredicateFunction;
  // replaceWith: TagReplacementFunction; // TODO: refactor this so replaceWith is taken from CustomMDXComponent
};
type TagPredicateFunction = (tag: CustomMDXTag) => boolean;
type TagReplacementFunction = (tag: CustomMDXTag) => string;

const LinkMDXComponent = {
  tagName: "Link",
  isThisTag: findTagByNameFunction("Link"),
};

const ReplitMDXComponent = {
  tagName: "Replit",
  isThisTag: findTagByNameFunction("Replit"),
};

const ImgWithTextMDXComponent = {
  tagName: "ImgWithText",
  isThisTag: findTagByNameFunction("ImgWithText"),
};

const CodeSandboxMDXComponent = {
  tagName: "CodeSandbox",
  isThisTag: findTagByNameFunction("CodeSandbox"),
};

function findTagByNameFunction(tagName) {
  return (token) => token.tagName === tagName;
}

function getTokenChild(token) {
  if (token?.children) {
    return [token, getTokenChild(token?.children)];
  }
  return token;
}

export function convertCustomComponentsToJekyll(markdown: string) {
  const flattenedTags: CustomMDXTag[] = flattendeep(
    getFileTree(markdown).children.reduce<Content[]>((allTokens, token) => {
      return [...allTokens, getTokenChild(token)];
    }, [])
  )
    .filter(
      (token) =>
        token.type === "mdxJsxFlowElement" || token.type === "mdxJsxTextElement"
    )
    .map((token) => convertTokenToTag(token, markdown));

  // TODO: make this dry
  let convertedContent = markdown;
  convertedContent = replaceComponent({
    flattenedTags,
    markdown: convertedContent,
    componentToReplace: LinkMDXComponent,
    replaceWith: (tag) => `[${tag.content}](${tag.attributes.url})`,
  });
  convertedContent = replaceComponent({
    flattenedTags,
    markdown: convertedContent,
    componentToReplace: ReplitMDXComponent,
    replaceWith: (tag) => {
      return `{% replit ${tag.attributes.url} %}`;
    },
  });
  convertedContent = replaceComponent({
    flattenedTags,
    markdown: convertedContent,
    componentToReplace: ImgWithTextMDXComponent,
    replaceWith: (tag) => {
      return `![${tag.content ?? "no alt tag provided"}](${
        tag.attributes.url
      }.jpg)`;
    },
  });
  convertedContent = replaceComponent({
    flattenedTags,
    markdown: convertedContent,
    componentToReplace: CodeSandboxMDXComponent,
    replaceWith: (tag) => {
      return `{% codesandbox ${tag.attributes.url} %}`;
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

function getTagByCondition({
  flattenedTags,
  predicateFunction,
}: {
  flattenedTags: CustomMDXTag[];
  predicateFunction: TagPredicateFunction;
}) {
  return flattenedTags.filter((tag) => {
    return predicateFunction(tag);
  });
}

function replaceComponent({
  flattenedTags,
  markdown,
  componentToReplace,
  replaceWith,
}: {
  flattenedTags: CustomMDXTag[];
  markdown: string;
  componentToReplace: CustomMDXComponent;
  replaceWith: TagReplacementFunction;
}) {
  const filteredTags = getTagByCondition({
    flattenedTags,
    predicateFunction: componentToReplace.isThisTag,
  });

  if (!filteredTags) {
    console.log(`Didn't find tags: ${componentToReplace.tagName}'s`);
    return markdown;
  }

  return filteredTags.reduce((newMarkdown, tag, index) => {
    // TODO: replace by position for more reliable results
    const replacedMarkdown = replaceTag({
      markdown: newMarkdown,
      tag,
      replaceWith,
    });

    return (newMarkdown = replacedMarkdown);
  }, markdown);
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
  return markdown.replace(tag.expression, replaceWith(tag));
}

// TODO: fix token type
function convertTokenToTag(token, markdown: string): CustomMDXTag {
  const startPos = token.position.start.offset;
  const endPos = token.position.end.offset;

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
  if (!token?.children) return null;
  const flattenedChildrenWithValue = flattendeep(getTokenChild(token)).filter(
    (token) => token?.value
  );

  return flattenedChildrenWithValue.reduce((content, child) => {
    return content + " " + child.value.trim();
  }, "");
}
