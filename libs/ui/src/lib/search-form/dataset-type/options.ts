import { type AggregationKeyCount } from "../types";
import { formatDatasetTypeCheckboxLabel, isHighValueDatasetType } from "./labels";

export type DatasetTypeFilterOption = {
  label: string;
  value: string;
};

export const buildDatasetTypeFilterOptions = (
  aggregation: AggregationKeyCount[],
  labels: Record<string, string>,
): DatasetTypeFilterOption[] =>
  aggregation
    .filter(({ key }) => isHighValueDatasetType(key))
    .map(({ key, count }) => ({
      label: formatDatasetTypeCheckboxLabel(key, count, labels),
      value: key,
    }));
