// @ts-check
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import tailwind from "@tailwindcss/vite";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://fault.wtf/",
  trailingSlash: "always",
  output: "static",
  integrations: [partytown(), react(), expressiveCode(), tailwind()],
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
