import { type AggregationKeyCount } from "../types";

export const FILE_TYPE_PREFIX = "FILE_TYPE ";
export const MEDIA_TYPE_PREFIX = "MEDIA_TYPE ";

export const isFileTypeKey = (key: string): boolean => key.startsWith(FILE_TYPE_PREFIX);
export const isMediaTypeKey = (key: string): boolean => key.startsWith(MEDIA_TYPE_PREFIX);

export const mergeFormatAggregations = (
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

export const splitFormatAggregation = (
  aggregation: AggregationKeyCount[],
): {
  fileTypes: AggregationKeyCount[];
  mediaFormats: AggregationKeyCount[];
} => ({
  fileTypes: aggregation.filter(({ key }) => isFileTypeKey(key)),
  mediaFormats: aggregation.filter(({ key }) => isMediaTypeKey(key)),
});
