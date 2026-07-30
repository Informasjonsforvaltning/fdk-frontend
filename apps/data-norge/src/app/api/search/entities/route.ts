import { searchAllEntities } from "@fdk-frontend/data-access/server";

export const POST = async function (request: Request) {
  try {
    const body = await request.json();
    // Only forward known fields (spreading ...body let clients inject arbitrary params).
    const result = await searchAllEntities({
      query: typeof body?.query === "string" ? body.query.slice(0, 512) : undefined,
      pagination: body?.pagination ?? { size: 20, page: 0 },
      filters: body?.filters,
      sort: body?.sort,
    });
    return Response.json(result, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.warn("Search entities proxy error:", err);
    return Response.json({ error: "Search failed" }, { status: 502, headers: { "Content-Type": "application/json" } });
  }
};
