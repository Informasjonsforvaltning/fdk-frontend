import type { LocaleCodes } from "@fdk-frontend/localization";

const { ORGANIZATION_CATALOG_BASE_URI } = process.env;

export type OrganizationPrefLabel = {
  nb?: string;
  nn?: string;
  en?: string;
};

export type Organization = {
  organizationId: string;
  orgPath: string;
  prefLabel: OrganizationPrefLabel;
};

const isOrganizationPrefLabel = (value: unknown): value is OrganizationPrefLabel => {
  if (!value || typeof value !== "object") return false;
  const prefLabel = value as OrganizationPrefLabel;
  return (
    (prefLabel.nb === undefined || typeof prefLabel.nb === "string") &&
    (prefLabel.nn === undefined || typeof prefLabel.nn === "string") &&
    (prefLabel.en === undefined || typeof prefLabel.en === "string")
  );
};

const isOrganization = (value: unknown): value is Organization => {
  if (!value || typeof value !== "object") return false;
  const organization = value as Organization;
  return (
    typeof organization.organizationId === "string" &&
    typeof organization.orgPath === "string" &&
    isOrganizationPrefLabel(organization.prefLabel)
  );
};

const parseOrganizationsResponse = (value: unknown): Organization[] => {
  if (!Array.isArray(value)) return [];
  return value.filter(isOrganization);
};

export const getOrganizationPrefLabel = (prefLabel: OrganizationPrefLabel, locale: LocaleCodes): string | undefined =>
  prefLabel[locale] ?? prefLabel.nb ?? prefLabel.en;

export const getOrganizations = async (): Promise<Organization[]> => {
  const response = await fetch(`${ORGANIZATION_CATALOG_BASE_URI}/organizations`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error("Failed to fetch organizations");

  return parseOrganizationsResponse(await response.json());
};
