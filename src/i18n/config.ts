export const locales = ['en', 'it', 'fr', 'es', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** A string (or anything) in every language. */
export type L<T = string> = Record<Locale, T>;

export const localeMeta: L<{ label: string; name: string; htmlLang: string; og: string }> = {
  en: { label: 'EN', name: 'English', htmlLang: 'en', og: 'en_GB' },
  it: { label: 'IT', name: 'Italiano', htmlLang: 'it', og: 'it_IT' },
  fr: { label: 'FR', name: 'Français', htmlLang: 'fr', og: 'fr_FR' },
  es: { label: 'ES', name: 'Español', htmlLang: 'es', og: 'es_ES' },
  de: { label: 'DE', name: 'Deutsch', htmlLang: 'de', og: 'de_DE' },
};
