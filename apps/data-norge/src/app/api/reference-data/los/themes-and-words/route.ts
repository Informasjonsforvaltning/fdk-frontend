import { getLosThemesAndWords } from "@fdk-frontend/data-access/server";

export const GET = async function () {
  try {
    const losThemesAndWords = await getLosThemesAndWords();
    return Response.json(losThemesAndWords, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.warn("LOS themes and words route error:", err);
    return Response.json({ losNodes: [] }, { status: 502, headers: { "Content-Type": "application/json" } });
  }
};
