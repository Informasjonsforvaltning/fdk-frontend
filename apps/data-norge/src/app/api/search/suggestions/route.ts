import { getSearchSuggestions } from "@fdk-frontend/data-access/server";
import { SEARCH_TAB_PATH_SEGMENTS } from "@fdk-frontend/ui/search-tabs/search-tab-config";
import { getProfile } from "@fdk-frontend/utils/server";

/** Search-service profile filter; scopes suggestions to the transportportal tag. */
const TRANSPORT_SEARCH_PROFILE = "TRANSPORT";

const VALID_ENTITY_PATHS = new Set<string>(SEARCH_TAB_PATH_SEGMENTS.filter((segment) => segment !== "docs"));

const emptyResponse = () =>
  Response.json({ suggestions: [] }, { status: 200, headers: { "Content-Type": "application/json" } });

export const GET = async function (request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  if (!query.trim()) return emptyResponse();

  const entityPathParam = searchParams.get("entityPath");
  const entityPath = entityPathParam && VALID_ENTITY_PATHS.has(entityPathParam) ? entityPathParam : undefined;

  try {
    const isTransportportal = (await getProfile()) === "transportportal";
    const profile = isTransportportal ? TRANSPORT_SEARCH_PROFILE : undefined;
    const result = await getSearchSuggestions(query, entityPath, profile);
    return Response.json(result, { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.warn("suggestions proxy error:", err);
    return Response.json({ suggestions: [] }, { status: 502, headers: { "Content-Type": "application/json" } });
  }
};
