import { searchEntitiesByPath } from "@fdk-frontend/data-access/server";
import { SUMMARY_ENTITY_PATHS } from "@fdk-frontend/ui/search-tabs/search-tab-config";

import {
  buildSearchApiOptions,
  buildSearchSummaryResponse,
  createEmptySearchSummarySlice,
  normalizeSearchSummarySlice,
  type SearchSummaryResponse,
} from "../../../[lang]/search/search-summary";

export const POST = async function (request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const searchOptions = buildSearchApiOptions(body);

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
