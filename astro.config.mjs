// @ts-check
import { defineConfig } from "astro/config";

// integrations
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";

// rehype plugins
import rehypeExternalLinks from "rehype-external-links";

// vite plugins
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://simbafs.github.io/bblog",
  base: "/bblog",
  integrations: [mdx(), sitemap(), pagefind()],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: "_blank", rel: "noopener external nofollow" },
      ],
    ],
  },
});
