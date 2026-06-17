import { UNKNOWN_ORG_PATH_KEY } from "./types";

export const ORG_PATH_URL_UNKNOWN_TOKEN = "null" as const;

export const orgPathKeyToQueryValue = (key: string): string =>
  key === UNKNOWN_ORG_PATH_KEY ? ORG_PATH_URL_UNKNOWN_TOKEN : key;

export const orgPathKeyToFilterValue = (key: string): string | null => (key === UNKNOWN_ORG_PATH_KEY ? null : key);

export const orgPathQueryValueToKey = (value: string): string =>
  value === ORG_PATH_URL_UNKNOWN_TOKEN || value === UNKNOWN_ORG_PATH_KEY ? UNKNOWN_ORG_PATH_KEY : value;
