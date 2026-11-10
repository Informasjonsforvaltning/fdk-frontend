"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { Tag } from "@digdir/designsystemet-react";
import type { SearchSuggestion } from "@fellesdatakatalog/types";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import {
  buildResourcePath,
  buildSearchPageQueryUrl,
  deriveSearchSetIdFromPathname,
  isCatalogSet,
  printLocaleValue,
  printOrganizationLabel,
  type SearchSetId,
} from "@fdk-frontend/utils";

import NavLinkList from "../nav-link-list";
import { readEntityLabel, SearchTraySeeAll, TrayPanelStatus } from "./search-tray-panel";
import { fetchTrayJson, isTrayRecord, useDebouncedTrayFetch } from "./use-debounced-tray-fetch";

/** The suggestions route returns the search-service body. This only checks that `suggestions` is an array. */
const readSuggestions = (value: unknown): SearchSuggestion[] => {
  if (!isTrayRecord(value) || !Array.isArray(value.suggestions)) return [];
  return value.suggestions as SearchSuggestion[];
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
    const label = printLocaleValue(locale, suggestion.title);
    if (!label) return [];
    const typeLabel = readEntityLabel(entityLabels, suggestion.searchType);
    return [
      {
        id: suggestion.id,
        href,
        label,
        orgNr: suggestion.organization?.id?.trim() ?? "",
        orgTitle: printOrganizationLabel(locale, suggestion.organization) || undefined,
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
