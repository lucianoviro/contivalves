import type { APIRoute } from 'astro';
import { site } from '../data/site';

// Search engines and AI assistants (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) are all welcome:
// being quoted correctly by them is part of the GEO strategy.
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
