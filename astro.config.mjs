import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://readback.ca',
  integrations: [sitemap()],
  redirects: {
    '/regions': '/rules',
    '/vendors': '/tech',
    '/cameras': '/tech',
    '/systems': '/tech',
    '/latest': '/news',
  },
});
