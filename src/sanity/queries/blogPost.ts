import { groq } from "next-sanity";

// Query to fetch all blog posts
export const BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    coverImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    "author": author->name,
    tags
  }
`;

// Query to fetch an entire blog post by its slug
export const BLOG_POST_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    coverImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    "author": author-> {
      name,
      "slug": slug.current,
      image {
        asset-> {
          _id,
          url
        }
      },
      bio
    },
    devToTags,
    tags,
    body[] {
      ...,
      _type == "image" => {
        "url": asset->url,
        alt,
        caption
      },
      _type == "code" => {
        ...,
        language,
        code
      }
    }
  }
`;

// Query to fetch all blog post slugs
export const ALL_BLOG_POST_SLUGS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current
  }
`;

// Query to fetch blog posts by tag
export const BLOG_POSTS_BY_TAG_QUERY = groq`
  *[_type == "blogPost" && $tag in tags] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    publishedAt,
    coverImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    "author": author->name,
    tags
  }
`;
