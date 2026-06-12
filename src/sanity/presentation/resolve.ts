import { defineLocations, PresentationPluginOptions } from "sanity/presentation";

// Tells Presentation where each document renders on the site, so opening a post
// lands directly on /posts/<slug> (and offers the listing as a secondary spot).
export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // The intro singleton renders on the home page.
    siteSettings: defineLocations({
      select: {},
      resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
    }),
    post: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        // Without a slug there is no page yet — emit only the listing so
        // Presentation never auto-navigates the iframe to /posts/undefined.
        locations: [
          ...(doc?.slug
            ? [
                {
                  title: doc?.title || "Untitled post",
                  href: `/posts/${doc.slug}`,
                },
              ]
            : []),
          { title: "Posts", href: "/posts" },
        ],
      }),
    }),
  },
};
