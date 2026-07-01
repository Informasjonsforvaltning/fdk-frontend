import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { type AggregationKeyCount } from "@fdk-frontend/ui";
import { type SearchSetSegment } from "@fdk-frontend/ui/search-tabs/search-tab-config";

import { type EntityTabFetchResult } from "./search-api";
import { type EntitySearchState, type LlmDocsSearchState } from "./search-fetch";
import { type DocsSearchResult } from "./search-page-types";

export type SearchPageData = {
  llmResults: LlmSearchResponse | undefined;
  entityTabResults: EntityTabFetchResult | undefined;
  docsResults: DocsSearchResult[] | undefined;
  tabBadgeCounts: Record<string, number> | undefined;
  orgAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
  accessAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
  provenanceAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
  spatialAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
  formatAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
  losThemeAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
  dataThemeAggregationsByTab: Partial<Record<SearchSetSegment, AggregationKeyCount[]>> | undefined;
};

export type SearchPageReducerState = {
  entityLoading: boolean;
  llmLoading: boolean;
  data: SearchPageData;
};

export const initialSearchPageData: SearchPageData = {
  llmResults: undefined,
  entityTabResults: undefined,
  docsResults: undefined,
  tabBadgeCounts: undefined,
  orgAggregationsByTab: undefined,
  accessAggregationsByTab: undefined,
  provenanceAggregationsByTab: undefined,
  spatialAggregationsByTab: undefined,
  formatAggregationsByTab: undefined,
  losThemeAggregationsByTab: undefined,
  dataThemeAggregationsByTab: undefined,
};

export const initialSearchPageState: SearchPageReducerState = {
  entityLoading: false,
  llmLoading: false,
  data: initialSearchPageData,
};

export type SearchPageAction =
  | { type: "entity_fetch_started" }
  | { type: "entity_fetch_succeeded"; payload: EntitySearchState }
  | { type: "entity_fetch_failed" }
  | { type: "llm_docs_fetch_started" }
  | { type: "llm_docs_fetch_succeeded"; payload: LlmDocsSearchState }
  | { type: "llm_docs_fetch_failed" };

const applyEntitySearchState = function (data: SearchPageData, result: EntitySearchState): SearchPageData {
  if (result.mode === "browse") {
    return {
      ...data,
      llmResults: undefined,
      docsResults: undefined,
      entityTabResults: result.entityTabResults,
      tabBadgeCounts: result.tabBadgeCounts,
      orgAggregationsByTab: result.orgAggregationsByTab,
      accessAggregationsByTab: result.accessAggregationsByTab,
      provenanceAggregationsByTab: result.provenanceAggregationsByTab,
      spatialAggregationsByTab: result.spatialAggregationsByTab,
      formatAggregationsByTab: result.formatAggregationsByTab,
      losThemeAggregationsByTab: result.losThemeAggregationsByTab,
      dataThemeAggregationsByTab: result.dataThemeAggregationsByTab,
    };
  }

  return {
    ...data,
    entityTabResults: result.entityTabResults,
    tabBadgeCounts: result.tabBadgeCounts,
    orgAggregationsByTab: result.orgAggregationsByTab,
    accessAggregationsByTab: result.accessAggregationsByTab,
    provenanceAggregationsByTab: result.provenanceAggregationsByTab,
    spatialAggregationsByTab: result.spatialAggregationsByTab,
    formatAggregationsByTab: result.formatAggregationsByTab,
    losThemeAggregationsByTab: result.losThemeAggregationsByTab,
    dataThemeAggregationsByTab: result.dataThemeAggregationsByTab,
  };
};

export const searchPageReducer = function (
  state: SearchPageReducerState,
  action: SearchPageAction,
): SearchPageReducerState {
  switch (action.type) {
    case "entity_fetch_started":
      return { ...state, entityLoading: true };
    case "entity_fetch_succeeded":
      return {
        ...state,
        entityLoading: false,
        data: applyEntitySearchState(state.data, action.payload),
      };
    case "entity_fetch_failed":
      return {
        ...state,
        entityLoading: false,
        data: {
          ...state.data,
          entityTabResults: undefined,
          tabBadgeCounts: undefined,
          orgAggregationsByTab: undefined,
          accessAggregationsByTab: undefined,
          provenanceAggregationsByTab: undefined,
          spatialAggregationsByTab: undefined,
          formatAggregationsByTab: undefined,
          losThemeAggregationsByTab: undefined,
          dataThemeAggregationsByTab: undefined,
        },
      };
    case "llm_docs_fetch_started":
      return { ...state, llmLoading: true };
    case "llm_docs_fetch_succeeded":
      return {
        ...state,
        llmLoading: false,
        data: {
          ...state.data,
          llmResults: action.payload.llmResults,
          docsResults: action.payload.docsResults,
        },
      };
    case "llm_docs_fetch_failed":
      return {
        ...state,
        llmLoading: false,
        data: {
          ...state.data,
          llmResults: undefined,
          docsResults: undefined,
        },
      };
    default:
      return state;
  }
};
