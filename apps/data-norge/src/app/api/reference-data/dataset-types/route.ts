import { getDatasetTypes } from "@fdk-frontend/data-access/server";

export const GET = async function () {
  try {
    const datasetTypes = await getDatasetTypes();
    return Response.json(datasetTypes, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.warn("Dataset types route error:", err);
    return Response.json({ datasetTypes: [] }, { status: 502, headers: { "Content-Type": "application/json" } });
  }
};
