import { defineQuery } from "next-sanity";

// Lightweight list for the unified merge seam: shape mirrors MDX PostContent.
// Tags/author are dereferenced to their slugs so both sources resolve through
// the same getTag()/getAuthor() maps.
export const postListQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(date)]{
    _id,
    "slug": slug.current,
    title,
    date,
    subtitle,
    "tags": tags[]->slug.current
  } | order(date desc)
`);

// Full post for rendering: body custom blocks expanded, image assets carry
// LQIP + dimensions for blur placeholders and aspect ratio.
export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    subtitle,
    date,
    "slug": slug.current,
    "author": author->slug.current,
    "tags": tags[]->slug.current,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{ _id, url, metadata { lqip, dimensions } }
      }
    }
  }
`);

// Slugs only — for getStaticPaths.
export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)].slug.current
`);
