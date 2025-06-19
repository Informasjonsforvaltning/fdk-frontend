import { type DatasetReference } from '@fdk-frontend/fdk-types';
import { getResource } from '../../resource-service/api';

const { FDK_SEARCH_SERVICE_BASE_URI, FDK_BASE_URI } = process.env;

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

export const searchConcepts = async (conceptUris?: string[]) => {
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

export const searchDatasets = async (datasetUris?: string[]) => {
    if (!datasetUris || !datasetUris.length) throw new Error('missing datasetUris');
    const uri = `${FDK_SEARCH_SERVICE_BASE_URI}/search/datasets`;
    return await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filters: {
                uri: {
                    value: datasetUris,
                },
            },
        }),
    }).then((response) => {
        if (!response.ok) throw new Error('datasets not found');
        return response.json();
    });
};

export const searchDataServices = async (uris?: string[]) => {
    if (!uris || !uris.length) throw new Error('missing uris');
    const uri = `${FDK_SEARCH_SERVICE_BASE_URI}/search/data-services`;
    return await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filters: {
                uri: {
                    value: uris,
                },
            },
        }),
    }).then((response) => {
        // console.log('searchDataServices response', response);
        if (!response.ok) throw new Error('data services not found');
        return response.json();
    });
};

export const searchInformationModels = async (uris?: string[]) => {
    if (!uris || !uris.length) throw new Error('missing uris');
    const uri = `${FDK_SEARCH_SERVICE_BASE_URI}/search/information-models`;
    return await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            filters: {
                uri: {
                    value: uris,
                },
            },
        }),
    }).then((response) => {
        if (!response.ok) throw new Error('information models not found');
        return response.json();
    });
};

export const searchAll = async (uris?: string[]) => {
    if (!uris || !uris.length) throw new Error('missing uris');
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
                    value: uris,
                },
            },
        }),
    }).then((response) => {
        if (!response.ok) throw new Error('resources not found');
        return response.json();
    });
};

export const getPopulatedDatasetReferences = async (references?: DatasetReference[]) => {
    if (!references || !references.length) throw new Error('missing references');
    return await Promise.all(
        references.map(async (reference: DatasetReference) => {
            if (!reference.source?.uri) throw new Error('reference missing source uri');

            let resource;
            if (reference.source.uri.startsWith(FDK_BASE_URI as string)) {
                resource = await getResource(reference.source.uri);
            } else {
                resource = await searchAll([reference.source.uri]);
                resource = resource?.hits?.at(0);
            }
            return {
                reference,
                resource,
            };
        }),
    );
};
