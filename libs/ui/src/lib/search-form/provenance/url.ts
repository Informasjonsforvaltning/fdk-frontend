import { parseCommaSeparatedParam } from "../parse-comma-separated-param";

export const provenanceKeysToQueryParam = (keys: string[]): string => keys.join(",");

export const parseProvenanceQueryParam = (value: string | null): string[] => parseCommaSeparatedParam(value);

export type ProvenanceSearchFilter = {
  provenance: {
    value: string | Array<string>;
  };
};

export const buildProvenanceSearchFilter = (provenanceParam: string | null): ProvenanceSearchFilter | undefined => {
  const keys = parseProvenanceQueryParam(provenanceParam);
  if (keys.length === 0) return undefined;

  return {
    provenance: {
      value: keys.length === 1 ? keys[0] : keys,
    },
  };
};
