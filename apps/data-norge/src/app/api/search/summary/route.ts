import { searchEntitiesByPath } from "@fdk-frontend/data-access/server";
import { SUMMARY_ENTITY_PATHS } from "@fdk-frontend/ui/search-tabs/search-tab-config";

import {
  buildSearchSummaryResponse,
  createEmptySearchSummarySlice,
  normalizeSearchSummarySlice,
  SEARCH_SUMMARY_PAGE,
  SEARCH_SUMMARY_PAGE_SIZE,
  type SearchSummaryResponse,
} from "../../../[lang]/search/search-summary";

type SummarySearchOptions = {
  pagination: { size?: number; page?: number };
  query?: string;
  filters?: Record<string, unknown>;
};

const buildSummarySearchOptions = function (body: {
  pagination?: { size?: number; page?: number };
  query?: unknown;
  filters?: unknown;
}): SummarySearchOptions {
  const pagination = body.pagination ?? { size: SEARCH_SUMMARY_PAGE_SIZE, page: SEARCH_SUMMARY_PAGE };
  const query = typeof body.query === "string" ? body.query : undefined;
  const filters =
    body.filters && typeof body.filters === "object" ? (body.filters as Record<string, unknown>) : undefined;

  return {
    pagination: { ...pagination },
    ...(query !== undefined ? { query } : {}),
    ...(filters ? { filters } : {}),
  };
};

export const POST = async function (request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const searchOptions = buildSummarySearchOptions(body);

    const results = await Promise.all(
      SUMMARY_ENTITY_PATHS.map(async (path) => {
        try {
          return normalizeSearchSummarySlice(await searchEntitiesByPath(path, searchOptions));
        } catch (err) {
          console.warn(`Search summary failed for /search/${path}:`, err);
          return createEmptySearchSummarySlice();
        }
      }),
    );

    const response: SearchSummaryResponse = buildSearchSummaryResponse(results);

    return Response.json(response, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.warn("Search summary route error:", err);
    return Response.json(
      { error: "Search summary failed" },
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }
};
