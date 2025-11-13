import { PublicService } from '@fellesdatakatalog/types';

const { FDK_RESOURCE_SERVICE_BASE_URI } = process.env;

export const getResource = async (uri: string) =>
    fetch(uri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) throw new Error('resource not found');
        return response.json();
    });

export const getDataset = async (datasetId: string) => {
    const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/datasets/${datasetId}`;
    return getResource(uri);
};

export const getApi = async (apiId: string) => {
    const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/data-services/${apiId}`;
    return getResource(uri);
};

export const getApis = async (apiIds: string[]): Promise<unknown[]> => {
    const apis = await Promise.all(
        apiIds?.map(async (id: string) => {
            try {
                return await getApi(id);
            } catch {
                return null;
            }
        }),
    );

    // Filter out failed requests (null values)
    return apis.filter((api) => api !== null);
};

export const getService = async (serviceId: string): Promise<PublicService> => {
    const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/services/${serviceId}`;
    return getResource(uri);
};
