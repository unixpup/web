// @ts-check
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";

import react from "@astrojs/react";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://unixpup.github.io",
  trailingSlash: "always",
  output: "static",
  integrations: [partytown(), react(), expressiveCode()],
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