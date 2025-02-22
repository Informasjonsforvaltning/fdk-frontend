export const fetchResource = async (uri: string) => {
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) throw new Error('Bad response');
    return await response.json();
};

export const fetchCommunityPosts = async (uri: string) => {
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    if (!response.ok) throw new Error('Bad response');
    return await response.json();
};

export const fetchCommunityTopic = async (uri: string) => {
    console.log('fetching', uri);
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    if (!response.ok) throw new Error('Bad response');
    return await response.json();
};

export const fetchLogo = async (uri: string) => {
    const response = await fetch(uri, { method: 'GET' });
    if (!response.ok) throw new Error('Bad response');
    return uri;
};

export const fetchOrgLogo = async (apiBaseUri: string, orgNr: string) => {
    const emblemUri = `${apiBaseUri}/api/emblem/svg/${orgNr}`;
    const logoSvgUri = `${apiBaseUri}/api/logo/svg/${orgNr}`;
    const logoOrgUri = `${apiBaseUri}/api/logo/org/${orgNr}`;

    let orgLogo = await fetchLogo(emblemUri);
    if (orgLogo) return orgLogo;

    orgLogo = await fetchLogo(logoSvgUri);
    if (orgLogo) return orgLogo;

    orgLogo = await fetchLogo(logoOrgUri);
    if (orgLogo) return orgLogo;

    return null;
};

export const fetchMetadataScores = async (uri: string, ids: string[]) => {
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            datasets: ids,
        }),
    });
    if (!response.ok) throw new Error(`Bad response: ${response.status}`);
    return await response.json();
};

export const fetchRelations = async (uri: string, id: string) => {
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filters: {
                relations: {
                    value: id,
                },
            },
        }),
    });
    if (!response.ok) throw new Error(`Bad response: ${response.status}`);
    return await response.json();
};

export const fetchOrgDatasets = async (uri: string, orgPath: string) => {
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filters: {
                orgPath: {
                    value: orgPath,
                },
            },
        }),
    });
    if (!response.ok) throw new Error(`Bad response: ${response.status}`);
    return await response.json();
};

export const fetchThemeDatasets = async (uri: string, themes: string[]) => {
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filters: {
                losTheme: {
                    value: themes,
                },
            },
        }),
    });
    if (!response.ok) throw new Error(`Bad response: ${response.status}`);
    return await response.json();
};
