import React from 'react';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { NextRequest } from 'next/server';

export const i18n = {
  defaultLocale: 'nb',
  locales: [
    {
      code: 'nb',
      name: 'Bokmål',
      flag: '🇳🇴'
    },
    {
      code: 'nn',
      name: 'Nynorsk',
      flag: '🇳🇴'
    },
    {
      code: 'en',
      name: 'English',
      flag: '🇬🇧'
    },
  ],
} as const;

export type Locale = typeof i18n['locales'][number];

export type Dictionary = {
  [key: string]: string | Dictionary;
}

export const getDictionary = async (locale: string, set: string): Promise<Dictionary> => {
  try {
    const module = await import(`../dictionaries/${locale}/${set}.json`);
    return module.default as Dictionary;
  } catch (error) {
    console.warn(`Could not load dictionary for locale: ${locale}, set: ${set}. Falling back to default locale.`);
    const fallbackModule = await import(`../dictionaries/${i18n.defaultLocale}/${set}.json`);
    return fallbackModule.default as Dictionary;
  }
};

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

/**
 * Interpolates values into a string containing HTML.
 * @param {string} str - The string containing placeholders and HTML.
 * @param {Object} params - The object containing key-value pairs for interpolation.
 * @returns {React.Element} - The interpolated string as a React element.
 */
export const interpolate = (str, params) => {
  const regex = /{{\s*([^{}\s]+)\s*}}/g;
  let match;
  const parts = [];
  let lastIndex = 0;

  while ((match = regex.exec(str)) !== null) {
    const key = match[1];
    parts.push(str.slice(lastIndex, match.index));
    parts.push(<React.Fragment key={key}>{params[key]}</React.Fragment>);
    lastIndex = regex.lastIndex;
  }

  parts.push(str.slice(lastIndex));
  return <>{parts}</>;
};