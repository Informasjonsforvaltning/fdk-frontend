import { parseCommaSeparatedParam } from "../parse-comma-separated-param";

export const dcatProfileKeysToQueryParam = (keys: string[]): string => keys.join(",");

export const parseDcatProfileQueryParam = (value: string | null): string[] => parseCommaSeparatedParam(value);

export type DcatProfileSearchFilter = {
  dcatProfiles: {
    value: string[];
  };
};

export const buildDcatProfileSearchFilter = (dcatProfileParam: string | null): DcatProfileSearchFilter | undefined => {
  const keys = parseDcatProfileQueryParam(dcatProfileParam);
  if (keys.length === 0) return undefined;

  return {
    dcatProfiles: {
      value: keys,
    },
  };
};
