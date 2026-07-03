import { type SearchSortOption } from "./types";

export type SortDictionary = {
  relevance: string;
  newest: string;
  oldest: string;
};

export const getSortLabel = (option: SearchSortOption, dict: SortDictionary): string => {
  if (option === "relevance") return dict.relevance;
  if (option === "firstHarvestedDesc") return dict.newest;
  if (option === "firstHarvestedAsc") return dict.oldest;
  return option;
};
