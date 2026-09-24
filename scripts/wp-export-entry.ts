/**
 * Collects all site data (catalogue, page copy in 5 languages, glossary, UI strings, redirects)
 * into JSON files for the WordPress plugin (wordpress/wp-content/plugins/conti-core/data/).
 * Run with: npm run export:wp
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { locales, type L, type Locale } from '../src/i18n/config';
import { segments } from '../src/i18n/routes';
import { ui } from '../src/i18n/ui';
import { families, subcategoryNames, subcategoryOrder } from '../src/data/families';
import { products, describe } from '../src/data/catalog';
import * as glossary from '../src/data/glossary';
import { site } from '../src/data/site';
import { redirectRoutes } from '../src/data/redirects';
import { home } from '../src/content/home';
import { company, historyPage, milestones } from '../src/content/company';
import { production, certifications, certificateImages } from '../src/content/production';
import { environment } from '../src/content/environment';
import { applications, industries, custom, alubronze } from '../src/content/applications';
import { productsPage, literature, documents, newsPage, news, contactPage } from '../src/content/misc';
import { privacy, privacyUpdated } from '../src/content/privacy';

const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });
const write = (name: string, data: unknown) => writeFileSync(join(OUT, name), JSON.stringify(data, null, 1) + '\n');

const per = <T>(fn: (lang: Locale) => T): L<T> => Object.fromEntries(locales.map((l) => [l, fn(l)])) as L<T>;
/** Split page copy into SEO fields and on-page fields. */
const split = (o: Record<string, unknown>) => {
  const { title, description, ...fields } = o as { title: string; description: string };
  return { seo: { title, description }, fields };
};

// ── Catalogue ────────────────────────────────────────────────────────────────
write('catalog.json', {
  families: families.map((f) => ({ key: f.key, slug: f.slug, name: f.name, singular: f.singular, intro: f.intro, image: f.image })),
  subcategories: subcategoryOrder.map((key) => ({
    key,
    family: products.find((p) => p.subcategory === key)?.family ?? null,
    name: subcategoryNames[key],
  })).filter((s) => s.family),
  products: products.map((p) => ({
    code: p.code,
    family: p.family,
    subcategory: p.subcategory,
    order: p.order,
    rating: p.rating,
    description: per((l) => describe(p, l)),
    materials: p.materials,
    dimensions: p.dimensions,
    variants: p.variants,
    image: p.image,
    drawing: p.drawing,
  })),
});

write('glossary.json', {
  parts: glossary.parts,
  materialNames: glossary.materialNames,
  rowLabels: glossary.rowLabels,
  tableHeads: glossary.tableHeads,
  variantTexts: glossary.variantTexts,
});

write('ui.json', ui);
write('site.json', site);

// ── Pages ────────────────────────────────────────────────────────────────────
// key → { parent, slug per language, seo per language, fields per language }
type PageDef = { parent: string | null; slug: L | null; seo: L<{ title: string; description: string }>; fields: L<Record<string, unknown>> };
const page = (parent: string | null, slug: L | null, content: (l: Locale) => Record<string, unknown>): PageDef => {
  const parts = per((l) => split(content(l)));
  return { parent, slug, seo: per((l) => parts[l].seo), fields: per((l) => parts[l].fields) };
};

const pages: Record<string, PageDef> = {
  home: page(null, null, (l) => ({
    ...home[l],
    images: { hero: '2019/01/conti-rubinetterie-valves-solutions.jpg', quality: '2018/12/conti-rubinetterie-qualita-garantita.jpg', custom: '2018/11/engineered-valve-solutions.jpg' },
  })),
  products: page(null, segments.products, (l) => ({ ...productsPage[l] })),
  company: page(null, segments.company, (l) => ({
    ...company[l],
    image: '2018/12/world-map-conti.png',
    exploreImages: { history: '2018/11/1946.jpg', production: '2018/11/produzione-header.jpg', certifications: '2018/11/certificazioni-header.jpg', environment: '2018/11/rispetto-ambiente-header.jpg' },
  })),
  history: page('company', segments.history, (l) => ({
    ...historyPage[l],
    milestones: milestones.map((m) => ({ year: String(m.year), image: m.image, text: m.text[l] })),
  })),
  production: page('company', segments.production, (l) => ({ ...production[l], image: '2018/11/produzione-header.jpg', youtube: site.youtubeVideo })),
  certifications: page('company', segments.certifications, (l) => ({ ...certifications[l], gallery: certificateImages })),
  environment: page('company', segments.environment, (l) => ({
    ...environment[l],
    pillars: [
      { title: home[l].environment.sun, text: home[l].environment.sunText },
      { title: home[l].environment.water, text: home[l].environment.waterText },
      { title: home[l].environment.air, text: home[l].environment.airText },
    ],
    image: '2018/11/ambiente1.jpg',
    certificates: [{ image: '2023/10/ISO-14001.jpg' }, { image: '2018/12/zero-emission-UNI-EN-ISO-14064-1.jpg' }],
    certificateFile: '2021/03/Certificato-ISO-14001-2015.pdf',
  })),
  applications: page(null, segments.applications, (l) => ({
    ...applications[l],
    industries: industries.map((i) => ({ image: i.image, name: i.name[l] })),
  })),
  custom: page('applications', segments.custom, (l) => ({
    ...custom[l],
    photos: ['1', '2', '3', '4'].map((n) => ({ image: `2018/11/conti-soluzioni-personalizzate-${n}.jpg` })),
  })),
  alubronze: page('applications', segments.alubronze, (l) => ({ ...alubronze[l], image: '2018/12/bronzo-alluminio-header.jpg' })),
  literature: page(null, segments.literature, (l) => ({
    ...literature[l],
    catalogueFiles: documents.catalogues.map((d) => ({ file: d.file, name: d.name[l], meta: d.meta })),
    manualFiles: documents.manuals.map((m) => ({ image: m.file, family: m.family })),
    certificateFiles: documents.certificates.map((d) => ({ file: d.file, name: d.name, meta: d.meta })),
  })),
  news: page(null, segments.news, (l) => ({
    ...newsPage[l],
    items: news.map((n) => ({ date: n.date, image: n.image, title: n.title[l], text: n.text[l] })),
  })),
  contact: page(null, segments.contact, (l) => ({ ...contactPage[l] })),
  privacy: page(null, segments.privacy, (l) => ({ ...privacy[l], heading: privacy[l].heading, updatedDate: privacyUpdated })),
};
write('pages.json', pages);

// ── Redirects from the old WordPress URLs ────────────────────────────────────
write('redirects.json', redirectRoutes());

console.log(`catalog: ${products.length} products · pages: ${Object.keys(pages).length} · redirects: ${redirectRoutes().length}`);
