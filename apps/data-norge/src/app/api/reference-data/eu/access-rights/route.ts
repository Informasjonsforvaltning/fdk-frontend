import { getAccessRights } from "@fdk-frontend/data-access/server";

export const GET = async function () {
  try {
    const accessRights = await getAccessRights();
    return Response.json(accessRights, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.warn("Access rights route error:", err);
    return Response.json({ accessRights: [] }, { status: 502, headers: { "Content-Type": "application/json" } });
  }
};
