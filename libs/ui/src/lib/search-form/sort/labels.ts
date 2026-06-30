import { type SearchSortOption, SEARCH_SORT_OPTIONS } from "./types";

export const SORT_OPTION_LABELS: Record<SearchSortOption, string> = {
  [SEARCH_SORT_OPTIONS.relevance]: "Relevans",
  [SEARCH_SORT_OPTIONS.firstHarvestedDesc]: "Sist publisert",
  [SEARCH_SORT_OPTIONS.firstHarvestedAsc]: "Først publisert",
};
