"use client";

import { useEffect, useState } from "react";
import type { LocaleCodes } from "@fdk-frontend/localization";

export type AccessRightsLabelMap = Partial<Record<string, string>>;

type AccessRightApiEntry = {
  code: string;
  label: Partial<Record<string, string>>;
};

const EMPTY_LABELS: AccessRightsLabelMap = {};

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const parseEntries = (value: unknown): AccessRightApiEntry[] => {
  if (!isRecord(value) || !Array.isArray(value.accessRights)) return [];
  return value.accessRights.flatMap((entry: unknown) =>
    isRecord(entry) && typeof entry.code === "string" && isRecord(entry.label)
      ? [
          {
            code: entry.code,
            label: Object.fromEntries(
              Object.entries(entry.label).filter((pair): pair is [string, string] => typeof pair[1] === "string"),
            ),
          },
        ]
      : [],
  );
};

const capitalize = (text: string): string => text.charAt(0).toLocaleUpperCase() + text.slice(1);

const buildLabelMap = (entries: AccessRightApiEntry[], locale: LocaleCodes): AccessRightsLabelMap =>
  Object.fromEntries(
    entries.flatMap(({ code, label }) => {
      const text = label[locale];
      return text ? [[code, capitalize(text)]] : [];
    }),
  );

let cachedPromise: Promise<AccessRightApiEntry[]> | undefined;

const fetchAccessRights = (): Promise<AccessRightApiEntry[]> => {
  if (!cachedPromise) {
    cachedPromise = fetch("/api/reference-data/eu/access-rights")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Failed to fetch access rights"))))
      .then(parseEntries)
      .catch(() => []);
  }
  return cachedPromise;
};

export const useAccessRightsLabels = (locale: LocaleCodes): AccessRightsLabelMap => {
  const [labels, setLabels] = useState<AccessRightsLabelMap>(EMPTY_LABELS);

  useEffect(() => {
    let cancelled = false;

    fetchAccessRights().then((entries) => {
      if (!cancelled) setLabels(buildLabelMap(entries, locale));
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return labels;
};
