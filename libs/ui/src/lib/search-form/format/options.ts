import { type AggregationKeyCount } from "../types";
import { splitFormatAggregation } from "./aggregation";
import { formatFileTypeCheckboxLabel, formatMediaFormatCheckboxLabel } from "./labels";

export type FormatFilterOption = {
  label: string;
  value: string;
};

const buildOptions = (
  aggregation: AggregationKeyCount[],
  formatLabel: (key: string, count: number) => string,
): FormatFilterOption[] =>
  aggregation.map(({ key, count }) => ({
    label: formatLabel(key, count),
    value: key,
  }));

export const buildFileTypeFilterOptions = (aggregation: AggregationKeyCount[]): FormatFilterOption[] =>
  buildOptions(splitFormatAggregation(aggregation).fileTypes, formatFileTypeCheckboxLabel);

export const buildMediaFormatFilterOptions = (aggregation: AggregationKeyCount[]): FormatFilterOption[] =>
  buildOptions(splitFormatAggregation(aggregation).mediaFormats, formatMediaFormatCheckboxLabel);
