export const SEARCH_DEFAULT_PAGE = 0;
export const SEARCH_DEFAULT_PAGE_SIZE = 20;
export const SEARCH_PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100] as const;

export type SearchPageInfo = {
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export const parseSearchPageParam = function (value: string | null): number {
  if (!value) return SEARCH_DEFAULT_PAGE;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return SEARCH_DEFAULT_PAGE;
  return parsed;
};

export const parseSearchPageSizeParam = function (value: string | null): number {
  if (!value) return SEARCH_DEFAULT_PAGE_SIZE;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return SEARCH_DEFAULT_PAGE_SIZE;
  return parsed;
};

export const toDisplayPage = function (apiPage: number): number {
  return apiPage + 1;
};

export const toApiPage = function (displayPage: number): number {
  return Math.max(displayPage - 1, 0);
};
