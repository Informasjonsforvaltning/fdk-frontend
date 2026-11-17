import { type AggregationKeyCount } from "../types";
import { formatDatasetTypeCheckboxLabel } from "./labels";

export type DatasetTypeFilterOption = {
  label: string;
  value: string;
};

export const buildDatasetTypeFilterOptions = (
  aggregation: AggregationKeyCount[],
  labels: Record<string, string>,
): DatasetTypeFilterOption[] =>
  aggregation.map(({ key, count }) => ({
    label: formatDatasetTypeCheckboxLabel(key, count, labels),
    value: key,
  }));
