import { getOrganizations } from "@fdk-frontend/data-access/server";

export const GET = async function () {
  try {
    const organizations = await getOrganizations();
    return Response.json(organizations, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.warn("Organizations route error:", err);
    return Response.json([], {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};
