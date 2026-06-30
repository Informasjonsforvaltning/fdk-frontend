export type SearchSortOption = "relevance" | "firstHarvestedDesc" | "firstHarvestedAsc";

export type SearchSort = {
  field: "FIRST_HARVESTED";
  direction: "ASC" | "DESC";
};

export type SearchSortBody = {
  field: string;
  direction: "ASC" | "DESC";
};
