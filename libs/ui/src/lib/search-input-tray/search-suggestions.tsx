"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Spinner, Tag, Button } from "@digdir/designsystemet-react";
import { type LocaleCodes, getLocalization } from "@fdk-frontend/localization";
import type { SearchSuggestion, SearchSuggestionsResponse, SearchSuggestionTitle } from "@fdk-frontend/types";

import { buildSearchPageUrl } from "../search-form/search-page-url";
import { deriveSearchTabValueFromPathname } from "../search-tabs/search-tab-route";
import { SEARCH_TAB_DEFINITIONS, type SearchTabsValue } from "../search-tabs/search-tab-config";
import styles from "./search-suggestions.module.scss";

const DEBOUNCE_MS = 200;

const getEntityPathForTab = (tab: SearchTabsValue): string | undefined => {
  if (tab === "ki" || tab === "docs") return undefined;
  const def = SEARCH_TAB_DEFINITIONS.find((d) => d.tab === tab);
  return def?.pathSegment ?? undefined;
};

const getSuggestionsUrl = (tab: SearchTabsValue, query: string): string => {
  const params = new URLSearchParams({ q: query });
  const entityPath = getEntityPathForTab(tab);
  if (entityPath) params.set("entityPath", entityPath);
  return `/api/search/suggestions?${params.toString()}`;
};

const searchTypeToTab = (searchType: string): SearchTabsValue => {
  const found = SEARCH_TAB_DEFINITIONS.find(
    (def) => def.searchTypes && (def.searchTypes as readonly string[]).includes(searchType),
  );
  return found ? found.tab : "datasets";
};

const getLocalizedTitle = (title: SearchSuggestionTitle, locale: LocaleCodes): string => {
  const candidates = [title[locale], title.nb, title.no, title.nn, title.en];
  for (const candidate of candidates) {
    if (candidate && candidate.trim() !== "") return candidate;
  }
  return "";
};

export type SearchSuggestionsProps = {
  query: string;
  locale: LocaleCodes;
  onSelect?: () => void;
};

const SearchSuggestions = ({ query, locale, onSelect }: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = deriveSearchTabValueFromPathname(pathname);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(getSuggestionsUrl(activeTab, trimmed), {
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const data: SearchSuggestionsResponse = await res.json();
        if (controller.signal.aborted) return;
        setSuggestions(data.suggestions ?? []);
      } catch (err) {
        if (!(err instanceof Error && err.name === "AbortError")) {
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, activeTab]);

  const entityLabels = getLocalization(locale).common.entities;
  const dictionary = getLocalization(locale).searchPage;

  const handleSelect = (suggestion: SearchSuggestion) => {
    const title = getLocalizedTitle(suggestion.title, locale);
    const tab = searchTypeToTab(suggestion.searchType);
    onSelect?.();
    router.push(buildSearchPageUrl({ locale, tab, query: title }));
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner
          data-size="sm"
          aria-hidden="true"
        />
      </div>
    );
  }

  if (suggestions.length === 0) {
    return dictionary.entitySearch.noResults;
  }

  return (
    <ul role="listbox">
      {suggestions.map((suggestion) => {
        const title = getLocalizedTitle(suggestion.title, locale);
        const typeLabel = entityLabels[suggestion.searchType];
        return (
          <li
            key={suggestion.id}
            role="option"
            aria-selected={false}
          >
            <Button
              className={styles.searchSuggestionItem}
              onClick={() => handleSelect(suggestion)}
              variant="tertiary"
              data-size="sm"
            >
              <span className={styles.title}>{title}</span>
              {typeLabel && <Tag>{typeLabel}</Tag>}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchSuggestions;
