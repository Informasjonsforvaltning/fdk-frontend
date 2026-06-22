import { type AggregationKeyCount } from "../types";

export const shouldShowTemaFilter = (
  losThemeAggregation: AggregationKeyCount[],
  dataThemeAggregation: AggregationKeyCount[],
): boolean => losThemeAggregation.length > 0 || dataThemeAggregation.length > 0;
