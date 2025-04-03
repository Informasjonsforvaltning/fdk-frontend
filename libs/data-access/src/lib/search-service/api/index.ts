const { FDK_SEARCH_SERVICE_BASE_URI } = process.env;

export const searchRelations = async (resourceId: string) => {
    const uri = `${FDK_SEARCH_SERVICE_BASE_URI}/search`;
    return await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filters: {
                relations: {
                    value: resourceId,
                },
            },
        }),
    }).then((response) => {
        if (!response.ok) throw new Error('relations not found');
        return response.json();
    });
};

export const searchOrgDatasets = async (orgPath?: string) => {
    if (!orgPath || !orgPath.length) throw new Error('missing orgpath');
    const uri = `${FDK_SEARCH_SERVICE_BASE_URI}/search/datasets`;
    return await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filters: {
                orgPath: {
                    value: orgPath,
                },
            },
        }),
    }).then((response) => {
        if (!response.ok) throw new Error('org datasets not found');
        return response.json();
    });
};

export const searchThemeDatasets = async (themes?: string[]) => {
    if (!themes || !themes.length) throw new Error('missing themes');
    const uri = `${FDK_SEARCH_SERVICE_BASE_URI}/search/datasets`;
    return await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filters: {
                losTheme: {
                    value: themes,
                },
            },
        }),
    }).then((response) => {
        if (!response.ok) throw new Error('theme datasets not found');
        return response.json();
    });
};

export const searchConcepts = async (conceptUris: string[]) => {
    if (!conceptUris || !conceptUris.length) throw new Error('missing conceptUris');
    const uri = `${FDK_SEARCH_SERVICE_BASE_URI}/search`;
    return await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filters: {
                uri: {
                    value: conceptUris,
                },
            },
        }),
    }).then((response) => {
        if (!response.ok) throw new Error('concepts not found');
        return response.json();
    });
};
