import { orgPathKeyToFilterValue, orgPathKeyToQueryValue, orgPathQueryValueToKey } from "./encoding";
import { minimizeOrgPathSelection } from "./selection";

export const orgPathKeysToQueryParam = (keys: string[]): string =>
  minimizeOrgPathSelection(keys).map(orgPathKeyToQueryValue).join(",");

export const parseOrgPathQueryParam = (value: string | null): string[] => {
  if (!value) return [];
  return Array.from(
    new Set(
      value
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part.length > 0)
        .map(orgPathQueryValueToKey),
    ),
  );
};

export type OrgPathSearchFilter = {
  orgPath: {
    value: string | null | Array<string | null>;
  };
};

export const buildOrgPathSearchFilter = (orgPathParam: string | null): OrgPathSearchFilter | undefined => {
  const keys = parseOrgPathQueryParam(orgPathParam);
  if (keys.length === 0) return undefined;

  const values = keys.map(orgPathKeyToFilterValue);
  return {
    orgPath: {
      value: values.length === 1 ? values[0] : values,
    },
  };
};
