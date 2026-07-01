import {
  mergeAccessAggregations,
  mergeOrgPathAggregations,
  mergeProvenanceAggregations,
  mergeSpatialAggregations,
  mergeFormatAggregations,
  mergeLosThemeAggregations,
  mergeDataThemeAggregations,
  type AggregationKeyCount,
} from "@fdk-frontend/ui";
import {
  ENTITY_TABS,
  KI_TOGGLE_VALUE,
  SUMMARY_SLICES,
  type SearchSetSegment,
  type SummarySliceKey,
} from "@fdk-frontend/ui/search-tabs/search-tab-config";
import { isSearchSortBody, type SearchSortBody } from "@fdk-frontend/ui/search-form/sort";
import { type SearchObject } from "@fellesdatakatalog/types";

export type OrgPathAggregationEntry = {
  key: string | null;
  count: number;
};

export type SearchSummarySlice = {
  hits?: SearchObject[];
  page?: {
    currentPage: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  aggregations?: {
    accessRights: OrgPathAggregationEntry[];
    openData: OrgPathAggregationEntry[];
    orgPath: OrgPathAggregationEntry[];
    provenance: OrgPathAggregationEntry[];
    spatial: OrgPathAggregationEntry[];
    format: OrgPathAggregationEntry[];
    losTheme: OrgPathAggregationEntry[];
    dataTheme: OrgPathAggregationEntry[];
    [key: string]: unknown;
  };
};

export type SearchSummary = Record<SummarySliceKey, SearchSummarySlice>;

export type SearchSummaryResponse = {
  summary: SearchSummary;
};

export const SEARCH_SUMMARY_PAGE_SIZE = 10;
export const SEARCH_SUMMARY_PAGE = 0;

export type SearchApiOptions = {
  pagination: { size?: number; page?: number };
  query?: string;
  filters?: Record<string, unknown>;
  sort?: SearchSortBody;
};

export const buildSearchApiOptions = function (body: {
  pagination?: { size?: number; page?: number };
  query?: unknown;
  filters?: unknown;
  sort?: unknown;
}): SearchApiOptions {
  const pagination = body.pagination ?? { size: SEARCH_SUMMARY_PAGE_SIZE, page: SEARCH_SUMMARY_PAGE };
  const query = typeof body.query === "string" ? body.query : undefined;
  const filters =
    body.filters && typeof body.filters === "object" ? (body.filters as Record<string, unknown>) : undefined;
  const sort = isSearchSortBody(body.sort) ? body.sort : undefined;

  return {
    pagination: { ...pagination },
    ...(query !== undefined ? { query } : {}),
    ...(filters ? { filters } : {}),
    ...(sort ? { sort } : {}),
  };
};

export const createEmptySearchSummarySlice = (): SearchSummarySlice => ({
  hits: [],
  page: {
    currentPage: SEARCH_SUMMARY_PAGE,
    size: SEARCH_SUMMARY_PAGE_SIZE,
    totalElements: 0,
    totalPages: 0,
  },
  aggregations: {
    accessRights: [],
    openData: [],
    orgPath: [],
    provenance: [],
    spatial: [],
    format: [],
    losTheme: [],
    dataTheme: [],
  },
});

const isSummaryPage = (value: unknown): value is NonNullable<SearchSummarySlice["page"]> => {
  if (!value || typeof value !== "object") return false;
  const page = value as NonNullable<SearchSummarySlice["page"]>;
  return (
    typeof page.currentPage === "number" &&
    typeof page.size === "number" &&
    typeof page.totalElements === "number" &&
    typeof page.totalPages === "number"
  );
};

export const normalizeSearchSummarySlice = function (value: unknown): SearchSummarySlice {
  if (!value || typeof value !== "object") return createEmptySearchSummarySlice();

  const candidate = value as SearchSummarySlice;
  const empty = createEmptySearchSummarySlice();

  return {
    hits: Array.isArray(candidate.hits) ? candidate.hits : empty.hits,
    page: isSummaryPage(candidate.page) ? candidate.page : empty.page,
    aggregations: {
      ...(candidate.aggregations ?? {}),
      accessRights: Array.isArray(candidate.aggregations?.accessRights) ? candidate.aggregations.accessRights : [],
      openData: Array.isArray(candidate.aggregations?.openData) ? candidate.aggregations.openData : [],
      orgPath: Array.isArray(candidate.aggregations?.orgPath) ? candidate.aggregations.orgPath : [],
      provenance: Array.isArray(candidate.aggregations?.provenance) ? candidate.aggregations.provenance : [],
      spatial: Array.isArray(candidate.aggregations?.spatial) ? candidate.aggregations.spatial : [],
      format: Array.isArray(candidate.aggregations?.format) ? candidate.aggregations.format : [],
      losTheme: Array.isArray(candidate.aggregations?.losTheme) ? candidate.aggregations.losTheme : [],
      dataTheme: Array.isArray(candidate.aggregations?.dataTheme) ? candidate.aggregations.dataTheme : [],
    },
  };
};

export const buildSearchSummaryResponse = (slices: SearchSummarySlice[]): SearchSummaryResponse => {
  const summary = SUMMARY_SLICES.reduce<SearchSummary>((acc, slice, index) => {
    acc[slice.summaryKey] = slices[index] ?? createEmptySearchSummarySlice();
    return acc;
  }, {} as SearchSummary);

  return { summary };
};

export const extractOrgPathAggregationForTab = function (
  summary: SearchSummary,
  entityTab: Exclude<SearchSetSegment, "docs">,
): AggregationKeyCount[] {
  return mergeOrgPathAggregations(
    SUMMARY_SLICES.filter((slice) => slice.tabKey === entityTab).map(
      (slice) => summary[slice.summaryKey]?.aggregations?.orgPath ?? [],
    ),
  );
};

const buildAggregationsByTab = function (
  summary: SearchSummary,
  extract: (summary: SearchSummary, entityTab: Exclude<SearchSetSegment, "docs">) => AggregationKeyCount[],
): Partial<Record<SearchSetSegment, AggregationKeyCount[]>> {
  const result: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> = {};

  for (const entityTab of ENTITY_TABS) {
    if (entityTab === "docs") continue;
    result[entityTab] = extract(summary, entityTab);
  }

  return result;
};

export const buildOrgPathAggregationsByTab = function (
  summary: SearchSummary,
): Partial<Record<SearchSetSegment, AggregationKeyCount[]>> {
  return buildAggregationsByTab(summary, extractOrgPathAggregationForTab);
};

export const extractAccessAggregationForTab = function (
  summary: SearchSummary,
  entityTab: Exclude<SearchSetSegment, "docs">,
): AggregationKeyCount[] {
  const tabSlices = SUMMARY_SLICES.filter((slice) => slice.tabKey === entityTab);

  return mergeAccessAggregations(
    tabSlices.map((slice) => summary[slice.summaryKey]?.aggregations?.accessRights ?? []),
    tabSlices.map((slice) => summary[slice.summaryKey]?.aggregations?.openData ?? []),
  );
};

export const buildAccessAggregationsByTab = function (
  summary: SearchSummary,
): Partial<Record<SearchSetSegment, AggregationKeyCount[]>> {
  return buildAggregationsByTab(summary, extractAccessAggregationForTab);
};

export const extractProvenanceAggregationForTab = function (
  summary: SearchSummary,
  entityTab: Exclude<SearchSetSegment, "docs">,
): AggregationKeyCount[] {
  return mergeProvenanceAggregations(
    SUMMARY_SLICES.filter((slice) => slice.tabKey === entityTab).map(
      (slice) => summary[slice.summaryKey]?.aggregations?.provenance ?? [],
    ),
  );
};

export const buildProvenanceAggregationsByTab = function (
  summary: SearchSummary,
): Partial<Record<SearchSetSegment, AggregationKeyCount[]>> {
  return buildAggregationsByTab(summary, extractProvenanceAggregationForTab);
};

export const extractSpatialAggregationForTab = function (
  summary: SearchSummary,
  entityTab: Exclude<SearchSetSegment, "docs">,
): AggregationKeyCount[] {
  return mergeSpatialAggregations(
    SUMMARY_SLICES.filter((slice) => slice.tabKey === entityTab).map(
      (slice) => summary[slice.summaryKey]?.aggregations?.spatial ?? [],
    ),
  );
};

export const buildSpatialAggregationsByTab = function (
  summary: SearchSummary,
): Partial<Record<SearchSetSegment, AggregationKeyCount[]>> {
  return buildAggregationsByTab(summary, extractSpatialAggregationForTab);
};

export const extractFormatAggregationForTab = function (
  summary: SearchSummary,
  entityTab: Exclude<SearchSetSegment, "docs">,
): AggregationKeyCount[] {
  return mergeFormatAggregations(
    SUMMARY_SLICES.filter((slice) => slice.tabKey === entityTab).map(
      (slice) => summary[slice.summaryKey]?.aggregations?.format ?? [],
    ),
  );
};

export const buildFormatAggregationsByTab = function (
  summary: SearchSummary,
): Partial<Record<SearchSetSegment, AggregationKeyCount[]>> {
  return buildAggregationsByTab(summary, extractFormatAggregationForTab);
};

export const extractLosThemeAggregationForTab = function (
  summary: SearchSummary,
  entityTab: Exclude<SearchSetSegment, "docs">,
): AggregationKeyCount[] {
  return mergeLosThemeAggregations(
    SUMMARY_SLICES.filter((slice) => slice.tabKey === entityTab).map(
      (slice) => summary[slice.summaryKey]?.aggregations?.losTheme ?? [],
    ),
  );
};

export const buildLosThemeAggregationsByTab = function (
  summary: SearchSummary,
): Partial<Record<SearchSetSegment, AggregationKeyCount[]>> {
  return buildAggregationsByTab(summary, extractLosThemeAggregationForTab);
};

export const extractDataThemeAggregationForTab = function (
  summary: SearchSummary,
  entityTab: Exclude<SearchSetSegment, "docs">,
): AggregationKeyCount[] {
  return mergeDataThemeAggregations(
    SUMMARY_SLICES.filter((slice) => slice.tabKey === entityTab).map(
      (slice) => summary[slice.summaryKey]?.aggregations?.dataTheme ?? [],
    ),
  );
};

export const buildDataThemeAggregationsByTab = function (
  summary: SearchSummary,
): Partial<Record<SearchSetSegment, AggregationKeyCount[]>> {
  return buildAggregationsByTab(summary, extractDataThemeAggregationForTab);
};

export const computeBadgeCountsFromSummary = function (summary: SearchSummary): Record<string, number> {
  const tabTotals = new Map<string, number>();

  for (const slice of SUMMARY_SLICES) {
    const total = summary[slice.summaryKey]?.page?.totalElements ?? 0;
    tabTotals.set(slice.tabKey, (tabTotals.get(slice.tabKey) ?? 0) + total);
  }

  return {
    [KI_TOGGLE_VALUE]: 0,
    docs: 0,
    ...Object.fromEntries(tabTotals),
  };
};
