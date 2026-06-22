import { parseCommaSeparatedParam } from "../../parse-comma-separated-param";
import { minimizeLosThemeSelection } from "./selection";

export const losThemeKeysToQueryParam = (keys: string[]): string => minimizeLosThemeSelection(keys).join(",");

export const parseLosThemeQueryParam = (value: string | null): string[] => parseCommaSeparatedParam(value);

export type LosThemeSearchFilter = {
  losTheme: {
    value: string[];
  };
};

export const buildLosThemeSearchFilter = (losThemeParam: string | null): LosThemeSearchFilter | undefined => {
  const keys = parseLosThemeQueryParam(losThemeParam);
  if (keys.length === 0) return undefined;

  return {
    losTheme: {
      value: keys,
    },
  };
};
