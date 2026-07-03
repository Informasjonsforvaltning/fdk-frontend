import { type AggregationKeyCount } from "../types";
import { formatProvenanceCheckboxLabel } from "./labels";

export type ProvenanceFilterOption = {
  label: string;
  value: string;
};

export const buildProvenanceFilterOptions = (
  aggregation: AggregationKeyCount[],
  labels: Record<string, string>,
): ProvenanceFilterOption[] =>
  aggregation.map(({ key, count }) => ({
    label: formatProvenanceCheckboxLabel(key, count, labels),
    value: key,
  }));
