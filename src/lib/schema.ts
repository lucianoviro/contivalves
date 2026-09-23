/** schema.org JSON-LD builders – the structured facts search engines and AI assistants read. */
import { site } from '../data/site';
import { localeMeta, type Locale } from '../i18n/config';
import { href } from '../i18n/routes';
import { families } from '../data/families';
import { bodyMaterial, describe, sizeRange, type Product } from '../data/catalog';
import { familyByKey } from '../data/families';

const abs = (path: string) => new URL(path, site.url).href;
export const ORG_ID = `${site.url}/#organization`;

export function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: [site.brand, 'Conti', 'Rubinetterie F.lli Conti'],
    url: site.url,
    logo: abs('/logo-conti.png'),
    foundingDate: String(site.foundingYear),
    founder: { '@type': 'Person', name: site.founder },
    description: 'Italian manufacturer of bronze and brass industrial valves since 1919: ball, gate, globe, check and plug valves, Y strainers, safety valves, fire valves and pressure reducing valves.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.province,
      addressCountry: site.address.country,
    },
    telephone: site.phone,
    email: site.emails.general,
    ...(site.vatNumber ? { vatID: site.vatNumber } : {}),
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', email: site.emails.sales, telephone: site.phone, availableLanguage: ['en', 'it', 'fr', 'es', 'de'] },
      { '@type': 'ContactPoint', contactType: 'technical support', email: site.emails.technical, telephone: site.phone },
      { '@type': 'ContactPoint', contactType: 'billing support', email: site.emails.accounting },
    ],
    areaServed: 'Worldwide',
    knowsAbout: ['Industrial valves', 'Bronze valves', 'Aluminium bronze valves', 'Brass valves', 'DZR brass', 'Bronze foundry', 'Marine valves', 'Pressure Equipment Directive'],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'UNI EN ISO 9001:2015' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'ISO 14001:2015' },
    ],
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function website(lang: Locale) {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.brand,
    inLanguage: localeMeta[lang].htmlLang,
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumb(items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href) })),
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function webPage(type: string, name: string, description: string, path: string, lang: Locale) {
  return { '@type': type, name, description, url: abs(path), inLanguage: localeMeta[lang].htmlLang, isPartOf: { '@id': `${site.url}/#website` }, about: { '@id': ORG_ID } };
}

export function productSchema(p: Product, lang: Locale, imageUrls: string[]) {
  const fam = familyByKey[p.family];
  const props: { name: string; value: string }[] = [];
  if (p.rating) props.push({ name: 'Pressure rating', value: p.rating });
  const size = sizeRange(p);
  if (size) props.push({ name: 'Sizes', value: size });
  const body = bodyMaterial(p, 'en');
  if (body) props.push({ name: 'Body material', value: body });
  for (const m of p.materials) props.push({ name: `Material – ${m.part.toLowerCase()}`, value: [m.name, m.grade, m.standard].filter(Boolean).join(' ') });
  return {
    '@type': 'Product',
    '@id': abs(href({ page: 'product', family: p.family, code: p.code }, lang)) + '#product',
    name: `${p.code} – ${describe(p, lang)}`,
    description: describe(p, lang),
    sku: p.code,
    mpn: p.code,
    category: fam.singular[lang],
    brand: { '@type': 'Brand', name: 'Conti' },
    manufacturer: { '@id': ORG_ID },
    countryOfOrigin: 'IT',
    ...(imageUrls.length ? { image: imageUrls } : {}),
    ...(body ? { material: body } : {}),
    additionalProperty: props.map((x) => ({ '@type': 'PropertyValue', ...x })),
    ...(p.variants.length
      ? { isRelatedTo: p.variants.map((v) => ({ '@type': 'Product', sku: v.code, name: `${v.code} – ${v.text}`, ...(v.rating ? { description: v.rating } : {}) })) }
      : {}),
  };
}

export function familyList(lang: Locale) {
  return {
    '@type': 'ItemList',
    itemListElement: families.map((f, i) => ({ '@type': 'ListItem', position: i + 1, name: f.name[lang], url: abs(href({ page: 'family', family: f.key }, lang)) })),
  };
}

export function productList(list: Product[], lang: Locale) {
  return {
    '@type': 'ItemList',
    numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: `${p.code} – ${describe(p, lang)}`, url: abs(href({ page: 'product', family: p.family, code: p.code }, lang)) })),
  };
}
