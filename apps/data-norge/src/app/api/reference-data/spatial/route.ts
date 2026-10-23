import type { TextLanguage } from "@fellesdatakatalog/types";
import { findReferenceDataByUris, type ReferenceDataSearchAlternative } from "@fdk-frontend/data-access/server";

const SPATIAL_TYPES: ReferenceDataSearchAlternative[] = ["ADMINISTRATIVE_ENHETER", "EU_LOCATIONS", "GEONAMES"];
const MAX_URIS = 500;

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const parseUris = (body: unknown): string[] => {
  if (!isRecord(body)) return [];
  const uris = body.uris;
  if (!Array.isArray(uris)) return [];
  return Array.from(new Set(uris.filter((uri): uri is string => typeof uri === "string" && uri.length > 0))).slice(
    0,
    MAX_URIS,
  );
};

export const POST = async function (request: Request) {
  try {
    const uris = parseUris(await request.json().catch(() => undefined));
    const hits = await findReferenceDataByUris(uris, SPATIAL_TYPES);

    const labelsByUri = new Map(hits.map((hit) => [hit.uri, hit.label]));
    const labels: Record<string, Partial<TextLanguage>> = {};
    for (const uri of uris) {
      const label = labelsByUri.get(uri);
      if (label) labels[uri] = label;
    }

    return Response.json({ labels }, { status: 200 });
  } catch (err) {
    console.warn("Spatial reference data route error:", err);
    return Response.json({ error: "Failed to resolve spatial labels" }, { status: 502 });
  }
};
