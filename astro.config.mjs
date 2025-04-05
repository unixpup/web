// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  adapter: vercel({
    isr: true,
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
    skewProtection: true,
    edgeMiddleware: true,
  }),

  integrations: [react()],
});