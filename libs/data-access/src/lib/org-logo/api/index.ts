const {
    DIGDIR_ORGLOGO_API_BASE_URI
} = process.env;

export const fetchLogo = async (uri: string) => {
    const response = await fetch(uri, { method: 'GET' });
    if (!response.ok) return null;
    return uri;
};

export const getOrgLogo = async (orgNr: string) => {
    const emblemUri = `${DIGDIR_ORGLOGO_API_BASE_URI}/api/emblem/svg/${orgNr}`;
    const logoSvgUri = `${DIGDIR_ORGLOGO_API_BASE_URI}/api/logo/svg/${orgNr}`;
    const logoOrgUri = `${DIGDIR_ORGLOGO_API_BASE_URI}/api/logo/org/${orgNr}`;

    let orgLogo = await fetchLogo(emblemUri);
    if (orgLogo) return orgLogo;

    orgLogo = await fetchLogo(logoSvgUri);
    if (orgLogo) return orgLogo;

    orgLogo = await fetchLogo(logoOrgUri);
    if (orgLogo) return orgLogo;

    return null;
};