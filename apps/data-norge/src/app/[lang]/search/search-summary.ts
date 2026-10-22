import {
  mergeAccessAggregations,
  mergeOrgPathAggregations,
  mergeProvenanceAggregations,
  mergeDcatProfileAggregations,
  mergeSpatialAggregations,
  mergeFormatAggregations,
  mergeLosThemeAggregations,
  mergeDataThemeAggregations,
  type AggregationKeyCount,
} from "@fdk-frontend/ui";
import {
  isCatalogSet,
  isSearchSortBody,
  SEARCH_SETS,
  SEARCH_SUMMARY_SLICES,
  type SearchSetId,
  type SearchSortBody,
  type SearchSummaryKey,
  type SearchSummarySliceConfig,
} from "@fdk-frontend/utils";
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
    dcatProfiles: OrgPathAggregationEntry[];
    spatial: OrgPathAggregationEntry[];
    format: OrgPathAggregationEntry[];
    losTheme: OrgPathAggregationEntry[];
    dataTheme: OrgPathAggregationEntry[];
    [key: string]: unknown;
  };
};

export type SearchSummary = Record<SearchSummaryKey, SearchSummarySlice>;

export type SearchSummaryResponse = {
  summary: SearchSummary;
};

export const SEARCH_SUMMARY_PAGE_SIZE = 10;
export const SEARCH_SUMMARY_PAGE = 0;

/** Search-service profile filter; scopes catalog results to the transportportal tag. */
export const TRANSPORT_SEARCH_PROFILE = "TRANSPORT" as const;

export type SearchApiOptions = {
  pagination: { size?: number; page?: number };
  query?: string;
  filters?: Record<string, unknown>;
  sort?: SearchSortBody;
  profile?: typeof TRANSPORT_SEARCH_PROFILE;
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
    dcatProfiles: [],
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
      dcatProfiles: Array.isArray(candidate.aggregations?.dcatProfiles) ? candidate.aggregations.dcatProfiles : [],
      spatial: Array.isArray(candidate.aggregations?.spatial) ? candidate.aggregations.spatial : [],
      format: Array.isArray(candidate.aggregations?.format) ? candidate.aggregations.format : [],
      losTheme: Array.isArray(candidate.aggregations?.losTheme) ? candidate.aggregations.losTheme : [],
      dataTheme: Array.isArray(candidate.aggregations?.dataTheme) ? candidate.aggregations.dataTheme : [],
    },
  };
};

export const buildSearchSummaryResponse = (slices: SearchSummarySlice[]): SearchSummaryResponse => {
  const summary = SEARCH_SUMMARY_SLICES.reduce<SearchSummary>((acc, slice, index) => {
    acc[slice.summaryKey] = slices[index] ?? createEmptySearchSummarySlice();
    return acc;
  }, {} as SearchSummary);

  return { summary };
};

const slicesForSet = function (setId: SearchSetId): readonly SearchSummarySliceConfig[] {
  if (setId === "all-catalogs") return SEARCH_SUMMARY_SLICES;
  return SEARCH_SUMMARY_SLICES.filter((slice) => slice.setId === setId);
};

export const extractOrgPathAggregationForSet = function (
  summary: SearchSummary,
  setId: SearchSetId,
): AggregationKeyCount[] {
  return mergeOrgPathAggregations(
    slicesForSet(setId).map((slice) => summary[slice.summaryKey]?.aggregations?.orgPath ?? []),
  );
};

const buildAggregationsBySet = function (
  summary: SearchSummary,
  extract: (summary: SearchSummary, setId: SearchSetId) => AggregationKeyCount[],
): Partial<Record<SearchSetId, AggregationKeyCount[]>> {
  const result: Partial<Record<SearchSetId, AggregationKeyCount[]>> = {};

  for (const set of SEARCH_SETS) {
    if (!isCatalogSet(set.id)) continue;
    result[set.id] = extract(summary, set.id);
  }

  return result;
};

export const buildOrgPathAggregationsBySet = function (
  summary: SearchSummary,
): Partial<Record<SearchSetId, AggregationKeyCount[]>> {
  return buildAggregationsBySet(summary, extractOrgPathAggregationForSet);
};

export const extractAccessAggregationForSet = function (
  summary: SearchSummary,
  setId: SearchSetId,
): AggregationKeyCount[] {
  const setSlices = slicesForSet(setId);

  return mergeAccessAggregations(
    setSlices.map((slice) => summary[slice.summaryKey]?.aggregations?.accessRights ?? []),
    setSlices.map((slice) => summary[slice.summaryKey]?.aggregations?.openData ?? []),
  );
};

