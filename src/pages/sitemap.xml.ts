import type { APIRoute } from 'astro';
import { locales, localeMeta, defaultLocale } from '../i18n/config';
import { href } from '../i18n/routes';
import { allRoutes } from '../lib/all-routes';
import { site } from '../data/site';

/** Sitemap with hreflang alternates for every localised URL. */
export const GET: APIRoute = () => {
  const abs = (p: string) => new URL(p, site.url).href;
  const urls = allRoutes().flatMap((route) =>
    locales.map((lang) => {
      const links = locales
        .map((l) => `<xhtml:link rel="alternate" hreflang="${localeMeta[l].htmlLang}" href="${abs(href(route, l))}"/>`)
        .concat(`<xhtml:link rel="alternate" hreflang="x-default" href="${abs(href(route, defaultLocale))}"/>`)
        .join('');
      return `<url><loc>${abs(href(route, lang))}</loc>${links}</url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
