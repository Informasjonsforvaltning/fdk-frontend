import type { LocaleCodes } from '@fdk-frontend/localization';

const yearPattern = /^\d{4}$/;
const yearMonthPattern = /^\d{4}-\d{2}$/;
const fullDatePattern = /^\d{4}-\d{2}-\d{2}$/;

const formatYearMonth = (value: string, locale: LocaleCodes): string => {
    const [year, month] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, 1));

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        timeZone: 'UTC',
    }).format(date);
};

const formatFullDate = (value: string, locale: LocaleCodes): string => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString(locale, { dateStyle: 'long' });
};

export const formatTemporalDate = (value: string | undefined | null, locale: LocaleCodes): string => {
    if (!value) {
        return '';
    }

    if (yearPattern.test(value)) {
        return value;
    } else if (yearMonthPattern.test(value)) {
        return formatYearMonth(value, locale);
    } else if (fullDatePattern.test(value)) {
        return formatFullDate(value, locale);
    }

    return value;
};
