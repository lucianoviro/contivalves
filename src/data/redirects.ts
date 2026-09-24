/**
 * 301 redirects from the old WordPress site (qTranslate-X: Italian without prefix,
 * other languages under /en/, /es/, /fr/, /de/ with translated slugs) to the new URLs.
 * Output: dist/_redirects (Netlify / Cloudflare Pages format) – see src/pages/[redirects].ts.
 */
import type { Locale } from '../i18n/config';
import { href, type Route } from '../i18n/routes';
import { families, type FamilyKey } from './families';
import { locales } from '../i18n/config';
import { allRoutes } from '../lib/all-routes';
import { products } from './catalog';
import raw from './catalog.json';

type OldLang = 'it' | 'en' | 'es' | 'fr' | 'de';
const OLD_LANGS: OldLang[] = ['it', 'en', 'es', 'fr', 'de'];

/** Old page paths per language (from the export: post_name for IT, _qts_slug_xx for the others). */
const OLD_PAGES: { route: Route; paths: Record<OldLang, string[]> }[] = [
  { route: { page: 'company' }, paths: { it: ['azienda', 'azienda/mission'], en: ['company', 'company/mission'], es: ['empresa', 'empresa/mission'], fr: ['qui-nous-sommes', 'qui-nous-sommes/mission'], de: ['wir-uber-uns', 'wir-uber-uns/mission'] } },
  { route: { page: 'history' }, paths: { it: ['azienda/storia'], en: ['company/history'], es: ['empresa/historia'], fr: ['qui-nous-sommes/historie'], de: ['wir-uber-uns/geschichte'] } },
  { route: { page: 'production' }, paths: { it: ['azienda/produzione'], en: ['company/production-process'], es: ['empresa/produccion'], fr: ['qui-nous-sommes/production'], de: ['wir-uber-uns/produktion'] } },
  { route: { page: 'certifications' }, paths: { it: ['azienda/certificazioni'], en: ['company/certifications'], es: ['empresa/certificaciones-del-producto'], fr: ['qui-nous-sommes/certifications'], de: ['wir-uber-uns/zertifizierungen'] } },
  { route: { page: 'environment' }, paths: { it: ['azienda/rispetto-per-lambiente'], en: ['company/respecting-the-environment'], es: ['empresa/respeto-por-el-medio-ambiente'], fr: ['qui-nous-sommes/respect-de-lenvironnement'], de: ['wir-uber-uns/umweltschutz'] } },
  { route: { page: 'applications' }, paths: { it: ['applicazioni', 'applicazioni/settori'], en: ['applications', 'applications/industries-we-serve'], es: ['mercados', 'mercados/sector-de-applicacion'], fr: ['applications', 'applications/secteurs-de-application'], de: ['anwendungen', 'anwendungen/sektoren-der-anwendung'] } },
  { route: { page: 'custom' }, paths: { it: ['applicazioni/soluzioni-personalizzate', 'soluzioni-personalizzate'], en: ['applications/custom-engineered-solutions'], es: ['mercados/soluciones-de-valvulas-de-ingenieria'], fr: ['applications/solutions-de-soupapes-specialises'], de: ['anwendungen/personifizierte-losungen'] } },
  { route: { page: 'alubronze' }, paths: { it: ['applicazioni/serie-bronzo-alluminio'], en: ['applications/bronze-aluminium-valves'], es: ['mercados/bronce-aluminio'], fr: ['applications/serie-bronze-aluminium'], de: ['anwendungen/aluminium-bronze-ventile'] } },
  { route: { page: 'literature' }, paths: { it: ['documentazione'], en: ['literature'], es: ['literature'], fr: ['documentation'], de: ['dokumentationstatigkeit'] } },
  { route: { page: 'news' }, paths: { it: ['news-eventi', 'conti-ha-ottenuto-la-certificazione-iso-14001', 'nuova-linea-acqua-potabile-lead-free', 'valve-world-dusseldorf-2016'], en: ['news-events', 'we-awarded-the-iso-14001', 'new-drinking-water-line-lead-free'], es: ['news', 'we-awarded-the-iso-14001', 'new-drinking-water-line-lead-free'], fr: ['news', 'we-awarded-the-iso-14001', 'new-drinking-water-line-lead-free'], de: ['news', 'we-awarded-the-iso-14001', 'new-drinking-water-line-lead-free'] } },
  { route: { page: 'contact' }, paths: { it: ['contatti'], en: ['contacts'], es: ['contactos'], fr: ['contacts'], de: ['kontakt'] } },
  { route: { page: 'privacy' }, paths: { it: ['informativa-privacy', 'privacy-policy'], en: ['privacy-policy'], es: ['privacy-policy'], fr: ['privacy-policy'], de: ['privacy-policy'] } },
];

/** Old language → new language (the new site has the same five languages). */
const target: Record<OldLang, Locale> = { it: 'it', en: 'en', es: 'es', fr: 'fr', de: 'de' };
const prefix = (l: OldLang) => (l === 'it' ? '' : `/${l}`);

export interface OldRedirect { from: string; route: Route; lang: Locale; hash?: string }

/** Old path → new route (language independent), so the same map serves Astro and WordPress. */
export function redirectRoutes(): OldRedirect[] {
  const out = new Map<string, OldRedirect>();
  // Never redirect a path that exists on the new site (e.g. /privacy-policy/ is now the English privacy page).
  const live = new Set(allRoutes().flatMap((r) => locales.map((l) => href(r, l))));
  const add = (from: string, route: Route, lang: Locale, hash?: string) => {
    const f = from.replace(/\/+$/, '') + '/';
    if (f !== href(route, lang) && !live.has(f) && !out.has(f)) out.set(f, { from: f, route, lang, ...(hash ? { hash } : {}) });
  };

  for (const l of OLD_LANGS) {
    const lang = target[l];
    if (l !== 'it') add(`/${l}`, { page: 'home' }, lang);
    add(`${prefix(l)}/home`, { page: 'home' }, lang);

    for (const p of OLD_PAGES) for (const path of p.paths[l]) add(`${prefix(l)}/${path}`, p.route, lang);

    // product categories: families and sub-categories (flat and hierarchical URLs)
    for (const f of families) {
      const wp = raw.families.find((x) => x.key === f.key)!.wpSlug;
      add(`${prefix(l)}/categorie_prodotti/${l === 'it' ? wp : f.key}`, { page: 'family', family: f.key }, lang);
    }
    for (const s of raw.subcategories) {
      const fam = raw.families.find((x) => x.key === s.family)!;
      const route: Route = { page: 'family', family: s.family as FamilyKey };
      const slug = l === 'it' ? s.wpSlug : s.key;
      const parent = l === 'it' ? fam.wpSlug : fam.key;
      add(`${prefix(l)}/categorie_prodotti/${slug}`, route, lang, s.key);
      add(`${prefix(l)}/categorie_prodotti/${parent}/${slug}`, route, lang, s.key);
    }

    // products: /prodotti/<code>/ and /prodotti/conti-valves-art-<code>/
    for (const p of products) {
      const route: Route = { page: 'product', family: p.family, code: p.code };
      add(`${prefix(l)}/prodotti/${p.slug}`, route, lang);
      add(`${prefix(l)}/prodotti/${p.wpSlug}`, route, lang);
    }
  }
  add('/prodotti', { page: 'products' }, 'it');
  add('/categorie_prodotti', { page: 'products' }, 'it');
  return [...out.values()];
}

export function redirects(): [string, string][] {
  return redirectRoutes().map((r) => [r.from, href(r.route, r.lang) + (r.hash ? `#${r.hash}` : '')]);
}
