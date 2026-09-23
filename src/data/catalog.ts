import raw from './catalog.json';
import { families, familyByKey, subcategoryNames, subcategoryOrder, type FamilyKey } from './families';
import { productText } from './product-text';
import { bodyMaterialOrder, materialNames, parts, rowLabels, tableHeads, tr, variantTexts } from './glossary';
import { locales, type Locale } from '../i18n/config';

export interface Material { part: string; name: string; grade?: string; standard?: string }
export interface DimRow { label?: string; key?: string; values: string[] }
export interface DimTable { head: string | null; sizes: string[]; rows: DimRow[] }
export interface Variant { code: string; text: string; rating: string | null }
export interface Product {
  code: string;
  slug: string;
  wpId: number;
  wpSlug: string;
  family: FamilyKey;
  subcategory: string | null;
  order: number;
  rating: string | null;
  description: { en: string; it: string };
  materials: Material[];
  dimensions: DimTable[];
  variants: Variant[];
  image: string | null;
  drawing: string | null;
}

export const products = raw.products as Product[];

export function describe(p: Product, lang: Locale): string {
  const text = productText[p.code];
  return text ? text[locales.indexOf(lang)] : p.description[lang === 'it' ? 'it' : 'en'];
}

export function productsOf(family: FamilyKey): Product[] {
  return products.filter((p) => p.family === family);
}

/** Products of a family grouped by sub-category, in display order. */
export function groupedProducts(family: FamilyKey): { key: string | null; products: Product[] }[] {
  const list = productsOf(family);
  const keys = [...new Set(list.map((p) => p.subcategory))].sort(
    (a, b) => subcategoryOrder.indexOf(a ?? '') - subcategoryOrder.indexOf(b ?? ''),
  );
  return keys.map((key) => ({
    key,
    products: list.filter((p) => p.subcategory === key).sort((a, b) => a.order - b.order),
  }));
}

export function subcategoryName(key: string, lang: Locale): string {
  return subcategoryNames[key]?.[lang] ?? key;
}

export const partName = (part: string, lang: Locale) => tr(parts, part, lang);
export const variantText = (text: string, lang: Locale) => tr(variantTexts, text, lang);
export const tableHead = (head: string, lang: Locale) => tr(tableHeads, head, lang);
export const rowLabel = (row: DimRow, lang: Locale) => (row.key ? rowLabels[row.key][lang] : row.label ?? '');

export function materialName(m: Material, lang: Locale): string {
  const name = tr(materialNames, m.name, lang);
  return [name, m.grade].filter(Boolean).join(' ');
}

/** Body material, e.g. "Bronze CC491K (UNI EN 1982)". */
export function bodyMaterial(p: Product, lang: Locale): string | null {
  const body = p.materials.find((m) => m.part === 'BODY');
  if (!body) return null;
  return materialName(body, lang) + (body.standard ? ` (${body.standard})` : '');
}

/** Body alloy family, for filters and schema.org. */
export function bodyAlloy(p: Product): string | null {
  const body = p.materials.find((m) => m.part === 'BODY');
  return body ? bodyMaterialOrder.find((b) => body.name === b) ?? body.name : null;
}

export function sizeRange(p: Product): string | null {
  const sizes = p.dimensions[0]?.sizes.filter(Boolean);
  if (!sizes?.length) return null;
  return sizes.length === 1 ? sizes[0] : `${sizes[0]} – ${sizes[sizes.length - 1]}`;
}

/** Nominal pressure, e.g. "PN25" from "PN25/B 150WSP 300WOG". */
export function pn(p: Product): string | null {
  return p.rating?.match(/PN\s?\d+(-\d+)?/)?.[0].replace(' ', '') ?? null;
}

export { families, familyByKey };
