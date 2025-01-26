import { i18n } from '@fdk-frontend/dictionaries';

export const printLocaleValue = (obj: any, locale: string) => {
    if (typeof obj === 'string') return obj;
    return obj?.[locale] || obj?.[i18n.defaultLocale];
}