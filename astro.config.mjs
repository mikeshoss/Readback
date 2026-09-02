import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://readback.ca',
  redirects: {
    '/regions': '/rules',
    '/vendors': '/tech',
    '/cameras': '/tech',
    '/systems': '/tech',
    '/evidence': '/rules#evidence',
    '/news': '/latest',
    '/foi': '/latest#foi',
  },
});
