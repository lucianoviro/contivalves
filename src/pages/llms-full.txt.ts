import type { APIRoute } from 'astro';
import { href } from '../i18n/routes';
import { families } from '../data/families';
import { bodyMaterial, describe, groupedProducts, materialName, partName, rowLabel, sizeRange, subcategoryName, variantText } from '../data/catalog';
import { site } from '../data/site';

/** The whole catalogue as Markdown, for AI assistants and anyone who needs the data in one file. */
export const GET: APIRoute = () => {
  const abs = (p: string) => new URL(p, site.url).href;
  const out: string[] = [
    `# ${site.name} – product catalogue`,
    '',
    `All valves are designed, cast, machined, assembled and 100% pressure-tested by ${site.legalName} in ${site.address.city} (${site.address.province}), Italy. Dimensions in mm, weights in kg.`,
    '',
  ];
  for (const f of families) {
    out.push(`## ${f.name.en}`, '', f.intro.en, '');
    for (const g of groupedProducts(f.key)) {
      if (g.key) out.push(`### ${subcategoryName(g.key, 'en')}`, '');
      for (const p of g.products) {
        out.push(`#### ${p.code} – ${describe(p, 'en')}`, '');
        out.push(`- URL: ${abs(href({ page: 'product', family: p.family, code: p.code }, 'en'))}`);
        if (p.rating) out.push(`- Pressure rating: ${p.rating}`);
        const size = sizeRange(p);
        if (size) out.push(`- Sizes: ${size}`);
        const body = bodyMaterial(p, 'en');
        if (body) out.push(`- Body: ${body}`);
        if (p.materials.length) out.push(`- Materials: ${p.materials.map((m) => `${partName(m.part, 'en')} ${materialName(m, 'en')}${m.standard ? ` (${m.standard})` : ''}`).join('; ')}`);
        if (p.variants.length) out.push(`- Versions: ${p.variants.map((v) => `${v.code} ${variantText(v.text, 'en')}${v.rating ? ` (${v.rating})` : ''}`).join('; ')}`);
        for (const d of p.dimensions) {
          out.push('', `| Size | ${d.rows.map((r) => rowLabel(r, 'en')).join(' | ')} |`, `|${'---|'.repeat(d.rows.length + 1)}`);
          d.sizes.forEach((s, i) => out.push(`| ${s} | ${d.rows.map((r) => r.values[i] || '–').join(' | ')} |`));
        }
        out.push('');
      }
    }
  }
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
