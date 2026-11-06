type StandardWithLinks = {
  uri?: string | null;
  seeAlso?: string[] | null;
};

export const getStandardLinks = (standard: StandardWithLinks): string[] => {
  if (standard.seeAlso?.length) return standard.seeAlso;
  return standard.uri ? [standard.uri] : [];
};
