"use client";
import { Tag } from "@digdir/designsystemet-react";
import { type LocaleCodes, getLocalization } from "@fdk-frontend/localization";
import {
  buildResourcePath,
  mapLlmHitTypeToSearchType,
  readLlmSearchBody,
  readLlmSearchCache,
  writeLlmSearchCache,
  type LlmSearchCacheBody,
} from "@fdk-frontend/utils";

import NavLinkList from "../nav-link-list";
import { buildTraySetHref, readEntityLabel, SearchTraySeeAll, TrayPanelStatus } from "./search-tray-panel";
import { fetchTrayJson, useDebouncedTrayFetch } from "./use-debounced-tray-fetch";

type TrayAiHit = {
  id: string;
  title: string;
  type: string;
};

const toTrayHits = (body: LlmSearchCacheBody): TrayAiHit[] =>
  body.hits.map((hit) => ({ id: hit.id, title: hit.title, type: hit.type }));

const fetchAiHits = async (query: string, signal: AbortSignal): Promise<TrayAiHit[]> => {
  const cached = readLlmSearchCache(query);
  if (cached) return toTrayHits(cached);

  try {
    const body = readLlmSearchBody(
      await fetchTrayJson("/api/search/llm", signal, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      }),
    );
    if (!body) return [];
    writeLlmSearchCache(query, body);
    return toTrayHits(body);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw err;
    return [];
  }
};

export type SearchTrayAiSuggestionsProps = {
  locale: LocaleCodes;
  query: string;
  onSelect?: () => void;
};

const SearchTrayAiSuggestions = ({ locale, query, onSelect }: SearchTrayAiSuggestionsProps) => {
  const { ready, data } = useDebouncedTrayFetch(query, "", (nextQuery, signal) => fetchAiHits(nextQuery, signal));
  const entityLabels = getLocalization(locale).common.entities;
  const items = (data ?? []).flatMap((hit) => {
    const searchType = mapLlmHitTypeToSearchType(hit.type);
    const href = buildResourcePath(locale, searchType, hit.id);
    if (!href) return [];
    const typeLabel = readEntityLabel(entityLabels, searchType);
    return [
      {
        id: `${hit.type}:${hit.id}`,
        href,
        label: hit.title,
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
        href={buildTraySetHref(locale, "ai", query)}
        locale={locale}
        onSelect={onSelect}
      />
    </TrayPanelStatus>
  );
};

export default SearchTrayAiSuggestions;
