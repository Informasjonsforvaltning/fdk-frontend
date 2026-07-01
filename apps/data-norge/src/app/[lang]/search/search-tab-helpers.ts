/**
 * App-specific search tab helpers (hit mapping, filtering, badge counts).
 */

import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { type SearchObject } from "@fellesdatakatalog/types";

/** LLM search hit `type` values mapped to backend `searchType`. */
export const LLM_HIT_TYPE_TO_SEARCH_TYPE: Record<string, string> = {
  dataset: "DATASET",
  dataservice: "DATA_SERVICE",
  concept: "CONCEPT",
  informationmodel: "INFORMATION_MODEL",
  service: "SERVICE",
  event: "EVENT",
};

export const mapLlmHitTypeToSearchType = function (llmType: string): string {
  return LLM_HIT_TYPE_TO_SEARCH_TYPE[llmType] ?? llmType;
};

type LlmSearchHit = LlmSearchResponse["hits"][number];

/** Maps an LLM search hit to a catalog `SearchObject` for `EntityTeaser`. */
export const mapLlmHitToSearchObject = function (item: LlmSearchHit): SearchObject {
  const searchType = mapLlmHitTypeToSearchType(item.type);
  return {
    id: item.id,
    uri: item.id,
    title: item.title,
    description: item.description,
    searchType: searchType as SearchObject["searchType"],
    organization: {
      id: item.publisherId,
      prefLabel: { nb: item.publisher },
    } as SearchObject["organization"],
  } as SearchObject;
};
