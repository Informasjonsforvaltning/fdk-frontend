import { mapLlmHitTypeToSearchType, type LlmSearchCacheHit } from "@fdk-frontend/utils";
import { type SearchObject } from "@fellesdatakatalog/types";

/** Maps an LLM search hit to a catalog `SearchObject` for `EntityTeaser`. */
export const mapLlmHitToSearchObject = function (item: LlmSearchCacheHit): SearchObject {
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
