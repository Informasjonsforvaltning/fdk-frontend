import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { type AggregationKeyCount, type SearchPageInfo } from "@fdk-frontend/ui";
import { SUMMARY_SLICES, type SearchSetSegment } from "@fdk-frontend/ui/search-tabs/search-tab-config";
import { type SearchObject } from "@fellesdatakatalog/types";

import { buildSearchRequestBody } from "../../[lang]/search/search-request-body";
import {
  buildAccessAggregationsByTab,
  buildOrgPathAggregationsByTab,
  buildProvenanceAggregationsByTab,
  buildSpatialAggregationsByTab,
  buildFormatAggregationsByTab,
  buildLosThemeAggregationsByTab,
  buildDataThemeAggregationsByTab,
  computeBadgeCountsFromSummary,
  SEARCH_SUMMARY_PAGE,
  type SearchSummaryResponse,
  type SearchSummarySlice,
} from "../../[lang]/search/search-summary";
import { type DocsSearchResult, type SearchResultsProp } from "./search-page-types";

// To be used when only aggregations and counts are needed, not actual hits
const SUMMARY_AGGREGATIONS_PAGE_SIZE = 1;

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
  losThemeAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  dataThemeAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
};

export type EntityTabFetchResult = {
  hits: SearchObject[];
  page: SearchPageInfo;
};

export type FetchSummaryOptions = {
  query: string;
  orgPathParam: string | null;
  accessParam: string | null;
  provenanceParam: string | null;
  spatialParam: string | null;
  formatParam: string | null;
  losThemeParam: string | null;
  dataThemeParam: string | null;
  sortParam: string | null;
};

export const fetchSummary = async function (options: FetchSummaryOptions): Promise<SummaryFetchResult> {
  const json = await postJson<SearchSummaryResponse>(
    "/api/search/summary",
    buildSearchRequestBody({
      query: options.query,
      orgPathParam: options.orgPathParam,
      accessParam: options.accessParam,
      provenanceParam: options.provenanceParam,
      spatialParam: options.spatialParam,
      formatParam: options.formatParam,
      losThemeParam: options.losThemeParam,
      dataThemeParam: options.dataThemeParam,
      sortParam: options.sortParam,
      pagination: { size: SUMMARY_AGGREGATIONS_PAGE_SIZE, page: SEARCH_SUMMARY_PAGE },
    }),
  );

  return {
    searchResults: { hits: [] },
    tabBadgeCounts: computeBadgeCountsFromSummary(json.summary),
    orgAggregationsByTab: buildOrgPathAggregationsByTab(json.summary),
    accessAggregationsByTab: buildAccessAggregationsByTab(json.summary),
    provenanceAggregationsByTab: buildProvenanceAggregationsByTab(json.summary),
    spatialAggregationsByTab: buildSpatialAggregationsByTab(json.summary),
    formatAggregationsByTab: buildFormatAggregationsByTab(json.summary),
    losThemeAggregationsByTab: buildLosThemeAggregationsByTab(json.summary),
    dataThemeAggregationsByTab: buildDataThemeAggregationsByTab(json.summary),
  };
};

export const fetchEntityTabResults = async function (
  entityTab: Exclude<SearchSetSegment, "docs">,
  options: {
    query: string;
    orgPathParam: string | null;
    accessParam: string | null;
    provenanceParam: string | null;
    spatialParam: string | null;
    formatParam: string | null;
    losThemeParam: string | null;
    dataThemeParam: string | null;
    sortParam: string | null;
    page: number;
    size: number;
  },
): Promise<EntityTabFetchResult> {
  const slices = SUMMARY_SLICES.filter((slice) => slice.tabKey === entityTab);
  const requestBody = buildSearchRequestBody({
    query: options.query,
    orgPathParam: options.orgPathParam,
    accessParam: options.accessParam,
    provenanceParam: options.provenanceParam,
    spatialParam: options.spatialParam,
    formatParam: options.formatParam,
    losThemeParam: options.losThemeParam,
    dataThemeParam: options.dataThemeParam,
    sortParam: options.sortParam,
    pagination: { page: options.page, size: options.size },
  });

  const results = await Promise.all(
    slices.map((slice) =>
      postJson<SearchSummarySlice>("/api/search/entity", {
        ...requestBody,
        path: slice.entityPath,
      }),
    ),
  );

  const hits: SearchObject[] = [];
  let totalElements = 0;

  for (let index = 0; index < slices.length; index += 1) {
    const slice = slices[index];
    const result = results[index];
    totalElements += result?.page?.totalElements ?? 0;

    for (const hit of result?.hits ?? []) {
      hits.push({
        ...hit,
        searchType: (hit.searchType ?? slice.searchType) as SearchObject["searchType"],
      });
    }
  }

  const totalPages = options.size > 0 ? Math.ceil(totalElements / options.size) : 0;

  return {
    hits,
    page: {
      currentPage: options.page,
      size: options.size,
      totalElements,
      totalPages,
    },
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
