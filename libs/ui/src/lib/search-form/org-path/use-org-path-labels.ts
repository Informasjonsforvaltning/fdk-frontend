"use client";

import { useEffect, useState } from "react";
import type { LocaleCodes } from "@fdk-frontend/localization";

import { type OrgPathLabelMap } from "./labels";

type OrganizationPrefLabel = {
  nb?: string;
  nn?: string;
  en?: string;
};

type OrganizationApiEntry = {
  organizationId: string;
  orgPath: string;
  prefLabel: OrganizationPrefLabel;
};

const EMPTY_LABELS: OrgPathLabelMap = {};

const getLocalizedPrefLabel = (prefLabel: OrganizationPrefLabel, locale: LocaleCodes): string | undefined =>
  prefLabel[locale] ?? prefLabel.nb ?? prefLabel.en;

const buildLabelMap = (organizations: OrganizationApiEntry[], locale: LocaleCodes): OrgPathLabelMap => {
  const labels: Record<string, string> = {};

  for (const organization of organizations) {
    const label = getLocalizedPrefLabel(organization.prefLabel, locale);
    if (!label) continue;

    labels[organization.orgPath] = label;
    labels[organization.organizationId] = label;
  }

  return labels;
};

let cachedPromise: Promise<OrganizationApiEntry[]> | undefined;

const fetchOrganizations = (): Promise<OrganizationApiEntry[]> => {
  if (!cachedPromise) {
    cachedPromise = fetch("/api/organization-catalog/organizations")
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Failed to fetch organizations"))))
      .catch(() => []);
  }
  return cachedPromise;
};

export const useOrgPathLabels = (locale: LocaleCodes): OrgPathLabelMap => {
  const [labels, setLabels] = useState<OrgPathLabelMap>(EMPTY_LABELS);

  useEffect(() => {
    let cancelled = false;

    fetchOrganizations().then((organizations) => {
      if (cancelled) return;
      const entries = Array.isArray(organizations) ? organizations : [];
      setLabels(buildLabelMap(entries, locale));
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return labels;
};
