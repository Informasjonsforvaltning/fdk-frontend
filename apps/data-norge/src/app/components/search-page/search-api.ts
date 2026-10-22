import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { type AggregationKeyCount } from "@fdk-frontend/ui";
import { SEARCH_SUMMARY_SLICES, type SearchPageInfo, type SearchSetId } from "@fdk-frontend/utils";
import { type SearchObject } from "@fellesdatakatalog/types";

import { buildSearchRequestBody } from "../../[lang]/search/search-request-body";
import {
  buildAccessAggregationsBySet,
  buildOrgPathAggregationsBySet,
  buildProvenanceAggregationsBySet,
  buildDcatProfileAggregationsBySet,
  buildSpatialAggregationsBySet,
  buildFormatAggregationsBySet,
  buildLosThemeAggregationsBySet,
  buildDataThemeAggregationsBySet,
  computeBadgeCountsFromSummary,
  normalizeSearchSummarySlice,
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
  setBadgeCounts: Record<string, number>;
  orgAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  accessAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  provenanceAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  dcatProfileAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  spatialAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  formatAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  losThemeAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  dataThemeAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
};

export type CatalogFetchResult = {
  hits: SearchObject[];
  page: SearchPageInfo;
};

export type FetchSummaryOptions = {
  query: string;
  orgPathParam: string | null;
  accessParam: string | null;
  provenanceParam: string | null;
  dcatProfileParam: string | null;
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
      ...options,
      pagination: { size: SUMMARY_AGGREGATIONS_PAGE_SIZE, page: SEARCH_SUMMARY_PAGE },
    }),
  );

  return {
    setBadgeCounts: computeBadgeCountsFromSummary(json.summary),
    orgAggregationsBySet: buildOrgPathAggregationsBySet(json.summary),
    accessAggregationsBySet: buildAccessAggregationsBySet(json.summary),
    provenanceAggregationsBySet: buildProvenanceAggregationsBySet(json.summary),
    dcatProfileAggregationsBySet: buildDcatProfileAggregationsBySet(json.summary),
    spatialAggregationsBySet: buildSpatialAggregationsBySet(json.summary),
    formatAggregationsBySet: buildFormatAggregationsBySet(json.summary),
    losThemeAggregationsBySet: buildLosThemeAggregationsBySet(json.summary),
    dataThemeAggregationsBySet: buildDataThemeAggregationsBySet(json.summary),
  };
};

export type CatalogFetchOptions = FetchSummaryOptions & {
  page: number;
  size: number;
};

const applySliceSearchType = function (hits: SearchObject[] | undefined, searchType: string): SearchObject[] {
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

export const fetchAllCatalogResults = async function (options: CatalogFetchOptions): Promise<CatalogFetchResult> {
  const { page, size } = options;
  const result = await postJson<SearchSummarySlice>(
    "/api/search/entities",
    buildSearchRequestBody({
      ...options,
      pagination: { page, size },
    }),
  );
  const normalized = normalizeSearchSummarySlice(result);

  return {
    hits: normalized.hits ?? [],
    page: buildPageInfo(page, size, normalized.page?.totalElements ?? 0),
  };
};

export const fetchCatalogResults = async function (
  setId: SearchSetId,
  options: CatalogFetchOptions,
): Promise<CatalogFetchResult> {
  if (setId === "all-catalogs") return fetchAllCatalogResults(options);

  const { page, size } = options;
  const slice = SEARCH_SUMMARY_SLICES.find((candidate) => candidate.setId === setId);

  if (!slice) {
    return { hits: [], page: buildPageInfo(page, size, 0) };
  }

  const result = await postJson<SearchSummarySlice>("/api/search/entity", {
    ...buildSearchRequestBody({
      ...options,
      pagination: { page, size },
    }),
    path: slice.setId,
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
