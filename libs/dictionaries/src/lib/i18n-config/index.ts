import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { NextRequest } from 'next/server';

export const i18n = {
  defaultLocale: 'nb',
  locales: ['en', 'no', 'nb', 'nn'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  nb: () => import('../dictionaries/nb.json').then((module) => module.default),
  nn: () => import('../dictionaries/nn.json').then((module) => module.default),
  no: () => import('../dictionaries/nb.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.nb();

export const getLocale = (request: NextRequest): string | undefined => {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales.slice();

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

