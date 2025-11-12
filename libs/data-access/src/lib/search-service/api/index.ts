import { type DatasetReference } from '@fellesdatakatalog/types';
import { getResource } from '../../resource-service/api';

export const searchApi = async (path: string, body: any) => {
    const uri = `${process.env.FDK_SEARCH_SERVICE_BASE_URI}${path}`;
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return await fetch(uri, options).then(async (response) => {
        if (!response.ok) {
            console.error('search failed', uri, await response.json());
            throw new Error('search failed');
        }
        return response.json();
    });
};

export const searchRelations = async (uri: string) => {
    if (!uri) throw new Error('missing uri');
    return await searchApi('/search', {
        filters: {
            relations: {
                value: uri,
            },
        },
    });
};

export const searchOrgDatasets = async (orgPath?: string) => {
    if (!orgPath || !orgPath.length) throw new Error('missing orgpath');
    return await searchApi('/search/datasets', {
        filters: {
            orgPath: {
                value: orgPath,
            },
        },
    });
};

export const searchThemeDatasets = async (themes?: string[]) => {
    if (!themes || !themes.length) throw new Error('missing themes');
    return await searchApi('/search/datasets', {
        filters: {
            losTheme: {
                value: themes,
            },
        },
    });
};

export const searchConcepts = async (conceptUris?: string[]) => {
    if (!conceptUris || !conceptUris.length) throw new Error('missing conceptUris');
    return await searchApi('/search/concepts', {
        filters: {
            uri: {
                value: conceptUris,
            },
        },
    });
};

export const searchDatasets = async (datasetUris?: string[]) => {
    if (!datasetUris || !datasetUris.length) throw new Error('missing datasetUris');
    return await searchApi('/search/datasets', {
        filters: {
            uri: {
                value: datasetUris,
            },
        },
    });
};

export const searchDataServices = async (uris?: string[]) => {
    if (!uris || !uris.length) throw new Error('missing uris');
    return await searchApi('/search/data-services', {
        filters: {
            uri: {
                value: uris,
            },
        },
    });
};

export const searchInformationModels = async (uris?: string[]) => {
    if (!uris || !uris.length) throw new Error('missing uris');
    return await searchApi('/search/information-models', {
        filters: {
            uri: {
                value: uris,
            },
        },
    });
};

export const getPopulatedDatasetReferences = async (references?: DatasetReference[]) => {
    if (!references || !references.length) throw new Error('missing references');
    return await Promise.all(
        references.map(async (reference: DatasetReference) => {
            if (!reference.source?.uri) throw new Error('reference missing source uri');

            let resource;
            if (reference.source.uri.startsWith(process.env.FDK_BASE_URI as string)) {
                resource = await getResource(reference.source.uri);
            } else {
                resource = await searchApi('/search', {
                    filters: {
                        uri: {
                            value: [reference.source.uri],
                        },
                    },
                });
                resource = resource?.hits?.at(0);
            }
            return {
                reference,
                resource,
            };
        }),
    );
};

export const getAllDatasets = async (page = 1, size = 1000) => {
    return await searchApi('/search/datasets', {
        pagination: {
            size,
            page,
        },
    });
};

export const getAllServices = async (page = 1, size = 1000) => {
    return await searchApi('/search/services', {
        pagination: {
            size,
            page,
        },
    });
};
