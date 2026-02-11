import { type Metadata } from 'next';
import { getDictionary, type LocaleCodes, i18n } from '@fdk-frontend/dictionaries';
import { llmSearch, type LlmSearchResponse } from '@fdk-frontend/data-access';
import SearchPage from '../../components/search-page';

import type { ItemObjectType } from '../../components/search-page';

interface Props {
    params: Promise<{
        lang: LocaleCodes;
    }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page(props: Props) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const locale = params.lang ?? i18n.defaultLocale;
    const dictionary = await getDictionary(locale, 'common');
    const query = typeof searchParams.query === 'string' ? searchParams.query : undefined;

    const { FDK_LLM_SEARCH_BASE_URI: llmSearchBaseUri = '' } = process.env;
    const endpoint = llmSearchBaseUri ? `${llmSearchBaseUri}/llm` : '';

    let results: LlmSearchResponse<ItemObjectType> | undefined = undefined;

    if (query && endpoint) {
        try {
            results = await llmSearch<ItemObjectType>(endpoint, query);
        } catch (err) {
            console.warn('LLM search error:', err);
        }
    }

    return (
        <SearchPage
            dictionaries={{ common: dictionary }}
            query={query}
            results={results}
        />
    );
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const params = await props.params;
    const locale = params.lang ?? i18n.defaultLocale;
    const dictionary = await getDictionary(locale, 'common');

    return {
        title: `${dictionary.header.findDataButton || 'Search'} - data.norge.no`,
        description: `Search for data on data.norge.no`,
        alternates: {
            canonical: `https://data.norge.no/${locale}/search`,
            languages: {
                nb: `https://data.norge.no/nb/search`,
                en: `https://data.norge.no/en/search`,
                nn: `https://data.norge.no/nn/search`,
            },
        },
    };
};
