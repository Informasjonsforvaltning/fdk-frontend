import { type Metadata } from 'next';
import { getLocalization, type LocaleCodes, i18n } from '@fdk-frontend/localization';
import { llmSearch, type LlmSearchResponse } from '@fdk-frontend/data-access';
import { type SearchApiResponse } from '@fdk-frontend/data-access/server';
import { searchAllEntities } from '@fdk-frontend/data-access/server';
import SearchPage from '../../components/search-page';
import {
  isValidSetSegment,
  type SearchSetSegment,
} from './search-set-config';

export type SearchPageHandlerProps = {
  params: Promise<{
    lang: LocaleCodes;
    set?: string[];
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function getSearchPageData(props: SearchPageHandlerProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = params.lang ?? i18n.defaultLocale;
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const firstSegment = params.set?.[0];
  const currentSet: SearchSetSegment | undefined =
    firstSegment !== undefined && isValidSetSegment(firstSegment)
      ? firstSegment
      : undefined;

  const { FDK_LLM_SEARCH_BASE_URI: llmSearchBaseUri = '' } = process.env;
  const endpoint = llmSearchBaseUri ? `${llmSearchBaseUri}/llm` : '';

  let llmResults: LlmSearchResponse | undefined = undefined;
  let searchResults: SearchApiResponse | undefined = undefined;

  if (query) {
    if (endpoint) {
      try {
        llmResults = await llmSearch(endpoint, query);
        console.log(llmResults);
      } catch (err) {
        console.warn('LLM search error:', err);
      }
    }
    try {
      searchResults = await searchAllEntities({
        query,
        pagination: { size: 20, page: 0 },
      });
    } catch (err) {
      console.warn('Search API error:', err);
    }
  }

  return {
    locale,
    query,
    currentSet,
    llmResults,
    searchResults,
  };
}

export function SearchPageHandlerContent({
  locale,
  query,
  currentSet,
  llmResults,
  searchResults,
}: Awaited<ReturnType<typeof getSearchPageData>>) {
  return (
    <SearchPage
      lang={locale}
      query={query}
      currentSet={currentSet}
      llmResults={llmResults}
      searchResults={searchResults}
    />
  );
}

export async function getSearchPageMetadata(props: SearchPageHandlerProps): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = params.lang ?? i18n.defaultLocale;
  const dictionary = getLocalization(locale).common;
  const firstSegment = params.set?.[0];
  const segmentPath =
    firstSegment && isValidSetSegment(firstSegment) ? `/${firstSegment}` : '';
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const qs = query ? `?q=${encodeURIComponent(query)}` : '';

  return {
    title: `${dictionary.header.findDataButton || 'Search'} - data.norge.no`,
    description: `Search for data on data.norge.no`,
    alternates: {
      canonical: `https://data.norge.no/${locale}/search${segmentPath}${qs}`,
      languages: {
        nb: `https://data.norge.no/nb/search${segmentPath}${qs}`,
        en: `https://data.norge.no/en/search${segmentPath}${qs}`,
        nn: `https://data.norge.no/nn/search${segmentPath}${qs}`,
      },
    },
  };
}
