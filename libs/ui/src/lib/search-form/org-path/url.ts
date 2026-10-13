import { parseCommaSeparatedParam } from "../parse-comma-separated-param";
import { orgPathKeyToFilterValue, orgPathKeyToQueryValue, orgPathQueryValueToKey } from "./encoding";
import { minimizeOrgPathSelection } from "./selection";

export const orgPathKeysToQueryParam = (keys: string[]): string =>
  minimizeOrgPathSelection(keys).map(orgPathKeyToQueryValue).join(",");

export const parseOrgPathQueryParam = (value: string | null): string[] =>
  parseCommaSeparatedParam(value, orgPathQueryValueToKey);

export type OrgPathSearchFilter = {
  orgPath: {
    value: string[];
  };
};

export const buildOrgPathSearchFilter = (orgPathParam: string | null): OrgPathSearchFilter | undefined => {
  const keys = parseOrgPathQueryParam(orgPathParam);
  if (keys.length === 0) return undefined;

  return {
    orgPath: {
      value: keys.map(orgPathKeyToFilterValue),
    },
  };
};
