import { defaultLocale, locales, type L, type Locale } from './config';
import { familyByKey, type FamilyKey } from '../data/families';

/** Localised URL segments. Changing one changes the public URL: add a redirect in src/data/redirects.ts. */
export const segments = {
  products: { en: 'products', it: 'prodotti', fr: 'produits', es: 'productos', de: 'produkte' },
  company: { en: 'company', it: 'azienda', fr: 'entreprise', es: 'empresa', de: 'unternehmen' },
  history: { en: 'history', it: 'storia', fr: 'histoire', es: 'historia', de: 'geschichte' },
  production: { en: 'production', it: 'produzione', fr: 'production', es: 'produccion', de: 'produktion' },
  certifications: { en: 'certifications', it: 'certificazioni', fr: 'certifications', es: 'certificaciones', de: 'zertifizierungen' },
  environment: { en: 'environment', it: 'ambiente', fr: 'environnement', es: 'medio-ambiente', de: 'umwelt' },
  applications: { en: 'applications', it: 'applicazioni', fr: 'domaines-d-application', es: 'aplicaciones', de: 'anwendungen' },
  custom: { en: 'custom-engineered-solutions', it: 'soluzioni-personalizzate', fr: 'solutions-sur-mesure', es: 'soluciones-a-medida', de: 'sonderloesungen' },
  alubronze: { en: 'aluminium-bronze-valves', it: 'valvole-bronzo-alluminio', fr: 'robinetterie-bronze-aluminium', es: 'valvulas-bronce-aluminio', de: 'aluminiumbronze-armaturen' },
  literature: { en: 'literature', it: 'documentazione', fr: 'documentation', es: 'documentacion', de: 'dokumentation' },
  news: { en: 'news', it: 'notizie', fr: 'actualites', es: 'noticias', de: 'aktuelles' },
  contact: { en: 'contact', it: 'contatti', fr: 'nous-contacter', es: 'contacto', de: 'kontakt' },
  privacy: { en: 'privacy-policy', it: 'privacy', fr: 'confidentialite', es: 'privacidad', de: 'datenschutz' },
} satisfies Record<string, L>;

/** Every page of the site, language independent. */
export type Route =
  | { page: 'home' }
  | { page: 'products' }
  | { page: 'family'; family: FamilyKey }
  | { page: 'product'; family: FamilyKey; code: string }
  | { page: 'company' | 'history' | 'production' | 'certifications' | 'environment' }
  | { page: 'applications' | 'custom' | 'alubronze' }
  | { page: 'literature' | 'news' | 'contact' | 'privacy' };

const COMPANY_CHILDREN = ['history', 'production', 'certifications', 'environment'] as const;
const APPLICATION_CHILDREN = ['custom', 'alubronze'] as const;

/** Path segments (without language prefix) of a route in a language. */
function parts(route: Route, lang: Locale): string[] {
  const s = (k: keyof typeof segments) => segments[k][lang];
  switch (route.page) {
    case 'home':
      return [];
    case 'products':
      return [s('products')];
    case 'family':
      return [s('products'), familyByKey[route.family].slug[lang]];
    case 'product':
      return [s('products'), familyByKey[route.family].slug[lang], route.code.toLowerCase().replace(/\s+/g, '-')];
    default:
      if ((COMPANY_CHILDREN as readonly string[]).includes(route.page)) return [s('company'), s(route.page)];
      if ((APPLICATION_CHILDREN as readonly string[]).includes(route.page)) return [s('applications'), s(route.page)];
      return [s(route.page)];
  }
}

/** Absolute path, e.g. /it/prodotti/valvole-a-sfera/ */
export function href(route: Route, lang: Locale): string {
  const p = parts(route, lang);
  const prefix = lang === defaultLocale ? [] : [lang];
  const all = [...prefix, ...p];
  return all.length ? `/${all.join('/')}/` : '/';
}

/** The `slug` param for src/pages/[...slug].astro (undefined = site root). */
export function slugParam(route: Route, lang: Locale): string | undefined {
  const path = href(route, lang).replace(/^\/|\/$/g, '');
  return path || undefined;
}

export function alternates(route: Route): { lang: Locale; href: string }[] {
  return locales.map((lang) => ({ lang, href: href(route, lang) }));
}
