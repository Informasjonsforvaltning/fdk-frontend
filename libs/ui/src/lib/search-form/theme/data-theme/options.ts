import { type AggregationKeyCount } from "../../types";
import { formatDataThemeCheckboxLabel, type DataThemeLabelMap } from "./labels";

export type DataThemeFilterOption = {
  label: string;
  value: string;
};

export const buildDataThemeFilterOptions = (
  aggregation: AggregationKeyCount[],
  labels: DataThemeLabelMap,
): DataThemeFilterOption[] =>
  aggregation.map(({ key, count }) => ({
    label: formatDataThemeCheckboxLabel(key, count, labels),
    value: key,
  }));
