import { MAX_ORG_PATH_DEPTH, UNKNOWN_ORG_PATH_KEY, type AggregationKeyCount } from "./types";
import { ORG_PATH_URL_UNKNOWN_TOKEN } from "./encoding";

const normalizeOrgPathKey = (key: string | null): string =>
  !key || key === ORG_PATH_URL_UNKNOWN_TOKEN ? UNKNOWN_ORG_PATH_KEY : key;

export const getOrgPathParts = (key: string): string[] =>
  key === UNKNOWN_ORG_PATH_KEY ? [] : key.split("/").filter((part) => part.length > 0);

export const getOrgPathDepth = (key: string): number =>
  key === UNKNOWN_ORG_PATH_KEY ? 1 : getOrgPathParts(key).length;

export const getOrgPathParent = (key: string): string | undefined => {
  if (key === UNKNOWN_ORG_PATH_KEY) return undefined;
  const parts = getOrgPathParts(key);
  if (parts.length <= 1) return undefined;
  return `/${parts.slice(0, -1).join("/")}`;
};

export const mergeOrgPathAggregations = (
  aggregations: Array<Array<{ key: string | null; count: number }>>,
): AggregationKeyCount[] => {
  const merged = new Map<string, number>();

  for (const orgPaths of aggregations) {
    for (const { key, count } of orgPaths) {
      const normalized = normalizeOrgPathKey(key);
      if (getOrgPathDepth(normalized) > MAX_ORG_PATH_DEPTH) continue;
      merged.set(normalized, (merged.get(normalized) ?? 0) + count);
    }
  }

  return Array.from(merged.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => a.key.localeCompare(b.key));
};

export const getOrgPathChildren = (
  aggregation: AggregationKeyCount[],
  parentPath: string,
  depth: number,
): AggregationKeyCount[] =>
  aggregation
    .filter(({ key }) => {
      if (getOrgPathDepth(key) !== depth) return false;
      if (depth === 1) return true;
      return key.startsWith(`${parentPath}/`);
    })
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));

/** Ensure selected org paths (and their ancestors) appear even when missing from aggregation. */
export const enrichAggregationWithSelection = function (
  aggregation: AggregationKeyCount[],
  selected: string[],
): AggregationKeyCount[] {
  const counts = new Map(aggregation.map(({ key, count }) => [key, count]));

  const ensureKey = (key: string): void => {
    if (!counts.has(key)) {
      counts.set(key, 0);
    }
  };

  for (const path of selected) {
    ensureKey(path);
    let parent = getOrgPathParent(path);
    while (parent) {
      ensureKey(parent);
      parent = getOrgPathParent(parent);
    }
  }

  return Array.from(counts.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => a.key.localeCompare(b.key));
};
