"use client";

import { useEffect, useState } from "react";
import type { LocaleCodes } from "@fdk-frontend/localization";

import { type DataThemeLabelMap } from "./labels";

type DataThemeApiLabel = {
  en: string;
  nb: string;
  nn: string;
  no?: string;
};

type DataThemeApiEntry = {
  code: string;
  label: DataThemeApiLabel;
};

type DataThemesApiResponse = {
  dataThemes?: DataThemeApiEntry[];
};

const EMPTY_LABELS: DataThemeLabelMap = {};

const getLocalizedLabel = (label: DataThemeApiLabel, locale: LocaleCodes): string => label[locale] ?? label.en;

const buildLabelMap = (dataThemes: DataThemeApiEntry[], locale: LocaleCodes): DataThemeLabelMap =>
  Object.fromEntries(dataThemes.map(({ code, label }) => [code, getLocalizedLabel(label, locale)]));

let cachedPromise: Promise<DataThemesApiResponse> | undefined;

const fetchDataThemes = (): Promise<DataThemesApiResponse> => {
  if (!cachedPromise) {
    cachedPromise = fetch("/api/reference-data/eu/data-themes")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Failed to fetch data themes"))))
      .catch(() => ({ dataThemes: [] }));
  }
  return cachedPromise;
};

export const useDataThemeLabels = (locale: LocaleCodes): DataThemeLabelMap => {
  const [labels, setLabels] = useState<DataThemeLabelMap>(EMPTY_LABELS);

  useEffect(() => {
    let cancelled = false;

    fetchDataThemes().then((response) => {
      if (cancelled) return;
      const dataThemes = Array.isArray(response.dataThemes) ? response.dataThemes : [];
      setLabels(buildLabelMap(dataThemes, locale));
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return labels;
};
