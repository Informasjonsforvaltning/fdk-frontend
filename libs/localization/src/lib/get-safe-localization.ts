import type { Localization, LocaleCodes } from './types';
import { getLocalization } from './get-localization';

/**
 * Returns a deep clone of the full localization object.
 * Use when passing the same localization to multiple components that may mutate it.
 */
export function getSafeLocalization(localization: Localization): Localization {
  return JSON.parse(JSON.stringify(localization)) as Localization;
}

/**
 * Returns a deep clone of a single section.
 * Use when only one section is passed to children and you need an isolated copy.
 */
export function getSafeSection(localeCode: LocaleCodes, section: string): Localization {
  const localization = getLocalization(localeCode);
  const sectionData = localization[section];
  return JSON.parse(JSON.stringify(sectionData)) as Localization;
}
