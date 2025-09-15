import React from 'react';

export type LocaleCodes = 'nb' | 'nn' | 'en';

export const i18n = {
    defaultLocale: 'nb',
    locales: [
        {
            code: 'nb',
            name: 'Bokmål',
        },
        {
            code: 'nn',
            name: 'Nynorsk',
        },
        {
            code: 'en',
            name: 'English',
        },
    ],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export type Dictionary = {
    [key: string]: any;
};

// Cache for loaded dictionaries to avoid repeated imports
const dictionaryCache = new Map<string, Dictionary>();

export const getDictionary = async (localeCode: LocaleCodes, set: string): Promise<Dictionary> => {
    const cacheKey = `${localeCode}-${set}`;

    // Check cache first
    if (dictionaryCache.has(cacheKey)) {
        return dictionaryCache.get(cacheKey)!;
    }

    try {
        const module = await import(`../dictionaries/${localeCode}/${set}.json`);
        const dictionary = module.default as Dictionary;
        dictionaryCache.set(cacheKey, dictionary);
        return dictionary;
    } catch (error) {
        console.warn(
            `Could not load dictionary for locale: ${localeCode}, set: ${set}. Falling back to default locale.`,
        );
        const fallbackKey = `${i18n.defaultLocale}-${set}`;

        if (dictionaryCache.has(fallbackKey)) {
            return dictionaryCache.get(fallbackKey)!;
        }

        const fallbackModule = await import(`../dictionaries/${i18n.defaultLocale}/${set}.json`);
        const fallbackDictionary = fallbackModule.default as Dictionary;
        dictionaryCache.set(fallbackKey, fallbackDictionary);
        return fallbackDictionary;
    }
};

export const getSafeDictionary = (dictionary: Dictionary): Dictionary => {
    return JSON.parse(JSON.stringify(dictionary)) as Dictionary;
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
