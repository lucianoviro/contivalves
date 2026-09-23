// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.contivalves.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  image: {
    // Keep the originals' quality high: many images are technical drawings.
    service: { entrypoint: 'astro/assets/services/sharp', config: { limitInputPixels: false } },
  },
});
