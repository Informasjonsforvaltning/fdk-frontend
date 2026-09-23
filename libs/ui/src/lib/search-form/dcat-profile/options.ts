import { type AggregationKeyCount } from "../types";
import { DCAT_PROFILE_DEFAULT, formatDcatProfileCheckboxLabel } from "./labels";

export type DcatProfileFilterOption = {
  label: string;
  value: string;
};

export const buildDcatProfileFilterOptions = (
  aggregation: AggregationKeyCount[],
  labels: Record<string, string>,
): DcatProfileFilterOption[] =>
  aggregation
    .filter(({ key }) => key !== DCAT_PROFILE_DEFAULT)
    .map(({ key, count }) => ({
      label: formatDcatProfileCheckboxLabel(key, count, labels),
      value: key,
    }));
