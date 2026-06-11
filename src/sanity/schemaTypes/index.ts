import type { SchemaTypeDefinition } from "sanity";

import { post } from "./documents/post";
import { author } from "./documents/author";
import { tag } from "./documents/tag";
import { youtube } from "./blocks/youtube";
import { video } from "./blocks/video";
import { codeSandbox } from "./blocks/codeSandbox";
import { replit } from "./blocks/replit";
import { mathDisclaimer } from "./blocks/mathDisclaimer";
import { customEmbed } from "./blocks/customEmbed";

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  post,
  author,
  tag,
  // portable text blocks
  youtube,
  video,
  codeSandbox,
  replit,
  mathDisclaimer,
  customEmbed,
];
