import { parseCommaSeparatedParam } from "../parse-comma-separated-param";

export const spatialKeysToQueryParam = (keys: string[]): string => keys.join(",");

export const parseSpatialQueryParam = (value: string | null): string[] => parseCommaSeparatedParam(value);

export type SpatialSearchFilter = {
  spatial: {
    value: string[];
  };
};

export const buildSpatialSearchFilter = (spatialParam: string | null): SpatialSearchFilter | undefined => {
  const keys = parseSpatialQueryParam(spatialParam);
  if (keys.length === 0) return undefined;

  return {
    spatial: {
      value: keys,
    },
  };
};
