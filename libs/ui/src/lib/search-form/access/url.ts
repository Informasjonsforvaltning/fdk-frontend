import { parseCommaSeparatedParam } from "../parse-comma-separated-param";
import { OPEN_DATA_AGGREGATION_KEY } from "./types";

export const isOpenDataAggregationKey = (key: string): boolean => key === OPEN_DATA_AGGREGATION_KEY;

export const accessKeysToQueryParam = (keys: string[]): string => keys.join(",");

export const parseAccessQueryParam = (value: string | null): string[] => parseCommaSeparatedParam(value);

export type AccessSearchFilter = {
  accessRights?: {
    value: string[];
  };
  openData?: {
    value: boolean;
  };
};

export const buildAccessSearchFilter = (accessParam: string | null): AccessSearchFilter | undefined => {
  const keys = parseAccessQueryParam(accessParam);
  if (keys.length === 0) return undefined;

  const accessRightsKeys = keys.filter((key) => !isOpenDataAggregationKey(key));
  const hasOpenData = keys.some(isOpenDataAggregationKey);

  const filter: AccessSearchFilter = {};

  if (accessRightsKeys.length > 0) {
    filter.accessRights = {
      value: accessRightsKeys,
    };
  }

  if (hasOpenData) {
    filter.openData = { value: true };
  }

  return Object.keys(filter).length > 0 ? filter : undefined;
};
