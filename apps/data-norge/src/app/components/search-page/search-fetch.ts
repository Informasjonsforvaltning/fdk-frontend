import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { type AggregationKeyCount } from "@fdk-frontend/ui";
import { type SearchSetSegment } from "@fdk-frontend/ui/search-tabs/search-tab-config";
import { buildAccessSearchFilter } from "@fdk-frontend/ui/search-form/access";
import { buildOrgPathSearchFilter } from "@fdk-frontend/ui/search-form/org-path";
import { buildProvenanceSearchFilter } from "@fdk-frontend/ui/search-form/provenance";
import { buildFormatSearchFilter } from "@fdk-frontend/ui/search-form/format";
import { buildLosThemeSearchFilter, buildDataThemeSearchFilter } from "@fdk-frontend/ui/search-form/theme";
import { buildSpatialSearchFilter } from "@fdk-frontend/ui/search-form/spatial";

import { fetchDocsResults, fetchLlmResults, fetchSummary } from "./search-api";
import { type DocsSearchResult, type SearchResultsProp } from "./search-page-types";

const ENTITIES_PAGE_SIZE = 20;

export const isBrowseSearch = function (
  query: string,
  orgPathParam: string | null,
  accessParam: string | null,
  provenanceParam: string | null,
  spatialParam: string | null,
  formatParam: string | null,
  losThemeParam: string | null,
  dataThemeParam: string | null,
): boolean {
  const trimmedQuery = query.trim();
  const hasOrgFilter = buildOrgPathSearchFilter(orgPathParam) !== undefined;
  const hasAccessFilter = buildAccessSearchFilter(accessParam) !== undefined;
  const hasProvenanceFilter = buildProvenanceSearchFilter(provenanceParam) !== undefined;
  const hasSpatialFilter = buildSpatialSearchFilter(spatialParam) !== undefined;
  const hasFormatFilter = buildFormatSearchFilter(formatParam) !== undefined;
  const hasLosThemeFilter = buildLosThemeSearchFilter(losThemeParam) !== undefined;
  const hasDataThemeFilter = buildDataThemeSearchFilter(dataThemeParam) !== undefined;
  return (
    trimmedQuery.length === 0 &&
    !hasOrgFilter &&
    !hasAccessFilter &&
    !hasProvenanceFilter &&
    !hasSpatialFilter &&
    !hasFormatFilter &&
    !hasLosThemeFilter &&
    !hasDataThemeFilter
  );
};

export type BrowseSearchState = {
  mode: "browse";
  searchResults: SearchResultsProp;
  tabBadgeCounts: Record<string, number>;
  orgAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  accessAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  provenanceAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  spatialAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  formatAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  losThemeAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  dataThemeAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
};

export type EntitySearchState =
  | BrowseSearchState
  | {
      mode: "search";
      searchResults: SearchResultsProp | undefined;
      tabBadgeCounts: Record<string, number> | undefined;
      orgAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
      accessAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
      provenanceAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
      spatialAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
      formatAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
      losThemeAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
      dataThemeAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
    };

export type LlmDocsSearchState = {
  llmResults: LlmSearchResponse | undefined;
  docsResults: DocsSearchResult[];
};

export const loadEntitySearchState = async function (options: {
  query: string;
  orgPathParam: string | null;
  accessParam: string | null;
  provenanceParam: string | null;
  spatialParam: string | null;
  formatParam: string | null;
  losThemeParam: string | null;
  dataThemeParam: string | null;
}): Promise<EntitySearchState> {
  const browse = isBrowseSearch(
    options.query,
    options.orgPathParam,
    options.accessParam,
    options.provenanceParam,
    options.spatialParam,
    options.formatParam,
    options.losThemeParam,
    options.dataThemeParam,
  );
  const summary = browse
    ? await fetchSummary("", null, null, null, null, null, null, null)
    : await fetchSummary(
        options.query,
        options.orgPathParam,
        options.accessParam,
        options.provenanceParam,
        options.spatialParam,
        options.formatParam,
        options.losThemeParam,
        options.dataThemeParam,
        ENTITIES_PAGE_SIZE,
      );

  return {
    mode: browse ? "browse" : "search",
    ...summary,
  };
};

export const loadLlmDocsSearchState = async function (query: string, locale: LocaleCodes): Promise<LlmDocsSearchState> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return { llmResults: undefined, docsResults: [] };
  }

  const [llmResults, docsResults] = await Promise.all([fetchLlmResults(query), fetchDocsResults(query, locale)]);

  return { llmResults, docsResults };
};
