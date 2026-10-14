import { SEARCH_SETS, type LlmSearchCacheBody } from "@fdk-frontend/utils";

import { type DocsSearchResult } from "./search-page-types";

export const resolveSearchSetBadgeCounts = function (params: {
  badgeCounts: Record<string, number>;
  setBadgeCounts?: Record<string, number>;
  entityLoading: boolean;
  docsLoading: boolean;
  llmLoading: boolean;
}): Record<string, number | undefined> {
  const entityCountsPending = params.entityLoading && params.setBadgeCounts === undefined;
  const llmCountsPending = params.llmLoading;

  return Object.fromEntries(
    Object.entries(params.badgeCounts).map(([setId, count]) => {
      if (setId === "ai") {
        return [setId, llmCountsPending ? undefined : count];
      }

      if (setId === "docs") {
        return [setId, params.docsLoading ? undefined : count];
      }

      return [setId, entityCountsPending ? undefined : count];
    }),
  );
};

export type SearchPageDisplayState = {
  llmHitsCount: number;
  docsHitsCount: number;
  badgeCounts: Record<string, number>;
};

export const computeSearchPageDisplay = function (params: {
  llmResults?: LlmSearchCacheBody;
  docsResults?: DocsSearchResult[];
  setBadgeCounts?: Record<string, number>;
}): SearchPageDisplayState {
  const llmHitsCount = params.llmResults?.hits?.length ?? 0;
  const docsHitsCount = params.docsResults?.length ?? 0;
  const baseBadgeCounts = params.setBadgeCounts ?? Object.fromEntries(SEARCH_SETS.map((set) => [set.id, 0]));
  const badgeCounts = {
    ...baseBadgeCounts,
    ai: llmHitsCount,
    docs: docsHitsCount,
  };

  return {
    llmHitsCount,
    docsHitsCount,
    badgeCounts,
  };
};
