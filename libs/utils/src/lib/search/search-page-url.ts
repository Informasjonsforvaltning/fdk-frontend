import { parseLocaleFromPathname } from "@fdk-frontend/localization";

import { buildSearchSetPath, deriveSearchSetIdFromPathname, type SearchSetId } from "./search-sets";
import {
  parseSearchPageParam,
  parseSearchPageSizeParam,
  SEARCH_DEFAULT_PAGE,
  SEARCH_DEFAULT_PAGE_SIZE,
} from "./search-pagination";
import { parseSortQueryParam, sortOptionToQueryParam, type SearchSortOption } from "./sort";

export type SearchPageUrlOverrides = {
  setId?: SearchSetId;
  page?: number;
  size?: number;
  sort?: SearchSortOption;
};

const applyPageParam = (params: URLSearchParams, page: number) => {
  if (page === SEARCH_DEFAULT_PAGE) params.delete("page");
  else params.set("page", String(page));
};

const applySizeParam = (params: URLSearchParams, size: number) => {
  if (size === SEARCH_DEFAULT_PAGE_SIZE) params.delete("size");
  else params.set("size", String(size));
};

const applySortParam = (params: URLSearchParams, sort: SearchSortOption) => {
  const sortParam = sortOptionToQueryParam(sort);
  if (sortParam) params.set("sort", sortParam);
  else params.delete("sort");
};

/** Keeps the current query string and replaces the set, page, size, or sort. */
export const buildSearchPageUrlFromSearchParams = function (
  pathname: string,
  searchParams: URLSearchParams,
  overrides: SearchPageUrlOverrides = {},
): string {
  const locale = parseLocaleFromPathname(pathname);
  const setId = overrides.setId ?? deriveSearchSetIdFromPathname(pathname);
  const params = new URLSearchParams(searchParams.toString());

  applyPageParam(params, overrides.page ?? parseSearchPageParam(searchParams.get("page")));
  applySizeParam(params, overrides.size ?? parseSearchPageSizeParam(searchParams.get("size")));
  applySortParam(params, overrides.sort ?? parseSortQueryParam(searchParams.get("sort")));

  const path = buildSearchSetPath(locale, setId);
  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
};

export const buildSearchPageQueryUrl = function (options: {
  pathname: string;
  locale: string;
  searchParams: URLSearchParams;
  query: string;
}): string {
  const path = options.pathname.split("?")[0];
  const segments = path.split("/").filter(Boolean);
  const isOnSearchPage = segments.length >= 2 && segments[0] === options.locale && segments[1] === "search";

  if (isOnSearchPage) {
    const params = new URLSearchParams(options.searchParams.toString());
    const trimmedQuery = options.query.trim();

    if (trimmedQuery) params.set("q", trimmedQuery);
    else params.delete("q");

    params.delete("page");

    const queryString = params.toString();
    return queryString ? `${path}?${queryString}` : path;
  }

  const params = new URLSearchParams();
  const trimmedQuery = options.query.trim();
  if (trimmedQuery) params.set("q", trimmedQuery);
  const queryString = params.toString();
  const allCatalogsPath = buildSearchSetPath(options.locale, "all-catalogs");
  return queryString ? `${allCatalogsPath}?${queryString}` : allCatalogsPath;
};
