import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Respects hotspot/crop automatically; request exact sizes via .width()/.height().
export const urlFor = (source: any) => builder.image(source);
