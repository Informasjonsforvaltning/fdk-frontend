'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type LocaleCodes } from '@fdk-frontend/localization';
import { type LlmSearchResponse } from '@fdk-frontend/data-access';
import {
  isValidSetSegment,
  type SearchSetSegment,
} from '../../[lang]/search/search-set-config';
import SearchPage, { type SearchResultsProp } from './index';
import type { SearchPageProps } from './index';

function deriveLangFromPathname(pathname: string): LocaleCodes {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment === 'nb' || segment === 'nn' || segment === 'en') return segment;
  return 'nb';
}

function deriveCurrentSetFromPathname(pathname: string): SearchSetSegment | undefined {
  const segments = pathname.split('/').filter(Boolean);
  const afterSearch = segments[2];
  if (afterSearch !== undefined && isValidSetSegment(afterSearch)) return afterSearch;
  return undefined;
}

async function fetchSearchData(query: string): Promise<{
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
}

export type SearchPageClientProps = Pick<SearchPageProps, 'lang'>;

export default function SearchPageClient({ lang }: SearchPageClientProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const langFromUrl = deriveLangFromPathname(pathname);
  const currentSet = deriveCurrentSetFromPathname(pathname);
  const query = searchParams.get('q') ?? '';

  const [llmResults, setLlmResults] = useState<LlmSearchResponse | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<SearchResultsProp | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query?.trim() ?? '';
    if (!q) {
      setLlmResults(undefined);
      setSearchResults(undefined);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchSearchData(q)
      .then(({ llmResults: llm, searchResults: entities }) => {
        if (!cancelled) {
          setLlmResults(llm);
          setSearchResults(entities);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLlmResults(undefined);
          setSearchResults(undefined);
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
    />
  );
}
