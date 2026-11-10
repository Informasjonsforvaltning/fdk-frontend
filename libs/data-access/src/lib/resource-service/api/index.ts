import {
  type DataService,
  type DatasetWithIdentifier,
  type InformationModel,
  type PublicService,
} from "@fellesdatakatalog/types";

const { FDK_RESOURCE_SERVICE_BASE_URI } = process.env;

export const getResource = async <T>(uri: string): Promise<T> =>
  fetch(uri, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) throw new Error("resource not found");
    return response.json();
  });

export const getDataset = async (datasetId: string): Promise<DatasetWithIdentifier> => {
  const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/datasets/${datasetId}`;
  return getResource<DatasetWithIdentifier>(uri);
};

export const getApi = async (apiId: string): Promise<DataService> => {
  const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/data-services/${apiId}`;
  return getResource<DataService>(uri);
};

export const getApis = async (apiIds: string[]): Promise<DataService[]> => {
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
  return apis.filter((api): api is DataService => api !== null);
};

export const getService = async (serviceId: string): Promise<PublicService> => {
  const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/services/${serviceId}`;
  return getResource<PublicService>(uri);
};

export const getInformationModel = async (informationModelId: string): Promise<InformationModel> => {
  const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/information-models/${informationModelId}`;
  return getResource<InformationModel>(uri);
};
