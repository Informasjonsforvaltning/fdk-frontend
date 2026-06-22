import { type AggregationKeyCount } from "../types";
import { formatSpatialCheckboxLabel } from "./labels";

export type SpatialFilterOption = {
  label: string;
  value: string;
};

export const buildSpatialFilterOptions = (aggregation: AggregationKeyCount[]): SpatialFilterOption[] =>
  aggregation.map(({ key, count }) => ({
    label: formatSpatialCheckboxLabel(key, count),
    value: key,
  }));
