import { mergeOrgPathAggregations, type AggregationKeyCount } from "@fdk-frontend/ui";
import {
  ENTITY_TABS,
  KI_TOGGLE_VALUE,
  SUMMARY_SLICES,
  type SearchSetSegment,
  type SummarySliceKey,
} from "@fdk-frontend/ui/search-tabs/search-tab-config";
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
    orgPath: OrgPathAggregationEntry[];
    [key: string]: unknown;
  };
};

export type SearchSummary = Record<SummarySliceKey, SearchSummarySlice>;

export type SearchSummaryResponse = {
  summary: SearchSummary;
};

export const SEARCH_SUMMARY_PAGE_SIZE = 10;
export const SEARCH_SUMMARY_PAGE = 0;

export const createEmptySearchSummarySlice = (): SearchSummarySlice => ({
  hits: [],
  page: {
    currentPage: SEARCH_SUMMARY_PAGE,
    size: SEARCH_SUMMARY_PAGE_SIZE,
    totalElements: 0,
    totalPages: 0,
  },
  aggregations: {
    orgPath: [],
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
      orgPath: Array.isArray(candidate.aggregations?.orgPath) ? candidate.aggregations.orgPath : [],
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

export const buildOrgPathAggregationsByTab = function (
  summary: SearchSummary,
): Partial<Record<SearchSetSegment, AggregationKeyCount[]>> {
  const result: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> = {};

  for (const entityTab of ENTITY_TABS) {
    if (entityTab === "docs") continue;
    result[entityTab] = extractOrgPathAggregationForTab(summary, entityTab);
  }

  return result;
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

export const flattenSummaryHits = (summary: SearchSummary): SearchObject[] => {
  const hits: SearchObject[] = [];

  for (const slice of SUMMARY_SLICES) {
    const summarySlice = summary[slice.summaryKey];
    if (!summarySlice?.hits?.length) continue;

    for (const hit of summarySlice.hits) {
      hits.push({
        ...hit,
        searchType: (hit.searchType ?? slice.searchType) as SearchObject["searchType"],
      });
    }
  }

  return hits;
};
