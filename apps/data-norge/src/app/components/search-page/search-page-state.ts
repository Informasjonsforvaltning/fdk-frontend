import { type AggregationKeyCount } from "@fdk-frontend/ui";
import { type LlmSearchCacheBody, type SearchSetId } from "@fdk-frontend/utils";

import { type CatalogFetchResult } from "./search-api";
import { type EntitySearchState } from "./search-fetch";
import { type DocsSearchResult } from "./search-page-types";

export type SearchPageData = {
  llmResults: LlmSearchCacheBody | undefined;
  catalogResults: CatalogFetchResult | undefined;
  docsResults: DocsSearchResult[] | undefined;
  setBadgeCounts: Record<string, number> | undefined;
  orgAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
  accessAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
  provenanceAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
  dcatProfileAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
  spatialAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
  formatAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
  losThemeAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
  dataThemeAggregationsBySet: Partial<Record<SearchSetId, AggregationKeyCount[]>> | undefined;
};

export type SearchPageReducerState = {
  entityLoading: boolean;
  docsLoading: boolean;
  llmLoading: boolean;
  data: SearchPageData;
};

export const initialSearchPageData: SearchPageData = {
  llmResults: undefined,
  catalogResults: undefined,
  docsResults: undefined,
  setBadgeCounts: undefined,
  orgAggregationsBySet: undefined,
  accessAggregationsBySet: undefined,
  provenanceAggregationsBySet: undefined,
  dcatProfileAggregationsBySet: undefined,
  spatialAggregationsBySet: undefined,
  formatAggregationsBySet: undefined,
  losThemeAggregationsBySet: undefined,
  dataThemeAggregationsBySet: undefined,
};

export const initialSearchPageState: SearchPageReducerState = {
  entityLoading: true,
  docsLoading: true,
  llmLoading: false,
  data: initialSearchPageData,
};

export type SearchPageAction =
  | { type: "entity_fetch_started" }
  | { type: "entity_fetch_succeeded"; payload: EntitySearchState }
  | { type: "entity_fetch_failed" }
  | { type: "docs_fetch_started" }
  | { type: "docs_fetch_succeeded"; payload: DocsSearchResult[] }
  | { type: "docs_fetch_failed" }
  | { type: "llm_fetch_started" }
  | { type: "llm_fetch_succeeded"; payload: LlmSearchCacheBody | undefined }
  | { type: "llm_fetch_failed" };

const applyEntitySearchState = function (data: SearchPageData, result: EntitySearchState): SearchPageData {
  if (result.mode === "browse") {
    return {
      ...data,
      llmResults: undefined,
      catalogResults: result.catalogResults,
      setBadgeCounts: result.setBadgeCounts,
      orgAggregationsBySet: result.orgAggregationsBySet,
      accessAggregationsBySet: result.accessAggregationsBySet,
      provenanceAggregationsBySet: result.provenanceAggregationsBySet,
      dcatProfileAggregationsBySet: result.dcatProfileAggregationsBySet,
      spatialAggregationsBySet: result.spatialAggregationsBySet,
      formatAggregationsBySet: result.formatAggregationsBySet,
      losThemeAggregationsBySet: result.losThemeAggregationsBySet,
      dataThemeAggregationsBySet: result.dataThemeAggregationsBySet,
    };
  }

  return {
    ...data,
    catalogResults: result.catalogResults,
    setBadgeCounts: result.setBadgeCounts,
    orgAggregationsBySet: result.orgAggregationsBySet,
    accessAggregationsBySet: result.accessAggregationsBySet,
    provenanceAggregationsBySet: result.provenanceAggregationsBySet,
    dcatProfileAggregationsBySet: result.dcatProfileAggregationsBySet,
    spatialAggregationsBySet: result.spatialAggregationsBySet,
    formatAggregationsBySet: result.formatAggregationsBySet,
    losThemeAggregationsBySet: result.losThemeAggregationsBySet,
    dataThemeAggregationsBySet: result.dataThemeAggregationsBySet,
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
          catalogResults: undefined,
          setBadgeCounts: undefined,
          orgAggregationsBySet: undefined,
          accessAggregationsBySet: undefined,
          provenanceAggregationsBySet: undefined,
          dcatProfileAggregationsBySet: undefined,
          spatialAggregationsBySet: undefined,
          formatAggregationsBySet: undefined,
          losThemeAggregationsBySet: undefined,
          dataThemeAggregationsBySet: undefined,
        },
      };
    case "docs_fetch_started":
      return {
        ...state,
        docsLoading: true,
        data: { ...state.data, docsResults: undefined },
      };
    case "docs_fetch_succeeded":
      return {
        ...state,
        docsLoading: false,
        data: { ...state.data, docsResults: action.payload },
      };
    case "docs_fetch_failed":
      return {
        ...state,
        docsLoading: false,
        data: { ...state.data, docsResults: [] },
      };
    case "llm_fetch_started":
      return { ...state, llmLoading: true };
    case "llm_fetch_succeeded":
      return {
        ...state,
        llmLoading: false,
        data: { ...state.data, llmResults: action.payload },
      };
    case "llm_fetch_failed":
      return {
        ...state,
        llmLoading: false,
        data: { ...state.data, llmResults: undefined },
      };
    default:
      return state;
  }
};
