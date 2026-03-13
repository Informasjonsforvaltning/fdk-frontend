'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type LocaleCodes } from '@fdk-frontend/localization';
import { type LlmSearchResponse } from '@fdk-frontend/data-access';
import { type SearchObject } from '@fellesdatakatalog/types';
import {
  isValidSetSegment,
  KI_TOGGLE_VALUE,
  type SearchSetSegment,
} from '../../[lang]/search/search-set-config';
import SearchPage, {
  type DocsSearchResult,
  type SearchPageProps,
  type SearchResultsProp,
} from './index';

const deriveLangFromPathname = function (pathname: string): LocaleCodes {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment === 'nb' || segment === 'nn' || segment === 'en') return segment;
  return 'nb';
};

const deriveCurrentSetFromPathname = function (pathname: string): SearchSetSegment | undefined {
  const segments = pathname.split('/').filter(Boolean);
  const afterSearch = segments[2];
  if (afterSearch !== undefined && isValidSetSegment(afterSearch)) return afterSearch;
  return undefined;
};

type SummarySlice = {
  hits?: SearchObject[];
  page?: { totalElements?: number };
};

type SummaryPayload = {
  summary: {
    datasets?: SummarySlice;
    apis?: SummarySlice;
    concepts?: SummarySlice;
    informationModels?: SummarySlice;
    services?: SummarySlice;
    events?: SummarySlice;
  };
};

const computeBadgeCountsFromSummary = function computeBadgeCountsFromSummary(summary: SummaryPayload['summary']): Record<string, number> {
  const datasets = summary.datasets?.page?.totalElements ?? 0;
  const apis = summary.apis?.page?.totalElements ?? 0;
  const concepts = summary.concepts?.page?.totalElements ?? 0;
  const informationModels = summary.informationModels?.page?.totalElements ?? 0;
  const services = summary.services?.page?.totalElements ?? 0;
  const events = summary.events?.page?.totalElements ?? 0;
  return {
    [KI_TOGGLE_VALUE]: 0,
    datasets,
    apis,
    concepts,
    'information-models': informationModels,
    'services-and-events': services + events,
    docs: 0,
  };
};

const SUMMARY_SET_TO_SEARCH_TYPE: Record<string, string> = {
  datasets: 'DATASET',
  apis: 'DATA_SERVICE',
  concepts: 'CONCEPT',
  informationModels: 'INFORMATION_MODEL',
  services: 'SERVICE',
  events: 'EVENT',
};

const flattenSummaryHits = function flattenSummaryHits(summary: SummaryPayload['summary']): SearchObject[] {
  const hits: SearchObject[] = [];
  const entries: (keyof SummaryPayload['summary'])[] = [
    'datasets', 'apis', 'concepts', 'informationModels', 'services', 'events',
  ];
  for (const key of entries) {
    const slice = summary[key];
    const searchType = SUMMARY_SET_TO_SEARCH_TYPE[key];
    if (slice?.hits?.length && searchType) {
      for (const h of slice.hits as SearchObject[]) {
        hits.push({ ...h, searchType: (h.searchType ?? searchType) as SearchObject['searchType'] });
      }
    }
  }
  return hits;
};

const fetchSearchData = async function (query: string): Promise<{
  llmResults: LlmSearchResponse | undefined;
  searchResults: SearchResultsProp | undefined;
}> {
  const [llmRes, entitiesRes] = await Promise.all([
    fetch('/api/search/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query.trim() }),
    }),
    fetch('/api/search/entities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query.trim(),
        pagination: { size: 20, page: 0 },
      }),
    }),
  ]);

  let llmResults: LlmSearchResponse | undefined;
  if (llmRes.ok) {
    try {
      llmResults = (await llmRes.json()) as LlmSearchResponse;
    } catch {
      // ignore
    }
  }

  let searchResults: SearchResultsProp | undefined;
  if (entitiesRes.ok) {
    try {
      searchResults = (await entitiesRes.json()) as SearchResultsProp;
    } catch {
      // ignore
    }
  }

  return { llmResults, searchResults };
};

export type SearchPageClientProps = Pick<SearchPageProps, 'lang'>;

const SearchPageClient = function ({ lang }: SearchPageClientProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const langFromUrl = deriveLangFromPathname(pathname);
  const currentSet = deriveCurrentSetFromPathname(pathname);
  const query = searchParams.get('q') ?? '';

  const [llmResults, setLlmResults] = useState<LlmSearchResponse | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<SearchResultsProp | undefined>(undefined);
  const [docsResults, setDocsResults] = useState<DocsSearchResult[] | undefined>(undefined);
  const [badgeCountsOverride, setBadgeCountsOverride] = useState<Record<string, number> | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query?.trim() ?? '';
    let cancelled = false;

    if (!q) {
      setLlmResults(undefined);
      setBadgeCountsOverride(undefined);
      setDocsResults(undefined);
      setLoading(true);
      fetch('/api/search/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pagination: { size: 10, page: 0 } }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error('Search summary failed');
          const json = (await res.json()) as SummaryPayload;
          if (cancelled) return;
          const combinedHits = flattenSummaryHits(json.summary);
          setSearchResults({ hits: combinedHits });
          setBadgeCountsOverride(computeBadgeCountsFromSummary(json.summary));
        })
        .catch(() => {
          if (!cancelled) {
            setSearchResults(undefined);
            setBadgeCountsOverride(undefined);
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
      return () => {
        cancelled = true;
      };
    }

    setBadgeCountsOverride(undefined);
    setDocsResults(undefined);
    setLoading(true);
    const localeForDocs = (lang ?? langFromUrl) as LocaleCodes;
    Promise.all([
      fetchSearchData(q),
      fetch(
        `/api/docs-search?q=${encodeURIComponent(q)}&lang=${encodeURIComponent(localeForDocs)}`,
        {
          method: 'GET',
        },
      ).then(async (res) => {
        if (!res.ok) return [] as DocsSearchResult[];
        try {
          const json = (await res.json()) as { results?: DocsSearchResult[] };
          return json.results ?? [];
        } catch {
          return [] as DocsSearchResult[];
        }
      }),
    ])
      .then(([{ llmResults: llm, searchResults: entities }, docs]) => {
        if (!cancelled) {
          setLlmResults(llm);
          setSearchResults(entities);
          setDocsResults(docs);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLlmResults(undefined);
          setSearchResults(undefined);
          setDocsResults(undefined);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  const displayLang = lang ?? langFromUrl;

  if (loading) {
    return (
      <SearchPage
        lang={displayLang}
        query={query}
        currentSet={currentSet}
        llmResults={undefined}
        searchResults={undefined}
        docsResults={undefined}
        badgeCountsOverride={undefined}
        loading
      />
    );
  }

  return (
    <SearchPage
      lang={displayLang}
      query={query}
      currentSet={currentSet}
      llmResults={llmResults}
      searchResults={searchResults}
      docsResults={docsResults}
      badgeCountsOverride={badgeCountsOverride}
    />
  );
};

export default SearchPageClient;
