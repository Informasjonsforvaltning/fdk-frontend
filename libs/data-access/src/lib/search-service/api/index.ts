const {
    FDK_SEARCH_SERVICE_BASE_URI
} = process.env;

export const getRelations = async (resourceId: string) => {
    const uri = `${FDK_SEARCH_SERVICE_BASE_URI}/search`;
    return await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filters: {
                relations: {
                    value: resourceId,
                },
            },
        }),
    }).then(res => res.json());
};

export const getOrgDatasets = async (orgPath: string) => {
    const uri = `${FDK_SEARCH_SERVICE_BASE_URI}/search/datasets`;
    return await fetch(uri, {
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
    }).then(res => res.json());
};

export const getThemeDatasets = async (themes: string[]) => {
    const uri = `${FDK_SEARCH_SERVICE_BASE_URI}/search/datasets`;
    return await fetch(uri, {
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
    }).then(res => res.json());
};
