import { type AggregationKeyCount } from "../types";
import { formatProvenanceCheckboxLabel } from "./labels";

export type ProvenanceFilterOption = {
  label: string;
  value: string;
};

export const buildProvenanceFilterOptions = (aggregation: AggregationKeyCount[]): ProvenanceFilterOption[] =>
  aggregation.map(({ key, count }) => ({
    label: formatProvenanceCheckboxLabel(key, count),
    value: key,
  }));
