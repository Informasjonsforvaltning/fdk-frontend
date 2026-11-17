"use client";

import { useEffect, useState } from "react";
import { type LocaleCodes } from "@fdk-frontend/localization";

type DatasetTypeApiEntry = {
  uri: string;
  label: Partial<Record<LocaleCodes, string>>;
};

type DatasetTypesApiResponse = {
  datasetTypes?: DatasetTypeApiEntry[];
};

let cachedPromise: Promise<DatasetTypesApiResponse> | undefined;

const fetchDatasetTypes = (): Promise<DatasetTypesApiResponse> => {
  if (!cachedPromise) {
    cachedPromise = fetch("/api/reference-data/dataset-types")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Failed to fetch dataset types"))))
      .catch(() => ({ datasetTypes: [] }));
  }
  return cachedPromise;
};

const buildLabelMap = (datasetTypes: DatasetTypeApiEntry[], locale: LocaleCodes): Record<string, string> =>
  Object.fromEntries(
    datasetTypes.flatMap(({ uri, label }) => {
      const text = label[locale] ?? label.nb ?? label.en;
      return text ? [[uri, text]] : [];
    }),
  );

export const useDatasetTypeLabels = (locale: LocaleCodes): Record<string, string> => {
  const [labels, setLabels] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    fetchDatasetTypes().then((response) => {
      if (cancelled) return;
      const datasetTypes = Array.isArray(response.datasetTypes) ? response.datasetTypes : [];
      setLabels(buildLabelMap(datasetTypes, locale));
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return labels;
};
