import {
  type DataService,
  type DatasetWithIdentifier,
  type InformationModel,
  type PublicService,
} from "@fellesdatakatalog/types";
import { type WithRemovedFromFDKFlag } from "@fdk-frontend/types";

const { FDK_RESOURCE_SERVICE_BASE_URI } = process.env;

export const getResource = async <T>(uri: string): Promise<WithRemovedFromFDKFlag<T>> =>
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

export const getDataset = async (datasetId: string): Promise<WithRemovedFromFDKFlag<DatasetWithIdentifier>> => {
  const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/datasets/${datasetId}`;
  return getResource<DatasetWithIdentifier>(uri);
};

export const getApi = async (apiId: string): Promise<WithRemovedFromFDKFlag<DataService>> => {
  const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/data-services/${apiId}`;
  return getResource<DataService>(uri);
};

export const getApis = async (apiIds: string[]): Promise<WithRemovedFromFDKFlag<DataService>[]> => {
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
  return apis.filter((api): api is WithRemovedFromFDKFlag<DataService> => api !== null);
};

export const getService = async (serviceId: string): Promise<WithRemovedFromFDKFlag<PublicService>> => {
  const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/services/${serviceId}`;
  return getResource<PublicService>(uri);
};

export const getInformationModel = async (
  informationModelId: string,
): Promise<WithRemovedFromFDKFlag<InformationModel>> => {
  const uri = `${FDK_RESOURCE_SERVICE_BASE_URI}/information-models/${informationModelId}`;
  return getResource<InformationModel>(uri);
};
