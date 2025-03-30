// @ts-check
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://fault.wtf",
  trailingSlash: "always",
  output: "static",
  integrations: [
    partytown(),
    react(),
    expressiveCode(),
    compress({
      CSS: true,
      SVG: true,
      Image: true,
      HTML: {
        "html-minifier-terser": {
          collapseWhitespace: true,
          // collapseInlineTagWhitespace: true, // It breaks display-inline / flex-inline text
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          removeEmptyAttributes: true,
          // removeEmptyElements: true, // It removes sometimes SVGs
          removeRedundantAttributes: true,
        },
      },
      JavaScript: {
        terser: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      },
    }),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
  image: {
    experimentalLayout: "responsive",
  },
  experimental: {
    responsiveImages: true,
    svg: true,
    clientPrerender: true,
    contentIntellisense: true,
  },
});
