"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { Tag } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import type { SearchSuggestion, SearchSuggestionTitle } from "@fdk-frontend/types";
import {
  buildResourcePath,
  buildSearchPageQueryUrl,
  deriveSearchSetIdFromPathname,
  isCatalogSet,
  type SearchSetId,
} from "@fdk-frontend/utils";

import NavLinkList from "../nav-link-list";
import { readEntityLabel, SearchTraySeeAll, TrayPanelStatus } from "./search-tray-panel";
import { fetchTrayJson, isTrayRecord, useDebouncedTrayFetch } from "./use-debounced-tray-fetch";

const TITLE_LOCALES = ["nb", "nn", "en", "no"] as const;

const readSuggestionTitle = (value: unknown): SearchSuggestionTitle | undefined => {
  if (!isTrayRecord(value)) return undefined;
  const title: SearchSuggestionTitle = {};
  for (const key of TITLE_LOCALES) {
    const candidate = value[key];
    if (typeof candidate === "string") title[key] = candidate;
  }
  return title;
};

const readSuggestion = (value: unknown): SearchSuggestion | undefined => {
  if (!isTrayRecord(value)) return undefined;
  if (typeof value.id !== "string" || typeof value.searchType !== "string") return undefined;
  const title = readSuggestionTitle(value.title);
  if (!title) return undefined;
  const uri = typeof value.uri === "string" ? value.uri : "";
  return { id: value.id, searchType: value.searchType, uri, title };
};

const readSuggestions = (value: unknown): SearchSuggestion[] => {
  if (!isTrayRecord(value) || !Array.isArray(value.suggestions)) return [];
  return value.suggestions.flatMap((item) => {
    const suggestion = readSuggestion(item);
    return suggestion ? [suggestion] : [];
  });
};

const getSuggestionsUrl = (setId: SearchSetId, query: string): string => {
  const params = new URLSearchParams({ q: query });
  if (isCatalogSet(setId) && setId !== "all-catalogs") params.set("entityPath", setId);
  return `/api/search/suggestions?${params.toString()}`;
};

const fetchSuggestions = async (url: string, signal: AbortSignal): Promise<SearchSuggestion[]> => {
  try {
    return readSuggestions(await fetchTrayJson(url, signal));
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw err;
    return [];
  }
};

const getLocalizedTitle = (title: SearchSuggestionTitle, locale: LocaleCodes): string => {
  const candidates = [title[locale], title.nb, title.no, title.nn, title.en];
  for (const candidate of candidates) {
    if (candidate && candidate.trim() !== "") return candidate;
  }
  return "";
};

export type SearchTraySuggestionsProps = {
  locale: LocaleCodes;
  query: string;
  onSelect?: () => void;
};

const SearchTraySuggestions = ({ locale, query, onSelect }: SearchTraySuggestionsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSet = deriveSearchSetIdFromPathname(pathname);
  const { ready, data } = useDebouncedTrayFetch(query, activeSet, (nextQuery, signal) =>
    fetchSuggestions(getSuggestionsUrl(activeSet, nextQuery), signal),
  );
  const suggestions = (data ?? []).filter((suggestion) =>
    buildResourcePath(locale, suggestion.searchType, suggestion.id),
  );
  const entityLabels = getLocalization(locale).common.entities;
  const seeAllHref = buildSearchPageQueryUrl({
    pathname,
    locale,
    searchParams,
    query,
  });
  const items = suggestions.flatMap((suggestion) => {
    const href = buildResourcePath(locale, suggestion.searchType, suggestion.id);
    if (!href) return [];
    const typeLabel = readEntityLabel(entityLabels, suggestion.searchType);
    return [
      {
        id: suggestion.id,
        href,
        label: getLocalizedTitle(suggestion.title, locale),
        suffix: typeLabel ? <Tag data-size="sm">{typeLabel}</Tag> : undefined,
        onClick: onSelect,
      },
    ];
  });

  return (
    <TrayPanelStatus
      locale={locale}
      ready={ready}
      empty={items.length === 0}
    >
      <NavLinkList items={items} />
      <SearchTraySeeAll
        href={seeAllHref}
        locale={locale}
        onSelect={onSelect}
      />
    </TrayPanelStatus>
  );
};

export default SearchTraySuggestions;
