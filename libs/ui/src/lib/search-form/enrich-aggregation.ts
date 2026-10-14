import { type AggregationKeyCount } from "./types";

/**
 * Ensure selected keys appear in the aggregation even when missing from the
 * response (e.g. cross-facet filters reduce a previously selected value to 0 hits).
 */
export const enrichAggregationWithSelection = (
  aggregation: AggregationKeyCount[],
  selected: string[],
): AggregationKeyCount[] => {
  if (selected.length === 0) return aggregation;

  const counts = new Map(aggregation.map(({ key, count }) => [key, count]));
  for (const key of selected) {
    if (!counts.has(key)) {
      counts.set(key, 0);
    }
  }

  return Array.from(counts.entries()).map(([key, count]) => ({ key, count }));
};
