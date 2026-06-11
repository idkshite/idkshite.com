# How to create posts

There are two ways to publish a post. Both render identically and share one
list, pagination, tag system, and URL space (`/posts/<slug>`).

## Option A — Sanity (no code, live in seconds)

1. Open `/studio` (locally `http://localhost:3000/studio`, or on the live site).
2. Create a **Post**: title, slug, date, author, tags, and a body.
3. Drag images straight into the body — they're optimised automatically.
4. Add rich blocks (code, YouTube, Replit, CodeSandbox, video, custom iframe).
5. **Publish** — the post is live at `/posts/<slug>` within seconds, no deploy.

One-time setup (env vars, read token, webhook, CORS) is in
[docs/SANITY_SETUP.md](docs/SANITY_SETUP.md).

## Option B — MDX (the escape hatch for bespoke inline React)

1. Create an .mdx file in /content/posts
2. add the frontmatter to describe the post
```mdx
---
slug: my-cool-slug
title: Write your own global fish aliases
subtitle: Harness fish-shell aliases to run global commands on your terminal
date: 2022-06-03
author: lucca
tags:
- programming
- learn-in-public
---
```
3. Use text and existing mdx components to build your post 
4. Push to publish

## Caveats 
* some characters like `<` need to be escaped when used in a post. use {`<`} instead.