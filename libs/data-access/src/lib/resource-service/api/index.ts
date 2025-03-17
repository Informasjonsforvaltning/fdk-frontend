const { FDK_RESOURCE_SERVICE_BASE_URI } = process.env;

export const getResource = async (uri: string) => {
    return await fetch(uri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) throw new Error('resource not found');
        return response.json()
    });
};

export const getDataset = async (datasetId: string) => {
    const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/datasets/${datasetId}`;
    console.log(uri);
    return getResource(uri);
};

export const getApi = async (apiId: string) => {
    const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/data-services/${apiId}`;
    return getResource(uri);
};
