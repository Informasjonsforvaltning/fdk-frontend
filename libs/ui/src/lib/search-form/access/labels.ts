import { OPEN_DATA_AGGREGATION_KEY } from "./types";

export type AccessFilterDictionary = {
  open: string;
  public: string;
  restricted: string;
  nonPublic: string;
  unknown: string;
};

export const getAccessRightsLabels = (dict: AccessFilterDictionary): Record<string, string> => ({
  [OPEN_DATA_AGGREGATION_KEY]: dict.open,
  PUBLIC: dict.public,
  RESTRICTED: dict.restricted,
  NON_PUBLIC: dict.nonPublic,
  null: dict.unknown,
});

export const formatAccessLabel = (key: string, labels: Record<string, string>): string => labels[key] ?? key;

export const formatAccessCheckboxLabel = (key: string, count: number, labels: Record<string, string>): string =>
  `${formatAccessLabel(key, labels)} (${count})`;
