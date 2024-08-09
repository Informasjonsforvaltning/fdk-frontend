import React from 'react';

export type LocaleCodes = 'nb' | 'nn' | 'en';

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
  [key: string]: any;
}

export const getDictionary = async (localeCode: LocaleCodes, set: string): Promise<Dictionary> => {
  try {
    const module = await import(`../dictionaries/${localeCode}/${set}.json`);
    return module.default as Dictionary;
  } catch (error) {
    console.warn(`Could not load dictionary for locale: ${localeCode}, set: ${set}. Falling back to default locale.`);
    const fallbackModule = await import(`../dictionaries/${i18n.defaultLocale}/${set}.json`);
    return fallbackModule.default as Dictionary;
  }
};

/**
 * Interpolates values into a string containing HTML.
 * @param {string} str - The string containing placeholders and HTML.
 * @param {Object} params - The object containing key-value pairs for interpolation.
 * @returns {React.Element} - The interpolated string as a React element.
 */
export const interpolate = (str: string, params: any) => {
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