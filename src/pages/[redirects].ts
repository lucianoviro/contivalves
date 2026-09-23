import type { APIRoute, GetStaticPaths } from 'astro';
import { redirects } from '../data/redirects';

/** Emits dist/_redirects (Netlify / Cloudflare Pages). Old WordPress URLs → new URLs, 301. */
export const getStaticPaths = (() => [{ params: { redirects: '_redirects' } }]) satisfies GetStaticPaths;

export const GET: APIRoute = () => {
  const lines = redirects().map(([from, to]) => `${from} ${to} 301`);
  // Old uploads (catalogues, certificates) are served from /media/ with the same year/month path.
  lines.push('/wp-content/uploads/* /media/:splat 301');
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
