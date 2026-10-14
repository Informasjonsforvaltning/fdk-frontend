import { searchAllEntities } from "@fdk-frontend/data-access/server";
import { getProfile } from "@fdk-frontend/utils/server";

import {
  buildSearchApiOptions,
  normalizeSearchSummarySlice,
  TRANSPORT_SEARCH_PROFILE,
} from "../../../[lang]/search/search-summary";

export const POST = async function (request: Request) {
  try {
    const body = await request.json();
    const isTransportportal = (await getProfile()) === "transportportal";
    const searchOptions = {
      ...buildSearchApiOptions(body),
      ...(isTransportportal ? { profile: TRANSPORT_SEARCH_PROFILE } : {}),
    };
    const result = normalizeSearchSummarySlice(await searchAllEntities(searchOptions));
    return Response.json(result, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.warn("Search entities proxy error:", err);
    return Response.json({ error: "Search failed" }, { status: 502, headers: { "Content-Type": "application/json" } });
  }
};
