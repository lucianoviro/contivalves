import type { ImageMetadata } from 'astro';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Images from the old site live in src/assets/media/<yyyy>/<mm>/<file> (downloaded by
 * `npm run fetch-media`) and are optimised by Astro at build time. Anything missing
 * renders as a neutral placeholder, so the site always builds.
 */
const images = import.meta.glob<ImageMetadata>('/src/assets/media/**/*.{jpg,jpeg,png,webp,JPG,PNG}', {
  eager: true,
  import: 'default',
});

export function getImage(path: string | null | undefined): ImageMetadata | undefined {
  if (!path) return undefined;
  return images[`/src/assets/media/${path}`];
}

/** Documents (PDF, full-size scans) are copied as-is to public/media/. */
export function fileUrl(path: string): string | undefined {
  return existsSync(resolve('public/media', path)) ? `/media/${path}` : undefined;
}
