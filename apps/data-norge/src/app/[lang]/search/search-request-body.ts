import { buildAccessSearchFilter } from "@fdk-frontend/ui/search-form/access";
import { buildOrgPathSearchFilter } from "@fdk-frontend/ui/search-form/org-path";

type SearchPagination = {
  size: number;
  page: number;
};

export type SearchFilters = Partial<NonNullable<ReturnType<typeof buildOrgPathSearchFilter>>> &
  Partial<NonNullable<ReturnType<typeof buildAccessSearchFilter>>>;

export type SearchRequestBody = {
  pagination: SearchPagination;
  query?: string;
  filters?: SearchFilters;
};

export const buildSearchFilters = function (
  orgPathParam: string | null,
  accessParam: string | null,
): SearchFilters | undefined {
  const orgPathFilter = buildOrgPathSearchFilter(orgPathParam);
  const accessFilter = buildAccessSearchFilter(accessParam);

  if (!orgPathFilter && !accessFilter) return undefined;

  return {
    ...orgPathFilter,
    ...accessFilter,
  };
};

export const buildSearchRequestBody = function (options: {
  query: string;
  orgPathParam: string | null;
  accessParam: string | null;
  pagination: SearchPagination;
  includeQueryWhenEmpty?: boolean;
}): SearchRequestBody {
  const trimmedQuery = options.query.trim();
  const filters = buildSearchFilters(options.orgPathParam, options.accessParam);
  const includeQuery = options.includeQueryWhenEmpty === true || trimmedQuery.length > 0;

  return {
    pagination: options.pagination,
    ...(includeQuery ? { query: trimmedQuery } : {}),
    ...(filters ? { filters } : {}),
  };
};
