import {
  isFirstHarvestedAscSort,
  isRelevanceSort,
  SEARCH_SORT_OPTIONS,
  type SearchSort,
  type SearchSortBody,
  type SearchSortOption,
} from "./types";

export const isSearchSortBody = (value: unknown): value is SearchSortBody => {
  if (!value || typeof value !== "object") return false;

  const sort = value as Record<string, unknown>;
  return typeof sort.field === "string" && (sort.direction === "ASC" || sort.direction === "DESC");
};

export const parseSortQueryParam = (value: string | null): SearchSortOption => {
  if (value === SEARCH_SORT_OPTIONS.firstHarvestedAsc) return SEARCH_SORT_OPTIONS.firstHarvestedAsc;
  if (value === SEARCH_SORT_OPTIONS.firstHarvestedDesc) return SEARCH_SORT_OPTIONS.firstHarvestedDesc;
  return SEARCH_SORT_OPTIONS.relevance;
};

export const sortOptionToQueryParam = (option: SearchSortOption): string | undefined => {
  if (isRelevanceSort(option)) return undefined;
  return option;
};

export const buildSearchSort = (sortParam: string | null): SearchSort | undefined => {
  const option = parseSortQueryParam(sortParam);
  if (isRelevanceSort(option)) return undefined;

  return {
    field: "FIRST_HARVESTED",
    direction: isFirstHarvestedAscSort(option) ? "ASC" : "DESC",
  };
};
