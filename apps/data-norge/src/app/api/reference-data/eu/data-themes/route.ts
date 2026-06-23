import { getDataThemes } from "@fdk-frontend/data-access/server";

export const GET = async function () {
  try {
    const dataThemes = await getDataThemes();
    return Response.json(dataThemes, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.warn("Data themes route error:", err);
    return Response.json({ dataThemes: [] }, { status: 502, headers: { "Content-Type": "application/json" } });
  }
};
