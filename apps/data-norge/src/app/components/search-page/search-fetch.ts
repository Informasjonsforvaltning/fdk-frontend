import { type LocaleCodes } from "@fdk-frontend/localization";
import { type AggregationKeyCount } from "@fdk-frontend/ui";
import {
  isCatalogSet,
  readLlmSearchBody,
  readLlmSearchCache,
  writeLlmSearchCache,
  type LlmSearchCacheBody,
  type SearchSetId,
} from "@fdk-frontend/utils";
import { buildAccessSearchFilter } from "@fdk-frontend/ui/search-form/access";
import { buildOrgPathSearchFilter } from "@fdk-frontend/ui/search-form/org-path";
import { buildProvenanceSearchFilter } from "@fdk-frontend/ui/search-form/provenance";
import { buildDcatProfileSearchFilter } from "@fdk-frontend/ui/search-form/dcat-profile";
import { buildFormatSearchFilter } from "@fdk-frontend/ui/search-form/format";
import { buildLosThemeSearchFilter, buildDataThemeSearchFilter } from "@fdk-frontend/ui/search-form/theme";
import { buildSpatialSearchFilter } from "@fdk-frontend/ui/search-form/spatial";

import { type DocsSearchResult } from "./search-page-types";
import {
  type CatalogFetchOptions,
  type CatalogFetchResult,
  type FetchSummaryOptions,
  fetchDocsResults,
  fetchCatalogResults,
  fetchLlmResults,
  fetchSummary,
} from "./search-api";

export const isBrowseSearch = function (options: FetchSummaryOptions): boolean {
  const trimmedQuery = options.query.trim();
  const hasOrgFilter = buildOrgPathSearchFilter(options.orgPathParam) !== undefined;
  const hasAccessFilter = buildAccessSearchFilter(options.accessParam) !== undefined;
  const hasProvenanceFilter = buildProvenanceSearchFilter(options.provenanceParam) !== undefined;
  const hasDcatProfileFilter = buildDcatProfileSearchFilter(options.dcatProfileParam) !== undefined;
  const hasSpatialFilter = buildSpatialSearchFilter(options.spatialParam) !== undefined;
  const hasFormatFilter = buildFormatSearchFilter(options.formatParam) !== undefined;
  const hasLosThemeFilter = buildLosThemeSearchFilter(options.losThemeParam) !== undefined;
  const hasDataThemeFilter = buildDataThemeSearchFilter(options.dataThemeParam) !== undefined;
  return (
    trimmedQuery.length === 0 &&
    !hasOrgFilter &&
    !hasAccessFilter &&
    !hasProvenanceFilter &&
    !hasDcatProfileFilter &&
    !hasSpatialFilter &&
    !hasFormatFilter &&
    !hasLosThemeFilter &&
    !hasDataThemeFilter
  );
};

export type EntitySearchStateBase = {
  catalogResults?: CatalogFetchResult;
  setBadgeCounts: Record<string, number>;
  orgAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  accessAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  provenanceAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  dcatProfileAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  spatialAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  formatAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  losThemeAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
  dataThemeAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>>;
};

export type BrowseSearchState = EntitySearchStateBase & {
  mode: "browse";
};

export type EntitySearchState =
  | BrowseSearchState
  | (EntitySearchStateBase & {
      mode: "search";
      setBadgeCounts: Record<string, number> | undefined;
      orgAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
      accessAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
      provenanceAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
      dcatProfileAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
      spatialAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
      formatAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
      losThemeAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
      dataThemeAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
    });

export const loadLlmSearchState = async function (query: string): Promise<LlmSearchCacheBody | undefined> {
  const trimmed = query.trim();
  if (!trimmed) return undefined;

  const cached = readLlmSearchCache(trimmed);
  if (cached) return cached;

  const body = readLlmSearchBody(await fetchLlmResults(trimmed));
  if (!body) return undefined;
  writeLlmSearchCache(trimmed, body);
  return body;
};

export const loadDocsSearchState = async function (query: string, locale: LocaleCodes): Promise<DocsSearchResult[]> {
  return fetchDocsResults(query, locale);
};

export const loadEntitySearchState = async function (
  options: CatalogFetchOptions & { activeSet?: SearchSetId },
): Promise<EntitySearchState> {
  const browse = isBrowseSearch(options);
  const summaryPromise = fetchSummary(options);

  const catalogResultsPromise =
    options.activeSet && isCatalogSet(options.activeSet)
      ? fetchCatalogResults(options.activeSet, options)
      : Promise.resolve(undefined);

  const [summary, catalogResults] = await Promise.all([summaryPromise, catalogResultsPromise]);

  return {
    mode: browse ? "browse" : "search",
    ...summary,
    catalogResults,
  };
};