export const buildAccessAggregationsBySet = function (
  summary: SearchSummary,
): Partial<Record<SearchSetId, AggregationKeyCount[]>> {
  return buildAggregationsBySet(summary, extractAccessAggregationForSet);
};

export const extractProvenanceAggregationForSet = function (
  summary: SearchSummary,
  setId: SearchSetId,
): AggregationKeyCount[] {
  return mergeProvenanceAggregations(
    slicesForSet(setId).map((slice) => summary[slice.summaryKey]?.aggregations?.provenance ?? []),
  );
};

export const buildProvenanceAggregationsBySet = function (
  summary: SearchSummary,
): Partial<Record<SearchSetId, AggregationKeyCount[]>> {
  return buildAggregationsBySet(summary, extractProvenanceAggregationForSet);
};

export const extractDcatProfileAggregationForSet = function (
  summary: SearchSummary,
  setId: SearchSetId,
): AggregationKeyCount[] {
  return mergeDcatProfileAggregations(
    slicesForSet(setId).map((slice) => summary[slice.summaryKey]?.aggregations?.dcatProfiles ?? []),
  );
};

export const buildDcatProfileAggregationsBySet = function (
  summary: SearchSummary,
): Partial<Record<SearchSetId, AggregationKeyCount[]>> {
  return buildAggregationsBySet(summary, extractDcatProfileAggregationForSet);
};

export const extractSpatialAggregationForSet = function (
  summary: SearchSummary,
  setId: SearchSetId,
): AggregationKeyCount[] {
  return mergeSpatialAggregations(
    slicesForSet(setId).map((slice) => summary[slice.summaryKey]?.aggregations?.spatial ?? []),
  );
};

export const buildSpatialAggregationsBySet = function (
  summary: SearchSummary,
): Partial<Record<SearchSetId, AggregationKeyCount[]>> {
  return buildAggregationsBySet(summary, extractSpatialAggregationForSet);
};

export const extractFormatAggregationForSet = function (
  summary: SearchSummary,
  setId: SearchSetId,
): AggregationKeyCount[] {
  return mergeFormatAggregations(
    slicesForSet(setId).map((slice) => summary[slice.summaryKey]?.aggregations?.format ?? []),
  );
};

export const buildFormatAggregationsBySet = function (
  summary: SearchSummary,
): Partial<Record<SearchSetId, AggregationKeyCount[]>> {
  return buildAggregationsBySet(summary, extractFormatAggregationForSet);
};

export const extractLosThemeAggregationForSet = function (
  summary: SearchSummary,
  setId: SearchSetId,
): AggregationKeyCount[] {
  return mergeLosThemeAggregations(
    slicesForSet(setId).map((slice) => summary[slice.summaryKey]?.aggregations?.losTheme ?? []),
  );
};

export const buildLosThemeAggregationsBySet = function (
  summary: SearchSummary,
): Partial<Record<SearchSetId, AggregationKeyCount[]>> {
  return buildAggregationsBySet(summary, extractLosThemeAggregationForSet);
};

export const extractDataThemeAggregationForSet = function (
  summary: SearchSummary,
  setId: SearchSetId,
): AggregationKeyCount[] {
  return mergeDataThemeAggregations(
    slicesForSet(setId).map((slice) => summary[slice.summaryKey]?.aggregations?.dataTheme ?? []),
  );
};

export const buildDataThemeAggregationsBySet = function (
  summary: SearchSummary,
): Partial<Record<SearchSetId, AggregationKeyCount[]>> {
  return buildAggregationsBySet(summary, extractDataThemeAggregationForSet);
};

export const computeBadgeCountsFromSummary = function (summary: SearchSummary): Record<string, number> {
  const setTotals = new Map<string, number>();

  for (const slice of SEARCH_SUMMARY_SLICES) {
    const total = summary[slice.summaryKey]?.page?.totalElements ?? 0;
    setTotals.set(slice.setId, (setTotals.get(slice.setId) ?? 0) + total);
  }

  const allTotal = [...setTotals.values()].reduce((sum, value) => sum + value, 0);

  return {
    ["ai"]: 0,
    ["all-catalogs"]: allTotal,
    docs: 0,
    ...Object.fromEntries(setTotals),
  };
};
