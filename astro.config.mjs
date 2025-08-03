import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://elsebeneath.online",
  base: "/",
  trailingSlash: "ignore",
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    react(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      imports: [
        "@components/common/Button.astro",
        "@shortcodes/Accordion",
        "@shortcodes/Notice",
        "@shortcodes/Youtube",
        "@shortcodes/Tabs",
        "@shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
      remarkMath,
    ],
    rehypePlugins: [[rehypeKatex, {}]],
    shikiConfig: {
      themes: {
        // https://shiki.style/themes
        light: "light-plus",
        dark: "dark-plus",
      },
    },
    extendDefaultPlugins: true,
  },
  adapter: cloudflare(),
  server: {
    headers: {
      "Content-Security-Policy": `
        default-src 'self';
        script-src 'self' 'unsafe-inline'
          https://www.googletagmanager.com
          https://www.clarity.ms
          https://cloudflareinsights.com
          https://static.cloudflareinsights.com;
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https:;
        connect-src 'self'
          https://www.google-analytics.com
          https://analytics.google.com
          https://www.clarity.ms;
      `
        .replace(/\s+/g, " ")
        .trim(),
    },
  },
});
