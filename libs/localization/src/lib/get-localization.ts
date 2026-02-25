import type { LocaleCodes, Localization } from './types';
import { i18n } from './types';
import nb from './locales/nb';
import nn from './locales/nn';
import en from './locales/en';

const locales: Record<LocaleCodes, Localization> = {
  nb,
  nn,
  en,
};

/**
 * Returns the full localization object for the given locale.
 * Falls back to default locale (nb) if the locale is invalid.
 */
export function getLocalization(localeCode: LocaleCodes): Localization {
  const locale = locales[localeCode] ?? locales[i18n.defaultLocale];
  return locale;
}
