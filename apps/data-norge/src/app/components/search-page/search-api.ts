import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { type AggregationKeyCount } from "@fdk-frontend/ui";
import { type SearchSetSegment } from "@fdk-frontend/ui/search-tabs/search-tab-config";

import { buildSearchRequestBody } from "../../[lang]/search/search-request-body";
import {
  buildAccessAggregationsByTab,
  buildOrgPathAggregationsByTab,
  buildProvenanceAggregationsByTab,
  buildSpatialAggregationsByTab,
  buildFormatAggregationsByTab,
  computeBadgeCountsFromSummary,
  flattenSummaryHits,
  SEARCH_SUMMARY_PAGE,
  SEARCH_SUMMARY_PAGE_SIZE,
  type SearchSummaryResponse,
} from "../../[lang]/search/search-summary";
import { type DocsSearchResult, type SearchResultsProp } from "./search-page-types";

const postJson = async function <T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed: ${url}`);
  return (await res.json()) as T;
};

const tryPostJson = async function <T>(url: string, body: unknown): Promise<T | undefined> {
  try {
    return await postJson<T>(url, body);
  } catch {
    return undefined;
  }
};

export type SummaryFetchResult = {
  searchResults: SearchResultsProp;
  tabBadgeCounts: Record<string, number>;
  orgAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  accessAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  provenanceAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  spatialAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  formatAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
};

export const fetchSummary = async function (
  query: string,
  orgPathParam: string | null,
  accessParam: string | null,
  provenanceParam: string | null,
  spatialParam: string | null,
  formatParam: string | null,
  pageSize: number = SEARCH_SUMMARY_PAGE_SIZE,
): Promise<SummaryFetchResult> {
  const json = await postJson<SearchSummaryResponse>(
    "/api/search/summary",
    buildSearchRequestBody({
      query,
      orgPathParam,
      accessParam,
      provenanceParam,
      spatialParam,
      formatParam,
      pagination: { size: pageSize, page: SEARCH_SUMMARY_PAGE },
    }),
  );

  return {
    searchResults: { hits: flattenSummaryHits(json.summary) },
    tabBadgeCounts: computeBadgeCountsFromSummary(json.summary),
    orgAggregationsByTab: buildOrgPathAggregationsByTab(json.summary),
    accessAggregationsByTab: buildAccessAggregationsByTab(json.summary),
    provenanceAggregationsByTab: buildProvenanceAggregationsByTab(json.summary),
    spatialAggregationsByTab: buildSpatialAggregationsByTab(json.summary),
    formatAggregationsByTab: buildFormatAggregationsByTab(json.summary),
  };
};

export const fetchLlmResults = async function (query: string): Promise<LlmSearchResponse | undefined> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return undefined;
  return tryPostJson<LlmSearchResponse>("/api/search/llm", { query: trimmedQuery });
};

export const fetchDocsResults = async function (query: string, locale: LocaleCodes): Promise<DocsSearchResult[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  const res = await fetch(`/api/docs-search?q=${encodeURIComponent(trimmedQuery)}&lang=${encodeURIComponent(locale)}`, {
    method: "GET",
  });
  if (!res.ok) return [];

  try {
    const json = (await res.json()) as { results?: DocsSearchResult[] };
    return json.results ?? [];
  } catch {
    return [];
  }
};
