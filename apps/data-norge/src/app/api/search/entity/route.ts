import { searchEntitiesByPath } from "@fdk-frontend/data-access/server";
import { isSearchSortBody } from "@fdk-frontend/ui/search-form/sort";

import {
  createEmptySearchSummarySlice,
  normalizeSearchSummarySlice,
  SEARCH_SUMMARY_PAGE,
  SEARCH_SUMMARY_PAGE_SIZE,
} from "../../../[lang]/search/search-summary";

const buildEntitySearchOptions = function (body: {
  pagination?: { size?: number; page?: number };
  query?: unknown;
  filters?: unknown;
  sort?: unknown;
}) {
  const pagination = body.pagination ?? { size: SEARCH_SUMMARY_PAGE_SIZE, page: SEARCH_SUMMARY_PAGE };
  const query = typeof body.query === "string" ? body.query : undefined;
  const filters =
    body.filters && typeof body.filters === "object" ? (body.filters as Record<string, unknown>) : undefined;
  const sort = isSearchSortBody(body.sort) ? body.sort : undefined;

  return {
    pagination: { ...pagination },
    ...(query !== undefined ? { query } : {}),
    ...(filters ? { filters } : {}),
    ...(sort ? { sort } : {}),
  };
};

export const POST = async function (request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path : undefined;

    if (!path) {
      return Response.json({ error: "Missing path" }, { status: 400 });
    }

    const searchOptions = buildEntitySearchOptions(body);
    const result = normalizeSearchSummarySlice(await searchEntitiesByPath(path, searchOptions));

    return Response.json(result);
  } catch (err) {
    console.warn(`Search entity route error:`, err);
    return Response.json(createEmptySearchSummarySlice(), { status: 502 });
  }
};
