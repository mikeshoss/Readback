import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://readback.ca',
  redirects: {
    '/regions': '/rules',
    '/vendors': '/tech',
    '/cameras': '/tech',
    '/systems': '/tech',
    '/latest': '/news',
  },
});
