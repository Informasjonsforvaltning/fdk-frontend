const { FDK_RESOURCE_SERVICE_BASE_URI } = process.env;

export const getResource = async (uri: string) => {
    return await fetch(uri, {
        method: 'GET',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
};

export const getDataset = async (datasetId: string) => {
    const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/datasets/${datasetId}`;
    return getResource(uri);
};

export const getApi = async (apiId: string) => {
    const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/data-services/${apiId}`;
    return getResource(uri);
};
