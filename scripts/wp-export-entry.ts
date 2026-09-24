/**
 * Collects all site data (catalogue, page copy in 5 languages, glossary, UI strings, redirects)
 * into JSON files for the WordPress plugin (wordpress/wp-content/plugins/conti-core/data/).
 * Run with: npm run export:wp
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { locales, localeMeta, type L, type Locale } from '../src/i18n/config';
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
// Every page is exported already composed with the "Conti" blocks of the plugin (inc/blocks.php),
// one block tree per language: key → { parent, slug per language, seo per language, blocks per language }.
// Block tree: { name, attrs, inner?, html? } – serialised to post content by the importer.
type Block = { name: string; attrs: Record<string, unknown>; inner?: Block[]; html?: string };
type PageDef = { parent: string | null; slug: L | null; seo: L<{ title: string; description: string }>; blocks: L<Block[]> };
type Seo = { title: string; description: string };

const u = (key: keyof typeof ui, l: Locale): string => ui[key][l];
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Attributes holding plain values (links, media, options); every other string is rich text (HTML).
const PLAIN = new Set(['url', 'linkUrl', 'buttonUrl', 'file', 'image', 'style', 'subject', 'youtube', 'date', 'codes', 'family', 'source', 'icon', 'ratio', 'fit', 'background', 'padding', 'width', 'color', 'align', 'className', 'alt']);
const attrsOf = (value: unknown, key = ''): unknown => {
  if (Array.isArray(value)) return value.map((v) => attrsOf(v, key));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && !v.length))
        .map(([k, v]) => [k, attrsOf(v, k)]),
    );
  }
  return typeof value === 'string' && !PLAIN.has(key) ? esc(value) : value;
};
const b = (name: string, attrs: Record<string, unknown> = {}, inner?: Block[]): Block => ({
  name: name.includes('/') ? name : `conti/${name}`,
  attrs: attrsOf(attrs) as Record<string, unknown>,
  ...(inner ? { inner } : {}),
});
const section = (attrs: Record<string, unknown>, ...inner: Block[]) => b('section', attrs, inner);
const split = (attrs: Record<string, unknown>, left: Block[], right: Block[]) => b('split', attrs, [b('column', {}, left), b('column', {}, right)]);
const p = (text: string, style?: 'lead' | 'eyebrow' | 'intro') => {
  const cls = style === 'intro' ? 'intro' : style ? `is-style-${style}` : '';
  return { name: 'core/paragraph', attrs: cls ? { className: cls } : {}, html: `<p${cls ? ` class="${cls}"` : ''}>${esc(text)}</p>` };
};
const h2 = (text: string, cls = '') => ({ name: 'core/heading', attrs: cls ? { className: cls } : {}, html: `<h2 class="wp-block-heading${cls ? ` ${cls}` : ''}">${esc(text)}</h2>` });
const head = (attrs: { eyebrow?: string; heading: string; lead?: string; intro?: string }) => b('page-head', attrs);
const cta = () => b('cta');
const link = (label: string, url: string, style = 'arrow') => ({ label, url, style });

const page = (parent: string | null, slug: L | null, seo: L<Seo>, blocks: (l: Locale) => Block[]): PageDef => ({
  parent,
  slug,
  seo: per((l) => ({ title: seo[l].title, description: seo[l].description })),
  blocks: per(blocks),
});

const images = {
  hero: '2019/01/conti-rubinetterie-valves-solutions.jpg',
  quality: '2018/12/conti-rubinetterie-qualita-garantita.jpg',
  custom: '2018/11/engineered-valve-solutions.jpg',
  map: '2018/12/world-map-conti.png',
  production: '2018/11/produzione-header.jpg',
  environment: '2018/11/ambiente1.jpg',
  alubronze: '2018/12/bronzo-alluminio-header.jpg',
};
const explore = { history: '2018/11/1946.jpg', production: '2018/11/produzione-header.jpg', certifications: '2018/11/certificazioni-header.jpg', environment: '2018/11/rispetto-ambiente-header.jpg' } as const;

const pages: Record<string, PageDef> = {
  home: page(null, null, home, (l) => {
    const f = home[l];
    const env = f.environment;
    return [
      b('hero', {
        eyebrow: f.eyebrow, heading: f.heading, lead: f.lead, image: images.hero, badgeTitle: '1919', badgeText: 'Valduggia · Italy',
        buttons: [link(u('cta.viewRange', l), 'page:products', 'primary'), link(u('cta.contact', l), 'page:contact', 'ghost')],
      }),
      section({ padding: 'tight' }, b('stats', { items: f.facts.map((x) => ({ value: x.value, label: x.label })) })),
      section({},
        b('section-head', { eyebrow: u('nav.products', l), heading: f.productsHeading, text: f.productsText, linkLabel: u('nav.allProducts', l), linkUrl: 'page:products' }),
        b('family-grid', {}),
      ),
      section({ background: 'mist' }, split({},
        [p(u('nav.certifications', l), 'eyebrow'), h2(f.quality.heading), p(f.quality.text, 'lead'),
          b('links', { items: [link(u('nav.production', l), 'page:production'), link(u('nav.certifications', l), 'page:certifications')] })],
        [b('image', { image: images.quality, alt: f.quality.heading })],
      )),
      section({}, split({ reverse: true },
        [p(u('nav.applications', l), 'eyebrow'), h2(f.custom.heading), p(f.custom.text, 'lead'),
          b('links', { items: [link(u('cta.discover', l), 'page:custom'), link(u('nav.alubronze', l), 'page:alubronze')] })],
        [b('image', { image: images.custom, alt: f.custom.heading })],
      )),
      section({ background: 'night' },
        b('section-head', { eyebrow: u('nav.environment', l), heading: env.heading, text: env.text, linkLabel: u('cta.discover', l), linkUrl: 'page:environment' }),
        b('pillars', { items: [
          { icon: 'sun', title: env.sun, text: env.sunText },
          { icon: 'water', title: env.water, text: env.waterText },
          { icon: 'air', title: env.air, text: env.airText },
        ] }),
      ),
      section({ width: 'narrow' }, p('FAQ', 'eyebrow'), h2(f.faqHeading), b('faq', { items: f.faq.map((q) => ({ q: q.q, a: q.a })) })),
      cta(),
    ];
  }),

  products: page(null, segments.products, productsPage, (l) => {
    const f = productsPage[l];
    return [
      head({ heading: f.heading, lead: f.lead }),
      section({}, b('family-grid', { columns: 3, showIntro: true })),
      section({ background: 'mist' }, split({},
        [h2(f.materialsHeading), p(f.materialsText, 'lead')],
        [b('links', { items: [link(u('nav.custom', l), 'page:custom', 'primary'), link(u('nav.alubronze', l), 'page:alubronze', 'ghost'), link(u('nav.literature', l), 'page:literature', 'ghost')] })],
      )),
      cta(),
    ];
  }),

  company: page(null, segments.company, company, (l) => {
    const f = company[l];
    return [
      head({ eyebrow: u('nav.companyOverview', l), heading: f.heading, lead: f.lead }),
      section({}, split({},
        [b('quote', { text: f.quote, author: f.quoteBy }), p(f.mission, 'lead')],
        [b('image', { image: images.map, alt: f.facts[6]?.[1] ?? '', ratio: 'auto' })],
      )),
      section({ background: 'mist', width: 'narrow' }, h2(f.factsHeading), b('facts', { items: f.facts.map(([term, value]) => ({ term, value })) })),
      section({}, h2(f.exploreHeading), b('cards', {
        items: (Object.keys(explore) as (keyof typeof explore)[]).map((key) => ({ image: explore[key], title: u(`nav.${key}`, l), url: `page:${key}` })),
      })),
      cta(),
    ];
  }),

  history: page('company', segments.history, historyPage, (l) => {
    const f = historyPage[l];
    return [
      head({ eyebrow: '1919 – 2019', heading: f.heading, lead: f.lead, intro: f.text }),
      section({}, b('timeline', { items: milestones.map((m) => ({ year: String(m.year), image: m.image, text: m.text[l] })) })),
      cta(),
    ];
  }),

  production: page('company', segments.production, production, (l) => {
    const f = production[l];
    return [
      head({ eyebrow: u('nav.production', l), heading: f.heading, lead: f.lead }),
      section({}, split({}, [p(f.text, 'lead')], [b('image', { image: images.production, alt: f.heading, ratio: '16/10' })])),
      section({ background: 'mist' }, b('steps', { items: f.steps.map((x) => ({ title: x.title, text: x.text })), howTo: true })),
      section({ width: 'narrow' }, b('video', { youtube: site.youtubeVideo, title: f.videoTitle })),
      cta(),
    ];
  }),

  certifications: page('company', segments.certifications, certifications, (l) => {
    const f = certifications[l];
    return [
      head({ eyebrow: u('nav.certifications', l), heading: f.heading, lead: f.lead }),
      section({}, b('steps', { items: f.blocks.map((x) => ({ title: x.title, text: x.text })), style: 'blocks' })),
      section({ background: 'mist' }, h2(f.galleryHeading), b('gallery', { items: certificateImages.map((g) => ({ image: g.image, label: g.label })) })),
      cta(),
    ];
  }),

  environment: page('company', segments.environment, environment, (l) => {
    const f = environment[l];
    const h = home[l].environment;
    return [
      head({ eyebrow: 'ISO 14001', heading: f.heading, lead: f.lead }),
      section({ padding: 'tight' }, b('stats', { items: f.stats.map((x) => ({ value: x.value, label: x.label })), color: 'patina' })),
      section({}, split({}, [h2(f.sun.title), p(f.sun.text, 'lead')], [b('image', { image: images.environment, alt: f.sun.title, ratio: '4/3' })])),
      section({ background: 'mist' }, split({ reverse: true },
        [h2(f.iso.title), p(f.iso.text), b('links', { items: [{ label: `${f.certificate} (PDF)`, file: '2021/03/Certificato-ISO-14001-2015.pdf', style: 'arrow' }] })],
        [b('gallery', { style: 'plain', items: ['2023/10/ISO-14001.jpg', '2018/12/zero-emission-UNI-EN-ISO-14064-1.jpg'].map((image) => ({ image, label: f.certificate })) })],
      )),
      section({}, h2(f.pillarsHeading), b('pillars', { style: 'patina', items: [
        { title: h.sun, text: h.sunText },
        { title: h.water, text: h.waterText },
        { title: h.air, text: h.airText },
      ] })),
      cta(),
    ];
  }),

  applications: page(null, segments.applications, applications, (l) => {
    const f = applications[l];
    return [
      head({ eyebrow: u('nav.applications', l), heading: f.heading, lead: f.lead }),
      section({}, p(f.text, 'intro'), h2(f.industriesHeading, 'visually-hidden'), b('cards', { items: industries.map((i) => ({ image: i.image, title: i.name[l] })) })),
      section({ background: 'mist' }, b('cards', { style: 'teaser', items: [
        { eyebrow: '2006', title: u('nav.custom', l), url: 'page:custom', linkLabel: u('cta.discover', l) },
        { eyebrow: 'Cu-Al', title: u('nav.alubronze', l), url: 'page:alubronze', linkLabel: u('cta.discover', l) },
      ] })),
      cta(),
    ];
  }),

  custom: page('applications', segments.custom, custom, (l) => {
    const f = custom[l];
    return [
      head({ eyebrow: 'Custom Engineered Solutions · 2006', heading: f.heading, lead: f.lead }),
      section({}, split({},
        f.paragraphs.map((x) => p(x)),
        [b('checklist', { style: 'box', heading: f.optionsHeading, items: f.options.map((text) => ({ text })), buttonLabel: f.cta, buttonUrl: `email:technical?subject=${encodeURIComponent(f.heading)}` })],
      )),
      section({ padding: 'tight', background: 'mist' }, b('gallery', { style: 'photo', items: ['1', '2', '3', '4'].map((n) => ({ image: `2018/11/conti-soluzioni-personalizzate-${n}.jpg`, label: f.heading })) })),
      cta(),
    ];
  }),

  alubronze: page('applications', segments.alubronze, alubronze, (l) => {
    const f = alubronze[l];
    return [
      head({ eyebrow: 'Cu-Al', heading: f.heading, lead: f.lead }),
      section({}, split({},
        f.paragraphs.map((x) => p(x)),
        [b('image', { image: images.alubronze, alt: f.heading, ratio: '16/10' }), b('checklist', { heading: f.propertiesHeading, items: f.properties.map((text) => ({ text })) })],
      )),
      section({ background: 'mist' }, h2(f.rangeHeading), b('product-grid', { source: 'alubronze' })),
      cta(),
    ];
  }),

  literature: page(null, segments.literature, literature, (l) => {
    const f = literature[l];
    return [
      head({ heading: f.heading, lead: f.lead }),
      section({ padding: 'tight' }, h2(f.catalogues), b('documents', { items: documents.catalogues.map((d) => ({ file: d.file, name: d.name[l], meta: d.meta })) })),
      section({ padding: 'tight', background: 'mist' }, h2(f.manuals), b('gallery', {
        style: 'manual', columns: 3,
        items: documents.manuals.map((m) => ({ image: m.file, label: families.find((x) => x.key === m.family)!.name[l], url: `family:${m.family}` })),
      })),
      section({ padding: 'tight' }, h2(f.certificates), b('documents', { items: documents.certificates.map((d) => ({ file: d.file, name: d.name, meta: d.meta })) })),
      cta(),
    ];
  }),

  news: page(null, segments.news, newsPage, (l) => [
    head({ heading: newsPage[l].heading }),
    section({ width: 'narrow' }, b('news', { items: news.map((n) => ({ date: n.date, image: n.image, title: n.title[l], text: n.text[l] })) })),
  ]),

  contact: page(null, segments.contact, contactPage, (l) => {
    const f = contactPage[l];
    return [head({ heading: f.heading, lead: f.lead }), section({}, b('contact', { departmentsHeading: f.departments, visitHeading: f.visit }))];
  }),

  privacy: page(null, segments.privacy, privacy, (l) => {
    const f = privacy[l];
    const date = new Intl.DateTimeFormat(localeMeta[l].htmlLang, { dateStyle: 'long' }).format(new Date(privacyUpdated));
    return [
      head({ heading: f.heading, lead: `${f.updated}: ${date}` }),
      section({ width: 'text' }, ...f.sections.flatMap((x) => [h2(x.h), ...x.p.map((t) => p(t))])),
    ];
  }),
};
write('pages.json', pages);

// ── Redirects from the old WordPress URLs ────────────────────────────────────
write('redirects.json', redirectRoutes());

console.log(`catalog: ${products.length} products · pages: ${Object.keys(pages).length} · redirects: ${redirectRoutes().length}`);
