import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { config } from "../site.config";
import type { AstroGlobal } from "astro";

export async function GET(context: AstroGlobal) {
  const posts = await getCollection("blog");
  return rss({
    title: config.title,
    description: config.description,
    site: context.site || "",
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}/`,
    })),
  });
}
