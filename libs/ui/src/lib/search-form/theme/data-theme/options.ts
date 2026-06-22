import { type AggregationKeyCount } from "../../types";
import { formatDataThemeCheckboxLabel } from "./labels";

export type DataThemeFilterOption = {
  label: string;
  value: string;
};

export const buildDataThemeFilterOptions = (aggregation: AggregationKeyCount[]): DataThemeFilterOption[] =>
  aggregation.map(({ key, count }) => ({
    label: formatDataThemeCheckboxLabel(key, count),
    value: key,
  }));
