/** LLM search hit `type` values mapped to catalog `searchType`. */
const LLM_HIT_TYPE_TO_SEARCH_TYPE: Record<string, string> = {
  dataset: "DATASET",
  dataservice: "DATA_SERVICE",
  concept: "CONCEPT",
  informationmodel: "INFORMATION_MODEL",
  service: "SERVICE",
  event: "EVENT",
};

export const mapLlmHitTypeToSearchType = (llmType: string): string => LLM_HIT_TYPE_TO_SEARCH_TYPE[llmType] ?? llmType;
