import {
  buildSearchSetPath,
  SEARCH_DEFAULT_PAGE,
  SEARCH_DEFAULT_PAGE_SIZE,
  SEARCH_SORT_OPTIONS,
  sortOptionToQueryParam,
  type SearchSetId,
  type SearchSortOption,
} from "@fdk-frontend/utils";

import { accessKeysToQueryParam } from "./access";
import { orgPathKeysToQueryParam } from "./org-path";
import { provenanceKeysToQueryParam } from "./provenance";
import { dcatProfileKeysToQueryParam } from "./dcat-profile";
import { formatKeysToQueryParam } from "./format";
import { losThemeKeysToQueryParam } from "./theme/los-theme";
import { dataThemeKeysToQueryParam } from "./theme/data-theme";
import { spatialKeysToQueryParam } from "./spatial";

export type { SearchSetId, SearchSortOption };

export type BuildSearchPageUrlOptions = {
  locale: string;
  setId: SearchSetId;
  query: string;
  orgPaths?: string[];
  access?: string[];
  provenance?: string[];
  dcatProfiles?: string[];
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
  setId,
  query,
  orgPaths = [],
  access = [],
  provenance = [],
  dcatProfiles = [],
  spatial = [],
  formats = [],
  losThemes = [],
  dataThemes = [],
  sort = SEARCH_SORT_OPTIONS.relevance,
  page = SEARCH_DEFAULT_PAGE,
  size = SEARCH_DEFAULT_PAGE_SIZE,
}: BuildSearchPageUrlOptions): string {
  const path = buildSearchSetPath(locale, setId);
  const params = new URLSearchParams();
  const trimmedQuery = query.trim();

  if (trimmedQuery) params.set("q", trimmedQuery);
  if (orgPaths.length > 0) params.set("orgPath", orgPathKeysToQueryParam(orgPaths));
  if (access.length > 0) params.set("access", accessKeysToQueryParam(access));
  if (provenance.length > 0) params.set("provenance", provenanceKeysToQueryParam(provenance));
  if (dcatProfiles.length > 0) params.set("dcatProfile", dcatProfileKeysToQueryParam(dcatProfiles));
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
