import { deriveSearchTabValueFromPathname } from "../search-tabs/search-tab-route";
import { type SearchTabsValue } from "../search-tabs/search-tab-config";
import { parseLocaleFromPathname } from "@fdk-frontend/localization";
import { accessKeysToQueryParam, parseAccessQueryParam } from "./access";
import { orgPathKeysToQueryParam, parseOrgPathQueryParam } from "./org-path";
import { provenanceKeysToQueryParam, parseProvenanceQueryParam } from "./provenance";
import { formatKeysToQueryParam, parseFormatQueryParam } from "./format";
import { losThemeKeysToQueryParam, parseLosThemeQueryParam } from "./theme/los-theme";
import { dataThemeKeysToQueryParam, parseDataThemeQueryParam } from "./theme/data-theme";
import { spatialKeysToQueryParam, parseSpatialQueryParam } from "./spatial";
import { parseSortQueryParam, sortOptionToQueryParam, SEARCH_SORT_OPTIONS, type SearchSortOption } from "./sort";
import {
  parseSearchPageParam,
  parseSearchPageSizeParam,
  SEARCH_DEFAULT_PAGE,
  SEARCH_DEFAULT_PAGE_SIZE,
} from "./search-pagination";

export type BuildSearchPageUrlOptions = {
  locale: string;
  tab: SearchTabsValue;
  query: string;
  orgPaths?: string[];
  access?: string[];
  provenance?: string[];
  spatial?: string[];
  formats?: string[];
  losThemes?: string[];
  dataThemes?: string[];
  sort?: SearchSortOption;
  page?: number;
  size?: number;
};

export const buildSearchPageUrl = function ({
  locale,
  tab,
  query,
  orgPaths = [],
  access = [],
  provenance = [],
  spatial = [],
  formats = [],
  losThemes = [],
  dataThemes = [],
  sort = SEARCH_SORT_OPTIONS.relevance,
  page = SEARCH_DEFAULT_PAGE,
  size = SEARCH_DEFAULT_PAGE_SIZE,
}: BuildSearchPageUrlOptions): string {
  const base = `/${locale}/search`;
  const path = tab === "ki" ? base : `${base}/${tab}`;
  const params = new URLSearchParams();
  const trimmedQuery = query.trim();

  if (trimmedQuery) params.set("q", trimmedQuery);
  if (orgPaths.length > 0) params.set("orgPath", orgPathKeysToQueryParam(orgPaths));
  if (access.length > 0) params.set("access", accessKeysToQueryParam(access));
  if (provenance.length > 0) params.set("provenance", provenanceKeysToQueryParam(provenance));
  if (spatial.length > 0) params.set("spatial", spatialKeysToQueryParam(spatial));
  if (formats.length > 0) params.set("format", formatKeysToQueryParam(formats));
  if (losThemes.length > 0) params.set("losTheme", losThemeKeysToQueryParam(losThemes));
  if (dataThemes.length > 0) params.set("dataTheme", dataThemeKeysToQueryParam(dataThemes));
  const sortParam = sortOptionToQueryParam(sort);
  if (sortParam) params.set("sort", sortParam);
  if (page !== SEARCH_DEFAULT_PAGE) params.set("page", String(page));
  if (size !== SEARCH_DEFAULT_PAGE_SIZE) params.set("size", String(size));

  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
};

export const buildSearchPageUrlFromSearchParams = function (
  pathname: string,
  searchParams: URLSearchParams,
  overrides: { page?: number; size?: number; tab?: SearchTabsValue } = {},
): string {
  return buildSearchPageUrl({
    locale: parseLocaleFromPathname(pathname),
    tab: overrides.tab ?? deriveSearchTabValueFromPathname(pathname),
    query: searchParams.get("q") ?? "",
    orgPaths: parseOrgPathQueryParam(searchParams.get("orgPath")),
    access: parseAccessQueryParam(searchParams.get("access")),
    provenance: parseProvenanceQueryParam(searchParams.get("provenance")),
    spatial: parseSpatialQueryParam(searchParams.get("spatial")),
    formats: parseFormatQueryParam(searchParams.get("format")),
    losThemes: parseLosThemeQueryParam(searchParams.get("losTheme")),
    dataThemes: parseDataThemeQueryParam(searchParams.get("dataTheme")),
    sort: parseSortQueryParam(searchParams.get("sort")),
    page: overrides.page ?? parseSearchPageParam(searchParams.get("page")),
    size: overrides.size ?? parseSearchPageSizeParam(searchParams.get("size")),
  });
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

    // Reset pagination to the first page on a new query.
    params.delete("page");

    const queryString = params.toString();
    return queryString ? `${path}?${queryString}` : path;
  }

  return buildSearchPageUrl({
    locale: options.locale,
    tab: "ki",
    query: options.query,
  });
};
