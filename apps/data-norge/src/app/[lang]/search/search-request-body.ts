import { buildOrgPathSearchFilter } from "@fdk-frontend/ui/search-form/org-path";

type SearchPagination = {
  size: number;
  page: number;
};

export type SearchRequestBody = {
  pagination: SearchPagination;
  query?: string;
  filters?: NonNullable<ReturnType<typeof buildOrgPathSearchFilter>>;
};

export const buildSearchRequestBody = function (options: {
  query: string;
  orgPathParam: string | null;
  pagination: SearchPagination;
  includeQueryWhenEmpty?: boolean;
}): SearchRequestBody {
  const trimmedQuery = options.query.trim();
  const orgPathFilter = buildOrgPathSearchFilter(options.orgPathParam);
  const includeQuery = options.includeQueryWhenEmpty === true || trimmedQuery.length > 0;

  return {
    pagination: options.pagination,
    ...(includeQuery ? { query: trimmedQuery } : {}),
    ...(orgPathFilter ? { filters: orgPathFilter } : {}),
  };
};
