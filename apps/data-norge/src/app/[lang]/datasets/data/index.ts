export const fetchResource = async (uri: string) => {
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // cache: 'force-cache'
    });
    if (!response.ok) throw new Error('Bad response');
    return await response.json();
};

export const fetchRelations = async (uri: string, id: string) => {
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filters: {
                relations: {
                    value: id
                }
            }
        })
    });
    if (!response.ok) throw new Error(`Bad response: ${response.status}`);
    return await response.json();
}

export const fetchOrgDatasets = async (uri: string, orgPath: string) => {
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filters: {
                orgPath: {
                    value: orgPath
                }
            }
        })
    });
    if (!response.ok) throw new Error(`Bad response: ${response.status}`);
    return await response.json();
}

export const fetchThemeDatasets = async (uri: string, themes: string[]) => {
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filters: {
                losTheme: {
                    value: themes
                }
            }
        })
    });
    if (!response.ok) throw new Error(`Bad response: ${response.status}`);
    return await response.json();
}
