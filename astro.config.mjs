// @ts-check
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://unixpup.github.io",
  trailingSlash: "always",
  output: "static",
  integrations: [partytown(), react()],
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

