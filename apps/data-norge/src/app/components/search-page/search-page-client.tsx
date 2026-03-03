'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type LocaleCodes } from '@fdk-frontend/localization';
import { type LlmSearchResponse } from '@fdk-frontend/data-access';
import {
  isValidSetSegment,
  type SearchSetSegment,
} from '../../[lang]/search/search-set-config';
import SearchPage, { type SearchPageProps, type SearchResultsProp } from './index';

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

const PAGINATION = { size: 20, page: 0 };

/** Fetch all results: either for a set (e.g. datasets, apis) or generic (no set). No LLM. */
const fetchEntitiesOnly = async function (
  set: SearchSetSegment | undefined
): Promise<SearchResultsProp | undefined> {
  const body: { query?: string; set?: string; pagination: { size: number; page: number } } = {
    pagination: PAGINATION,
  };
  if (set !== undefined) {
    body.set = set;
  } else {
    body.query = '';
  }
  const res = await fetch('/api/search/entities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) return undefined;
  try {
    return (await res.json()) as SearchResultsProp;
  } catch {
    return undefined;
  }
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
        pagination: PAGINATION,
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query?.trim() ?? '';
    let cancelled = false;
    setLoading(true);
    if (!q) {
      setLlmResults(undefined);
      fetchEntitiesOnly(currentSet)
        .then((entities) => {
          if (!cancelled) setSearchResults(entities);
        })
        .catch(() => {
          if (!cancelled) setSearchResults(undefined);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else {
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
    }
    return () => {
      cancelled = true;
    };
  }, [query, currentSet]);

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
};

export default SearchPageClient;
