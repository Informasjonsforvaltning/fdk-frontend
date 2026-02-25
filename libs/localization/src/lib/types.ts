/**
 * Supported locale codes for data.norge.no.
 */
export type LocaleCodes = 'nb' | 'nn' | 'en';

/**
 * Localization payload: nested key-value structure (full locale or a section).
 * Permissive type so nested property access works without assertions across the codebase.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- intentional for i18n payload shape (see JSDoc)
export type Localization = Record<string, any>;

export const i18n = {
  defaultLocale: 'nb' as const,
  locales: [
    { code: 'nb', name: 'Bokmål' },
    { code: 'nn', name: 'Nynorsk' },
    { code: 'en', name: 'English' },
  ],
} as const;

export type Locale = (typeof i18n)['locales'][number];
