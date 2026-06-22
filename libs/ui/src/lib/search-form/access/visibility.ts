import { type AggregationKeyCount } from "../org-path/types";

export const shouldShowAccessFilter = (aggregation: AggregationKeyCount[]): boolean => {
  if (aggregation.length === 0) return false;
  return !(aggregation.length === 1 && aggregation[0]?.key === "null");
};
