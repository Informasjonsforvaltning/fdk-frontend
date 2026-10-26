import { type AggregationKeyCount } from "../types";
import { formatSpatialCheckboxLabel, type SpatialLabelMap } from "./labels";

export type SpatialFilterOption = {
  label: string;
  value: string;
};

export const buildSpatialFilterOptions = (
  aggregation: AggregationKeyCount[],
  labels: SpatialLabelMap = {},
): SpatialFilterOption[] =>
  aggregation.map(({ key, count }) => ({
    label: formatSpatialCheckboxLabel(key, count, labels),
    value: key,
  }));
