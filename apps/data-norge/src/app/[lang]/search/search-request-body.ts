import { buildAccessSearchFilter } from "@fdk-frontend/ui/search-form/access";
import { buildOrgPathSearchFilter } from "@fdk-frontend/ui/search-form/org-path";
import { buildProvenanceSearchFilter } from "@fdk-frontend/ui/search-form/provenance";
import { buildSpatialSearchFilter } from "@fdk-frontend/ui/search-form/spatial";

type SearchPagination = {
  size: number;
  page: number;
};

export type SearchFilters = Partial<NonNullable<ReturnType<typeof buildOrgPathSearchFilter>>> &
  Partial<NonNullable<ReturnType<typeof buildAccessSearchFilter>>> &
  Partial<NonNullable<ReturnType<typeof buildProvenanceSearchFilter>>> &
  Partial<NonNullable<ReturnType<typeof buildSpatialSearchFilter>>>;

export type SearchRequestBody = {
  pagination: SearchPagination;
  query?: string;
  filters?: SearchFilters;
};

export const buildSearchFilters = function (
  orgPathParam: string | null,
  accessParam: string | null,
  provenanceParam: string | null,
  spatialParam: string | null,
): SearchFilters | undefined {
  const orgPathFilter = buildOrgPathSearchFilter(orgPathParam);
  const accessFilter = buildAccessSearchFilter(accessParam);
  const provenanceFilter = buildProvenanceSearchFilter(provenanceParam);
  const spatialFilter = buildSpatialSearchFilter(spatialParam);

  if (!orgPathFilter && !accessFilter && !provenanceFilter && !spatialFilter) return undefined;

  return {
    ...orgPathFilter,
    ...accessFilter,
    ...provenanceFilter,
    ...spatialFilter,
  };
};

export const buildSearchRequestBody = function (options: {
  query: string;
  orgPathParam: string | null;
  accessParam: string | null;
  provenanceParam: string | null;
  spatialParam: string | null;
  pagination: SearchPagination;
  includeQueryWhenEmpty?: boolean;
}): SearchRequestBody {
  const trimmedQuery = options.query.trim();
  const filters = buildSearchFilters(
    options.orgPathParam,
    options.accessParam,
    options.provenanceParam,
    options.spatialParam,
  );
  const includeQuery = options.includeQueryWhenEmpty === true || trimmedQuery.length > 0;

  return {
    pagination: options.pagination,
    ...(includeQuery ? { query: trimmedQuery } : {}),
    ...(filters ? { filters } : {}),
  };
};
