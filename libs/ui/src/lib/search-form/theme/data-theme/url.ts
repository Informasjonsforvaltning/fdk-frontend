import { parseCommaSeparatedParam } from "../../parse-comma-separated-param";

export const dataThemeKeysToQueryParam = (keys: string[]): string => keys.join(",");

export const parseDataThemeQueryParam = (value: string | null): string[] => parseCommaSeparatedParam(value);

export type DataThemeSearchFilter = {
  dataTheme: {
    value: string[];
  };
};

export const buildDataThemeSearchFilter = (dataThemeParam: string | null): DataThemeSearchFilter | undefined => {
  const keys = parseDataThemeQueryParam(dataThemeParam);
  if (keys.length === 0) return undefined;

  return {
    dataTheme: {
      value: keys,
    },
  };
};
