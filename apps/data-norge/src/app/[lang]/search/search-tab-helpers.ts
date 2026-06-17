/**
 * App-specific search tab helpers (hit mapping, filtering, badge counts).
 */

import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { type SearchObject } from "@fellesdatakatalog/types";
import {
  ENTITY_TABS,
  KI_TOGGLE_VALUE,
  getSearchTypesForTab,
  type SearchSetSegment,
} from "@fdk-frontend/ui/search-tabs/search-tab-config";

/** Hit with optional searchType (from SearchObject). */
type HitWithType = { searchType?: string };

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

/** Returns hits that belong to the given entity tab (by searchType). */
export const filterHitsForTab = function <T extends HitWithType>(
  hits: T[] | undefined,
  entityTab: SearchSetSegment,
): T[] {
  if (!hits?.length) return [];
  const types = getSearchTypesForTab(entityTab);
  if (!types) return [];
  const tabTypes = new Set(types);
  return hits.filter((h) => h.searchType && tabTypes.has(h.searchType));
};

/** Returns count of hits that belong to the given entity tab (by searchType). */
export const countHitsForTab = function (hits: HitWithType[] | undefined, entityTab: SearchSetSegment): number {
  return filterHitsForTab(hits, entityTab).length;
};

/**
 * Returns badge counts for each tab from search results.
 * KI count is from llmHitsCount; entity tabs from searchResults.hits by searchType.
 */
export const getBadgeCounts = function (
  searchHits: HitWithType[] | undefined,
  llmHitsCount: number,
): Record<string, number> {
  const counts: Record<string, number> = {
    [KI_TOGGLE_VALUE]: llmHitsCount,
  };
  for (const entityTab of ENTITY_TABS) {
    counts[entityTab] = countHitsForTab(searchHits, entityTab);
  }
  return counts;
};
