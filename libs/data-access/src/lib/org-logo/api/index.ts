const { DIGDIR_ORGLOGO_API_BASE_URI } = process.env;

// Uses HEAD since only the status is needed. A GET whose body
// is never read keeps its socket and buffers alive until GC.
export const logoExists = async (uri: string): Promise<boolean> => {
  const response = await fetch(uri, { method: "HEAD" });
  return response.ok;
};

export const getOrgLogo = async (orgNr?: string) => {
  if (!orgNr) return null;

  const emblemUri = `${DIGDIR_ORGLOGO_API_BASE_URI}/api/emblem/svg/${orgNr}`;
  const logoSvgUri = `${DIGDIR_ORGLOGO_API_BASE_URI}/api/logo/svg/${orgNr}`;
  const logoOrgUri = `${DIGDIR_ORGLOGO_API_BASE_URI}/api/logo/org/${orgNr}`;

  if (await logoExists(emblemUri)) return emblemUri;
  if (await logoExists(logoSvgUri)) return logoSvgUri;
  if (await logoExists(logoOrgUri)) return logoOrgUri;

  return null;
};
