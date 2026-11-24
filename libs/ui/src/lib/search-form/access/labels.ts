import { OPEN_DATA_AGGREGATION_KEY } from "./types";

export type AccessFilterDictionary = {
  open: string;
  unknown: string;
};

export const getAccessRightsLabels = (
  dict: AccessFilterDictionary,
  referenceLabels: Partial<Record<string, string>> = {},
): Record<string, string> => {
  const labels: Record<string, string> = {};
  for (const [code, label] of Object.entries(referenceLabels)) {
    if (label) labels[code] = label;
  }
  labels[OPEN_DATA_AGGREGATION_KEY] = dict.open;
  labels.null = dict.unknown;
  return labels;
};

export const formatAccessLabel = (key: string, labels: Record<string, string>): string => labels[key] ?? key;

export const formatAccessCheckboxLabel = (key: string, count: number, labels: Record<string, string>): string =>
  `${formatAccessLabel(key, labels)} (${count})`;
