export { MAX_ORG_PATH_DEPTH, UNKNOWN_ORG_PATH_KEY } from "./types";

export {
  ORG_PATH_URL_UNKNOWN_TOKEN,
  orgPathKeyToFilterValue,
  orgPathKeyToQueryValue,
  orgPathQueryValueToKey,
} from "./encoding";

export { orgPathKeysToQueryParam, parseOrgPathQueryParam, buildOrgPathSearchFilter } from "./url";
export type { OrgPathSearchFilter } from "./url";

export {
  minimizeOrgPathSelection,
  isOrgPathSelected,
  hasSelectedOrgPathDescendant,
  computeNextOrgPathSelection,
} from "./selection";

export {
  getOrgPathParts,
  getOrgPathDepth,
  getOrgPathParent,
  mergeOrgPathAggregations,
  getOrgPathChildren,
  enrichAggregationWithSelection,
} from "./tree";

export { formatOrgPathLabel, formatOrgPathCheckboxLabel, type OrgPathLabelMap, type OrgTypeDictionary } from "./labels";
export { useOrgPathLabels } from "./use-org-path-labels";

export { useSyncedOrgPathSelection } from "./use-synced-selection";
