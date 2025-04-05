// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://fault.wtf/',
  base: '/',
  trailingSlash: 'always',
  output: 'server',
  compressHTML: true,

  security: {
    checkOrigin: true,
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },

  adapter: vercel({
    isr: true,
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
    skewProtection: true,
    edgeMiddleware: true,
  }),

  image: {
    experimentalLayout: 'responsive',
  },

  experimental: {
    responsiveImages: true,
    svg: true,
    clientPrerender: true,
    contentIntellisense: true,
    serializeConfig: true,
    headingIdCompat: true,
  },

  integrations: [
    react(),
    mdx(),
    partytown(),
    sitemap(),
    tailwind() // Using default configuration for Tailwind v3
  ],
});
