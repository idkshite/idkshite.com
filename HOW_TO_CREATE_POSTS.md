# How to create posts
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