import type { APIRoute } from 'astro';
import { href } from '../i18n/routes';
import { families } from '../data/families';
import { productsOf } from '../data/catalog';
import { site } from '../data/site';
import { home } from '../content/home';
import { company } from '../content/company';

/** llms.txt – a plain summary of the company and links for AI assistants (https://llmstxt.org). */
export const GET: APIRoute = () => {
  const abs = (p: string) => new URL(p, site.url).href;
  const c = company.en;
  const lines = [
    `# ${site.name} (${site.brand})`,
    '',
    `> ${home.en.description}`,
    '',
    ...c.facts.map(([k, v]) => `- ${k}: ${v}`),
    `- Phone: ${site.phone}`,
    `- Sales: ${site.emails.sales} · Technical department: ${site.emails.technical} · General: ${site.emails.general}`,
    '- Languages: English, Italiano, Français, Español, Deutsch',
    '',
    '## Product families',
    '',
    ...families.map((f) => `- [${f.name.en}](${abs(href({ page: 'family', family: f.key }, 'en'))}) (${productsOf(f.key).length} ${productsOf(f.key).length === 1 ? "item" : "items"}): ${f.intro.en}`),
    '',
    '## Company',
    '',
    `- [About Conti](${abs(href({ page: 'company' }, 'en'))})`,
    `- [History since 1919](${abs(href({ page: 'history' }, 'en'))})`,
    `- [Production process](${abs(href({ page: 'production' }, 'en'))})`,
    `- [Certifications](${abs(href({ page: 'certifications' }, 'en'))})`,
    `- [Environment](${abs(href({ page: 'environment' }, 'en'))})`,
    `- [Industries served](${abs(href({ page: 'applications' }, 'en'))})`,
    `- [Custom engineered solutions](${abs(href({ page: 'custom' }, 'en'))})`,
    `- [Aluminium bronze valves](${abs(href({ page: 'alubronze' }, 'en'))})`,
    `- [Contact](${abs(href({ page: 'contact' }, 'en'))})`,
    '',
    '## FAQ',
    '',
    ...home.en.faq.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    '## Optional',
    '',
    `- [Full product catalogue in plain text](${abs('/llms-full.txt')}): every item with pressure rating, sizes, materials and versions.`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
