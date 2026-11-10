export const HVD_REGULATION_URI = "http://data.europa.eu/eli/reg_impl/2023/138/oj";

export const isHvdRegulated = (applicableLegislation?: { uri?: string }[]): boolean =>
  applicableLegislation?.some((legislation) => legislation.uri === HVD_REGULATION_URI) ?? false;
