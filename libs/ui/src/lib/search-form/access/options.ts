import { type AggregationKeyCount } from "../org-path/types";
import { formatAccessCheckboxLabel } from "./labels";

export type AccessFilterOption = {
  label: string;
  value: string;
};

export const buildAccessFilterOptions = (aggregation: AggregationKeyCount[]): AccessFilterOption[] =>
  aggregation.map(({ key, count }) => ({
    label: formatAccessCheckboxLabel(key, count),
    value: key,
  }));
