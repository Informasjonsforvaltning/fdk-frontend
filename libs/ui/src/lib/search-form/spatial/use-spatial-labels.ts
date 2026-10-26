"use client";

import { useEffect, useMemo, useState } from "react";
import { LanguageCodes, type TextLanguage } from "@fellesdatakatalog/types";
import type { LocaleCodes } from "@fdk-frontend/localization";
import { printLocaleValue } from "@fdk-frontend/utils";

import { type SpatialLabelMap } from "./labels";

const EMPTY_LABELS: SpatialLabelMap = {};
const URI_SEPARATOR = "\n";

/** Keys present on reference-data label objects (sources may omit some languages). */
const LABEL_LANGUAGES = [LanguageCodes.nb, LanguageCodes.nn, LanguageCodes.no, LanguageCodes.en] as const;

const resolvedLabels = new Map<string, Partial<TextLanguage> | null>();
const pendingRequests = new Map<string, Promise<void>>();

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const parseTextLanguage = (value: Record<string, unknown>): Partial<TextLanguage> => {
  const label: Partial<TextLanguage> = {};
  for (const language of LABEL_LANGUAGES) {
    const text = value[language];
    if (typeof text === "string") label[language] = text;
  }
  return label;
};

const parseLabelsResponse = (value: unknown): Record<string, Partial<TextLanguage>> => {
  if (!isRecord(value) || !isRecord(value.labels)) return {};
  const labels: Record<string, Partial<TextLanguage>> = {};
  for (const [uri, label] of Object.entries(value.labels)) {
    if (isRecord(label)) labels[uri] = parseTextLanguage(label);
  }
  return labels;
};

const buildLabelMap = (locale: LocaleCodes): SpatialLabelMap => {
  const labels: Record<string, string> = {};
  for (const [uri, label] of resolvedLabels) {
    const localized = label ? printLocaleValue(locale, label) : undefined;
    if (localized) labels[uri] = localized;
  }
  return labels;
};

const loadLabels = (uris: string[]): Promise<void> => {
  const missing = uris.filter((uri) => !resolvedLabels.has(uri) && !pendingRequests.has(uri));

  if (missing.length > 0) {
    const request = fetch("/api/reference-data/spatial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uris: missing }),
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(new Error("Failed to fetch spatial labels")),
      )
      .then((value) => {
        const labels = parseLabelsResponse(value);
        for (const uri of missing) {
          resolvedLabels.set(uri, labels[uri] ?? null);
        }
      })
      .catch(() => {
        // Leave unresolved so a later effect can retry.
      })
      .finally(() => {
        for (const uri of missing) pendingRequests.delete(uri);
      });

    for (const uri of missing) pendingRequests.set(uri, request);
  }

  return Promise.all(uris.map((uri) => pendingRequests.get(uri))).then(() => undefined);
};

export const useSpatialLabels = (uris: string[], locale: LocaleCodes): SpatialLabelMap => {
  const [labels, setLabels] = useState<SpatialLabelMap>(EMPTY_LABELS);
  const urisKey = useMemo(() => Array.from(new Set(uris)).sort().join(URI_SEPARATOR), [uris]);

  useEffect(() => {
    let cancelled = false;

    loadLabels(urisKey ? urisKey.split(URI_SEPARATOR) : []).then(() => {
      if (!cancelled) setLabels(buildLabelMap(locale));
    });

    return () => {
      cancelled = true;
    };
  }, [urisKey, locale]);

  return labels;
};
