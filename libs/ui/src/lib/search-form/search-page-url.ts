import { type SearchTabsValue } from "../search-tabs/search-tab-config";
import { accessKeysToQueryParam } from "./access";
import { orgPathKeysToQueryParam } from "./org-path";
import { provenanceKeysToQueryParam } from "./provenance";
import { formatKeysToQueryParam } from "./format";
import { losThemeKeysToQueryParam } from "./theme/los-theme";
import { dataThemeKeysToQueryParam } from "./theme/data-theme";
import { spatialKeysToQueryParam } from "./spatial";
import { sortOptionToQueryParam, type SearchSortOption } from "./sort";

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
  sort = "relevance",
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

    const queryString = params.toString();
    return queryString ? `${path}?${queryString}` : path;
  }

  return buildSearchPageUrl({
    locale: options.locale,
    tab: "ki",
    query: options.query,
  });
};
