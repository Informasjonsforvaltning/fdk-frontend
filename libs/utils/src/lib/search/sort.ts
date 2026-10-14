export const SEARCH_SORT_OPTIONS = {
  relevance: "relevance",
  firstHarvestedDesc: "firstHarvestedDesc",
  firstHarvestedAsc: "firstHarvestedAsc",
} as const;

export const SEARCH_SORT_OPTION_LIST = [
  SEARCH_SORT_OPTIONS.relevance,
  SEARCH_SORT_OPTIONS.firstHarvestedDesc,
  SEARCH_SORT_OPTIONS.firstHarvestedAsc,
] as const;

export type SearchSortOption = (typeof SEARCH_SORT_OPTIONS)[keyof typeof SEARCH_SORT_OPTIONS];

export type SearchSort = {
  field: "FIRST_HARVESTED";
  direction: "ASC" | "DESC";
};

export type SearchSortBody = {
  field: string;
  direction: "ASC" | "DESC";
};

export type SortDictionary = {
  relevance: string;
  newest: string;
  oldest: string;
};

export const isRelevanceSort = (option: SearchSortOption): option is typeof SEARCH_SORT_OPTIONS.relevance =>
  option === SEARCH_SORT_OPTIONS.relevance;

export const isFirstHarvestedAscSort = (
  option: SearchSortOption,
): option is typeof SEARCH_SORT_OPTIONS.firstHarvestedAsc => option === SEARCH_SORT_OPTIONS.firstHarvestedAsc;

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

export const getSortLabel = (option: SearchSortOption, dict: SortDictionary): string => {
  if (option === "relevance") return dict.relevance;
  if (option === "firstHarvestedDesc") return dict.newest;
  if (option === "firstHarvestedAsc") return dict.oldest;
  return option;
};
