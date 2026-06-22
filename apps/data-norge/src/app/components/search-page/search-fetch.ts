import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { type AggregationKeyCount } from "@fdk-frontend/ui";
import { type SearchSetSegment } from "@fdk-frontend/ui/search-tabs/search-tab-config";
import { buildAccessSearchFilter } from "@fdk-frontend/ui/search-form/access";
import { buildOrgPathSearchFilter } from "@fdk-frontend/ui/search-form/org-path";

import { fetchDocsResults, fetchLlmResults, fetchSummary } from "./search-api";
import { type DocsSearchResult, type SearchResultsProp } from "./search-page-types";

const ENTITIES_PAGE_SIZE = 20;

export const isBrowseSearch = function (
  query: string,
  orgPathParam: string | null,
  accessParam: string | null,
): boolean {
  const trimmedQuery = query.trim();
  const hasOrgFilter = buildOrgPathSearchFilter(orgPathParam) !== undefined;
  const hasAccessFilter = buildAccessSearchFilter(accessParam) !== undefined;
  return trimmedQuery.length === 0 && !hasOrgFilter && !hasAccessFilter;
};

export type BrowseSearchState = {
  mode: "browse";
  searchResults: SearchResultsProp;
  tabBadgeCounts: Record<string, number>;
  orgAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
  accessAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>>;
};

export type EntitySearchState =
  | BrowseSearchState
  | {
      mode: "search";
      searchResults: SearchResultsProp | undefined;
      tabBadgeCounts: Record<string, number> | undefined;
      orgAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
      accessAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
    };

export type LlmDocsSearchState = {
  llmResults: LlmSearchResponse | undefined;
  docsResults: DocsSearchResult[];
};

export const loadEntitySearchState = async function (options: {
  query: string;
  orgPathParam: string | null;
  accessParam: string | null;
}): Promise<EntitySearchState> {
  const browse = isBrowseSearch(options.query, options.orgPathParam, options.accessParam);
  const summary = browse
    ? await fetchSummary("", null, null)
    : await fetchSummary(options.query, options.orgPathParam, options.accessParam, ENTITIES_PAGE_SIZE);

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
