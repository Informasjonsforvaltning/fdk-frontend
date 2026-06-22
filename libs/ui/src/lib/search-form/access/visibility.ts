import { type AggregationKeyCount } from "../types";

export const shouldShowAccessFilter = (aggregation: AggregationKeyCount[]): boolean => {
  if (aggregation.length === 0) return false;
  return !(aggregation.length === 1 && aggregation[0]?.key === "null");
};
