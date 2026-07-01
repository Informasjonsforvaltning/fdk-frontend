import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { type SearchPageInfo } from "@fdk-frontend/ui";
import { type SearchObject } from "@fellesdatakatalog/types";

import { ENTITY_TABS, KI_TOGGLE_VALUE, type SearchSetSegment } from "@fdk-frontend/ui/search-tabs/search-tab-config";
import { type DocsSearchResult } from "./search-page-types";

export const sumEntityBadgeCounts = function (counts: Record<string, number>): number {
  return Object.entries(counts).reduce((sum, [key, value]) => {
    if (key === KI_TOGGLE_VALUE || key === "docs") return sum;
    return sum + value;
  }, 0);
};

export const getDisplayCount = function (params: {
  activeEntityTab?: SearchSetSegment;
  llmHitsCount: number;
  filteredHits: SearchObject[];
  tabBadgeCounts?: Record<string, number>;
  entityTabPage?: SearchPageInfo;
}): number {
  if (params.activeEntityTab === undefined) {
    return params.llmHitsCount;
  }

  if (params.activeEntityTab !== "docs") {
    if (params.entityTabPage) return params.entityTabPage.totalElements;
    return params.tabBadgeCounts?.[params.activeEntityTab] ?? params.filteredHits.length;
  }

  return params.filteredHits.length;
};

export const getTotalResults = function (params: {
  tabBadgeCounts?: Record<string, number>;
  searchHitsCount: number;
}): number {
  return params.tabBadgeCounts ? sumEntityBadgeCounts(params.tabBadgeCounts) : params.searchHitsCount;
};

export const resolveSearchTabBadgeCounts = function (params: {
  badgeCounts: Record<string, number>;
  tabBadgeCounts?: Record<string, number>;
  entityLoading: boolean;
  llmLoading: boolean;
}): Record<string, number | undefined> {
  const entityCountsPending = params.entityLoading && params.tabBadgeCounts === undefined;
  const llmCountsPending = params.llmLoading;

  return Object.fromEntries(
    Object.entries(params.badgeCounts).map(([tab, count]) => {
      if (tab === KI_TOGGLE_VALUE || tab === "docs") {
        return [tab, llmCountsPending ? undefined : count];
      }

      return [tab, entityCountsPending ? undefined : count];
    }),
  );
};

export type SearchPageDisplayState = {
  llmHitsCount: number;
  docsHitsCount: number;
  badgeCounts: Record<string, number>;
  totalResults: number;
};

export const computeSearchPageDisplay = function (params: {
  activeEntityTab?: SearchSetSegment;
  llmResults?: LlmSearchResponse;
  docsResults?: DocsSearchResult[];
  tabBadgeCounts?: Record<string, number>;
}): SearchPageDisplayState {
  const llmHitsCount = params.llmResults?.hits?.length ?? 0;
  const docsHitsCount = params.docsResults?.length ?? 0;
  const baseBadgeCounts = params.tabBadgeCounts ?? Object.fromEntries(ENTITY_TABS.map((tab) => [tab, 0]));
  const badgeCounts = {
    ...baseBadgeCounts,
    [KI_TOGGLE_VALUE]: llmHitsCount,
    docs: docsHitsCount,
  };

  return {
    llmHitsCount,
    docsHitsCount,
    badgeCounts,
    totalResults: getTotalResults({
      tabBadgeCounts: params.tabBadgeCounts,
      searchHitsCount: 0,
    }),
  };
};
