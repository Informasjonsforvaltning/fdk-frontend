import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { NextRequest } from 'next/server';

export const i18n = {
  defaultLocale: 'nb',
  locales: [
    { code: 'en',
      name: 'English',
    },
    { code: 'nb',
      name: 'Bokmål',
    },
    { code: 'nn',
      name: 'Nynorsk',
    },
  ],
} as const;

export type Locale = typeof i18n['locales'][number];

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  nb: () => import('../dictionaries/nb.json').then((module) => module.default),
  nn: () => import('../dictionaries/nn.json').then((module) => module.default),
  no: () => import('../dictionaries/nb.json').then((module) => module.default),
};

export type Dictionary = typeof getDictionary extends (...args: any) => Promise<infer T> ? T : never;

export const getDictionary = async (locale: Locale['code']) => dictionaries[locale]?.() ?? dictionaries[i18n.defaultLocale]();

export const getLocale = (request: NextRequest): Locale | undefined => {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const localeCodes: string[] = i18n.locales.map((locale) => locale.code);
  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(localeCodes);
  const locale = matchLocale(languages, localeCodes, i18n.defaultLocale);
  return i18n.locales.find((l) => l.code === locale);
}

