import { type AggregationKeyCount } from "../org-path/types";
import { OPEN_DATA_AGGREGATION_KEY, ACCESS_KEY_ORDER } from "./types";

const normalizeAccessRightsKey = (key: string | null): string => (!key || key === "null" ? "null" : key);

const isOpenDataTrueKey = (key: string | null): boolean => key === "true";

const accessSortIndex = (key: string): number => {
  const index = ACCESS_KEY_ORDER.indexOf(key as (typeof ACCESS_KEY_ORDER)[number]);
  return index === -1 ? ACCESS_KEY_ORDER.length : index;
};

export const mergeAccessAggregations = (
  accessRightsAggregations: Array<Array<{ key: string | null; count: number }>>,
  openDataAggregations: Array<Array<{ key: string | null; count: number }>>,
): AggregationKeyCount[] => {
  const merged = new Map<string, number>();

  for (const accessRights of accessRightsAggregations) {
    for (const { key, count } of accessRights) {
      const normalized = normalizeAccessRightsKey(key);
      merged.set(normalized, (merged.get(normalized) ?? 0) + count);
    }
  }

  for (const openData of openDataAggregations) {
    for (const { key, count } of openData) {
      if (!isOpenDataTrueKey(key)) continue;
      merged.set(OPEN_DATA_AGGREGATION_KEY, (merged.get(OPEN_DATA_AGGREGATION_KEY) ?? 0) + count);
    }
  }

  return Array.from(merged.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => accessSortIndex(a.key) - accessSortIndex(b.key) || b.count - a.count || a.key.localeCompare(b.key));
};
