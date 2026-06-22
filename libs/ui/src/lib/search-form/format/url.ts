import { parseCommaSeparatedParam } from "../parse-comma-separated-param";

export const formatKeysToQueryParam = (keys: string[]): string => keys.join(",");

export const parseFormatQueryParam = (value: string | null): string[] => parseCommaSeparatedParam(value);

export type FormatSearchFilter = {
  formats: {
    value: string[];
  };
};

export const buildFormatSearchFilter = (formatParam: string | null): FormatSearchFilter | undefined => {
  const keys = parseFormatQueryParam(formatParam);
  if (keys.length === 0) return undefined;

  return {
    formats: {
      value: keys,
    },
  };
};
