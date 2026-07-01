import { searchEntitiesByPath } from "@fdk-frontend/data-access/server";

import {
  buildSearchApiOptions,
  createEmptySearchSummarySlice,
  normalizeSearchSummarySlice,
} from "../../../[lang]/search/search-summary";

export const POST = async function (request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path : undefined;

    if (!path) {
      return Response.json({ error: "Missing path" }, { status: 400 });
    }

    const searchOptions = buildSearchApiOptions(body);
    const result = normalizeSearchSummarySlice(await searchEntitiesByPath(path, searchOptions));

    return Response.json(result);
  } catch (err) {
    console.warn(`Search entity route error:`, err);
    return Response.json(createEmptySearchSummarySlice(), { status: 502 });
  }
};
