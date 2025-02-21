import { type LocaleCodes, i18n } from '@fdk-frontend/dictionaries';

export const print = (str?: string) => {
	return str || '[undefined]';
}

export const printLocaleValue = (locale: LocaleCodes, value: any) => {
    if (!value) return;
    if (typeof value === 'string') return value;
    return value[locale] || value[i18n.defaultLocale] || value['no'];
}

export const sumArrayLengths = (...arrays: any[][]) => {
    return arrays.reduce((sum, array) => sum + (array?.length || 0), 0);
}

export const openLicenses = [
	'creativecommons.org/licenses/by/4.0/deed.no',
	'data.norge.no/nlod/no/1.0',
	'creativecommons.org/publicdomain/zero/1.0',
	'data.norge.no/nlod/no/2.0',
	'creativecommons.org/licenses/by/4.0',
	'data.norge.no/nlod/no',
	'data.norge.no/nlod',
	'publications.europa.eu/resource/authority/licence/CC0',
	'publications.europa.eu/resource/authority/licence/NLOD_2_0',
	'publications.europa.eu/resource/authority/licence/CC_BY_4_0'
];

export const isOpenLicense = (uri?: string) => {
	if (!uri) return false;
	const normalizedStr = new URL(uri).hostname + new URL(uri).pathname;
	return openLicenses.includes(normalizedStr);
}

export const calculateMetadataScore = (score: any) => {
  const calcScore = score?.score ?? 0;
  const calcMaxScore = score?.max_score ?? 0;
  return calcMaxScore === 0 ? 0 : Math.round((calcScore / calcMaxScore) * 100);
}