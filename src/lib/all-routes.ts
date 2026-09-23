import type { Route } from '../i18n/routes';
import { families } from '../data/families';
import { products } from '../data/catalog';

/** Every page of the site (language independent). */
export function allRoutes(): Route[] {
  return [
    { page: 'home' },
    { page: 'products' },
    ...families.map((f) => ({ page: 'family' as const, family: f.key })),
    ...products.map((p) => ({ page: 'product' as const, family: p.family, code: p.code })),
    ...(['company', 'history', 'production', 'certifications', 'environment'] as const).map((page) => ({ page })),
    ...(['applications', 'custom', 'alubronze'] as const).map((page) => ({ page })),
    ...(['literature', 'news', 'contact', 'privacy'] as const).map((page) => ({ page })),
  ];
}
