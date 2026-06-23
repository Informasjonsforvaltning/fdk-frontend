"use client";

import { useEffect, useState } from "react";
import type { LocaleCodes } from "@fdk-frontend/localization";

import { type LosThemeLabelMap } from "./labels";

type LosThemeApiName = {
  en: string;
  nb: string;
  nn: string;
};

type LosThemeApiNode = {
  losPaths?: string[];
  name: LosThemeApiName;
};

type LosThemesAndWordsApiResponse = {
  losNodes?: LosThemeApiNode[];
};

const EMPTY_LABELS: LosThemeLabelMap = {};

const getLocalizedName = (name: LosThemeApiName, locale: LocaleCodes): string => name[locale] ?? name.en;

const buildLabelMap = (losNodes: LosThemeApiNode[], locale: LocaleCodes): LosThemeLabelMap => {
  const labels: Record<string, string> = {};

  for (const node of losNodes) {
    const losPaths = Array.isArray(node.losPaths) ? node.losPaths : [];
    const localizedName = getLocalizedName(node.name, locale);

    for (const losPath of losPaths) {
      labels[losPath] = localizedName;
    }
  }

  return labels;
};

let cachedPromise: Promise<LosThemesAndWordsApiResponse> | undefined;

const fetchLosThemesAndWords = (): Promise<LosThemesAndWordsApiResponse> => {
  if (!cachedPromise) {
    cachedPromise = fetch("/api/reference-data/los/themes-and-words")
      .then((response) =>
        response.ok ? response.json() : Promise.reject(new Error("Failed to fetch LOS themes and words")),
      )
      .catch(() => ({ losNodes: [] }));
  }
  return cachedPromise;
};

export const useLosThemeLabels = (locale: LocaleCodes): LosThemeLabelMap => {
  const [labels, setLabels] = useState<LosThemeLabelMap>(EMPTY_LABELS);

  useEffect(() => {
    let cancelled = false;

    fetchLosThemesAndWords().then((response) => {
      if (cancelled) return;
      const losNodes = Array.isArray(response.losNodes) ? response.losNodes : [];
      setLabels(buildLabelMap(losNodes, locale));
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return labels;
};
