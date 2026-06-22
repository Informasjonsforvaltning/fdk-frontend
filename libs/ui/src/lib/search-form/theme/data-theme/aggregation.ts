import { type AggregationKeyCount } from "../../types";

export const mergeDataThemeAggregations = (
  aggregations: Array<Array<{ key: string | null; count: number }>>,
): AggregationKeyCount[] => {
  const merged = new Map<string, number>();

  for (const aggregation of aggregations) {
    for (const { key, count } of aggregation) {
      if (!key) continue;
      merged.set(key, (merged.get(key) ?? 0) + count);
    }
  }

  return Array.from(merged.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
};
