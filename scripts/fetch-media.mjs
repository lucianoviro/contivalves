#!/usr/bin/env node
/**
 * Downloads the images and PDFs used by the new site from the OLD WordPress site
 * (run it while the old site is still online):
 *
 *   npm run fetch-media               # everything referenced in src/
 *   npm run fetch-media -- --no-datasheets
 *
 * - images  → src/assets/media/<yyyy>/<mm>/<file>   (optimised by Astro at build time)
 * - PDFs    → public/media/<yyyy>/<mm>/<file>       (served as-is)
 * - product datasheets (PDF links found on the old product pages) → public/media/datasheets/<code>.pdf
 *
 * Files already present are skipped, so the script can be re-run safely.
 */
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const OLD = process.env.OLD_SITE ?? 'https://www.contivalves.com';
const ROOT = new URL('..', import.meta.url).pathname;
const withDatasheets = !process.argv.includes('--no-datasheets');

const exists = (p) => stat(p).then(() => true, () => false);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (!['assets', 'node_modules'].includes(e.name)) yield* walk(p); }
    else if (/\.(ts|json|astro|mjs)$/.test(e.name)) yield p;
  }
}

// 1. Collect every "yyyy/mm/file.ext" path referenced in the source.
const refs = new Set();
for await (const file of walk(join(ROOT, 'src'))) {
  const text = await readFile(file, 'utf8');
  for (const m of text.matchAll(/\b(20\d\d\/\d\d\/[\w.-]+\.(?:jpe?g|png|webp|pdf))\b/gi)) refs.add(m[1]);
}

async function download(url, dest) {
  if (await exists(dest)) return 'skip';
  const res = await fetch(url);
  if (!res.ok) return `HTTP ${res.status}`;
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  return 'ok';
}

async function pool(items, size, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: size }, async () => { while (queue.length) await fn(queue.shift()); }));
}

const failed = [];
let done = 0;
await pool([...refs], 6, async (path) => {
  const dest = path.endsWith('.pdf') ? join(ROOT, 'public/media', path) : join(ROOT, 'src/assets/media', path);
  const r = await download(`${OLD}/wp-content/uploads/${path}`, dest).catch((e) => e.message);
  if (r !== 'ok' && r !== 'skip') failed.push(`${path} (${r})`);
  if (++done % 25 === 0) console.log(`  ${done}/${refs.size}`);
});
console.log(`Media: ${refs.size - failed.length}/${refs.size} available.`);

// 2. Product datasheets: the PDF link is only on the old product pages.
if (withDatasheets) {
  const catalog = JSON.parse(await readFile(join(ROOT, 'src/data/catalog.json'), 'utf8'));
  let found = 0;
  await pool(catalog.products, 4, async (p) => {
    const dest = join(ROOT, 'public/media/datasheets', `${p.code.replace(/\s+/g, '')}.pdf`);
    if (await exists(dest)) { found++; return; }
    for (const slug of [p.slug, p.wpSlug]) {
      const res = await fetch(`${OLD}/prodotti/${slug}/`).catch(() => null);
      if (!res?.ok) continue;
      const html = await res.text();
      const pdf = html.match(/href="([^"]+\/wp-content\/uploads\/[^"]+\.pdf)"/i)?.[1];
      if (pdf && ['ok', 'skip'].includes(await download(pdf, dest))) { found++; return; }
    }
    failed.push(`datasheet ${p.code}`);
  });
  console.log(`Datasheets: ${found}/${catalog.products.length}.`);
}

if (failed.length) {
  console.log(`\nNot downloaded (${failed.length}) – the site shows a placeholder instead:`);
  for (const f of failed) console.log('  - ' + f);
}
