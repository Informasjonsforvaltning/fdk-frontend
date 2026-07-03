import { type AggregationKeyCount } from "../types";
import { formatAccessCheckboxLabel } from "./labels";

export type AccessFilterOption = {
  label: string;
  value: string;
};

export const buildAccessFilterOptions = (
  aggregation: AggregationKeyCount[],
  labels: Record<string, string>,
): AccessFilterOption[] =>
  aggregation.map(({ key, count }) => ({
    label: formatAccessCheckboxLabel(key, count, labels),
    value: key,
  }));
