import { type AggregationKeyCount } from "../../types";
import { MAX_LOS_THEME_DEPTH } from "./types";

export const getLosThemeParts = (key: string): string[] => key.split("/").filter((part) => part.length > 0);

export const getLosThemeDepth = (key: string): number => getLosThemeParts(key).length;

export const getLosThemeParent = (key: string): string | undefined => {
  const parts = getLosThemeParts(key);
  if (parts.length <= 1) return undefined;
  return parts.slice(0, -1).join("/");
};

export const mergeLosThemeAggregations = (
  aggregations: Array<Array<{ key: string | null; count: number }>>,
): AggregationKeyCount[] => {
  const merged = new Map<string, number>();

  for (const losThemes of aggregations) {
    for (const { key, count } of losThemes) {
      if (!key) continue;
      if (getLosThemeDepth(key) > MAX_LOS_THEME_DEPTH) continue;
      merged.set(key, (merged.get(key) ?? 0) + count);
    }
  }

  return Array.from(merged.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => a.key.localeCompare(b.key));
};

export const getLosThemeChildren = (
  aggregation: AggregationKeyCount[],
  parentKey: string,
  depth: number,
): AggregationKeyCount[] =>
  aggregation
    .filter(({ key }) => {
      if (getLosThemeDepth(key) !== depth) return false;
      if (depth === 1) return true;
      return key.startsWith(`${parentKey}/`);
    })
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));

/** Ensure selected los themes (and their ancestors) appear even when missing from aggregation. */
export const enrichLosThemeAggregationWithSelection = function (
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
    let parent = getLosThemeParent(path);
    while (parent) {
      ensureKey(parent);
      parent = getLosThemeParent(parent);
    }
  }

  return Array.from(counts.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => a.key.localeCompare(b.key));
};
