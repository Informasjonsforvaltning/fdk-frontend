import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { type AggregationKeyCount, type SearchPageInfo } from "@fdk-frontend/ui";
import {
  SUMMARY_SLICES,
  type SearchSetSegment,
  type SummarySliceConfig,
} from "@fdk-frontend/ui/search-tabs/search-tab-config";
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
import { type DocsSearchResult } from "./search-page-types";

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

type EntityTabFetchOptions = {
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
};

const applySliceSearchType = function (
  hits: SearchObject[] | undefined,
  searchType: SummarySliceConfig["searchType"],
): SearchObject[] {
  return (hits ?? []).map((hit) => ({
    ...hit,
    searchType: (hit.searchType ?? searchType) as SearchObject["searchType"],
  }));
};

const buildPageInfo = function (page: number, size: number, totalElements: number): SearchPageInfo {
  return {
    currentPage: page,
    size,
    totalElements,
    totalPages: size > 0 ? Math.ceil(totalElements / size) : 0,
  };
};

export const fetchEntityTabResults = async function (
  entityTab: Exclude<SearchSetSegment, "docs">,
  options: EntityTabFetchOptions,
): Promise<EntityTabFetchResult> {
  const { page, size } = options;
  const slice = SUMMARY_SLICES.find((candidate) => candidate.tabKey === entityTab);

  if (!slice) {
    return { hits: [], page: buildPageInfo(page, size, 0) };
  }

  const result = await postJson<SearchSummarySlice>("/api/search/entity", {
    ...buildSearchRequestBody({
      query: options.query,
      orgPathParam: options.orgPathParam,
      accessParam: options.accessParam,
      provenanceParam: options.provenanceParam,
      spatialParam: options.spatialParam,
      formatParam: options.formatParam,
      losThemeParam: options.losThemeParam,
      dataThemeParam: options.dataThemeParam,
      sortParam: options.sortParam,
      pagination: { page, size },
    }),
    path: slice.entityPath,
  });

  return {
    hits: applySliceSearchType(result?.hits, slice.searchType),
    page: buildPageInfo(page, size, result?.page?.totalElements ?? 0),
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
