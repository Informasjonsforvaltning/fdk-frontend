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

export const isRelevanceSort = (option: SearchSortOption): option is typeof SEARCH_SORT_OPTIONS.relevance =>
  option === SEARCH_SORT_OPTIONS.relevance;

export const isFirstHarvestedAscSort = (
  option: SearchSortOption,
): option is typeof SEARCH_SORT_OPTIONS.firstHarvestedAsc => option === SEARCH_SORT_OPTIONS.firstHarvestedAsc;
