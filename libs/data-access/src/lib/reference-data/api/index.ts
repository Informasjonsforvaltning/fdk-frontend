import { LanguageCodes, type TextLanguage } from "@fellesdatakatalog/types";

const { FDK_BASE_URI } = process.env;

export type DataThemeLabel = {
  en: string;
  nb: string;
  nn: string;
  no: string;
};

export type DataTheme = {
  uri: string;
  code: string;
  label: DataThemeLabel;
};

export type DataThemesResponse = {
  dataThemes: DataTheme[];
};

export type LosThemeLocalizedName = {
  en: string;
  nb: string;
  nn: string;
};

export type LosThemeNode = {
  losPaths: string[];
  name: LosThemeLocalizedName;
};

export type LosThemesAndWordsResponse = {
  losNodes: LosThemeNode[];
};

const isDataThemeLabel = (value: unknown): value is DataThemeLabel => {
  if (!value || typeof value !== "object") return false;
  const label = value as DataThemeLabel;
  return typeof label.en === "string" && typeof label.nb === "string" && typeof label.nn === "string";
};

const isDataTheme = (value: unknown): value is DataTheme => {
  if (!value || typeof value !== "object") return false;
  const theme = value as DataTheme;
  return typeof theme.code === "string" && isDataThemeLabel(theme.label);
};

const parseDataThemesResponse = (value: unknown): DataThemesResponse => {
  if (!value || typeof value !== "object") return { dataThemes: [] };
  const candidate = value as DataThemesResponse;
  if (!Array.isArray(candidate.dataThemes)) return { dataThemes: [] };

  return {
    dataThemes: candidate.dataThemes.filter(isDataTheme),
  };
};

const isLosThemeLocalizedName = (value: unknown): value is LosThemeLocalizedName => {
  if (!value || typeof value !== "object") return false;
  const name = value as LosThemeLocalizedName;
  return typeof name.en === "string" && typeof name.nb === "string" && typeof name.nn === "string";
};

const isLosThemeNode = (value: unknown): value is LosThemeNode => {
  if (!value || typeof value !== "object") return false;
  const node = value as LosThemeNode;
  return (
    Array.isArray(node.losPaths) &&
    node.losPaths.every((path) => typeof path === "string") &&
    isLosThemeLocalizedName(node.name)
  );
};

const parseLosThemesAndWordsResponse = (value: unknown): LosThemesAndWordsResponse => {
  if (!value || typeof value !== "object") return { losNodes: [] };
  const candidate = value as LosThemesAndWordsResponse;
  if (!Array.isArray(candidate.losNodes)) return { losNodes: [] };

  return {
    losNodes: candidate.losNodes.filter(isLosThemeNode),
  };
};

export type ReferenceDataSearchAlternative =
  | "ADMINISTRATIVE_ENHETER"
  | "EU_FILE_TYPES"
  | "EU_LANGUAGES"
  | "EU_LOCATIONS"
  | "GEONAMES"
  | "IANA_MEDIA_TYPES";

export type ReferenceDataSearchHit = {
  uri: string;
  code?: string;
  type?: string;
  label: Partial<TextLanguage>;
};

const FIND_BY_URIS_QUERY = `query FindByURIs($req: FindByURIsRequest!) {
  findByURIs(req: $req) {
    uri
    code
    type
    label { nb nn no en }
  }
}`;

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const LABEL_LANGUAGES = [LanguageCodes.nb, LanguageCodes.nn, LanguageCodes.no, LanguageCodes.en] as const;

/** GraphQL returns `null` for languages a reference data source does not provide. */
const parseTextLanguage = (value: unknown): Partial<TextLanguage> => {
  if (!isRecord(value)) return {};
  const label: Partial<TextLanguage> = {};
  for (const language of LABEL_LANGUAGES) {
    const text = value[language];
    if (typeof text === "string") label[language] = text;
  }
  return label;
};

const parseSearchHit = (value: unknown): ReferenceDataSearchHit | undefined => {
  if (!isRecord(value) || typeof value.uri !== "string") return undefined;
  return {
    uri: value.uri,
    code: typeof value.code === "string" ? value.code : undefined,
    type: typeof value.type === "string" ? value.type : undefined,
    label: parseTextLanguage(value.label),
  };
};

const parseFindByUrisHits = (hits: unknown[]): ReferenceDataSearchHit[] =>
  hits.flatMap((hit) => parseSearchHit(hit) ?? []);

export const findReferenceDataByUris = async (
  uris: string[],
  types: ReferenceDataSearchAlternative[],
): Promise<ReferenceDataSearchHit[]> => {
  if (uris.length === 0 || types.length === 0) return [];

  const response = await fetch(`${FDK_BASE_URI}/reference-data/graphql`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: FIND_BY_URIS_QUERY, variables: { req: { uris, types } } }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to find reference data by URIs");

  const payload: unknown = await response.json();
  if (!isRecord(payload)) throw new Error("Failed to find reference data by URIs");

  const errors = payload.errors;
  if (Array.isArray(errors) && errors.length > 0) {
    throw new Error("Failed to find reference data by URIs");
  }

  if (!isRecord(payload.data) || !Array.isArray(payload.data.findByURIs)) {
    throw new Error("Failed to find reference data by URIs");
  }

  return parseFindByUrisHits(payload.data.findByURIs);
};

export const getDataThemes = async (): Promise<DataThemesResponse> => {
  const response = await fetch(`${FDK_BASE_URI}/reference-data/eu/data-themes`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error("Failed to fetch data themes");

  return parseDataThemesResponse(await response.json());
};

export const getLosThemesAndWords = async (): Promise<LosThemesAndWordsResponse> => {
  const response = await fetch(`${FDK_BASE_URI}/reference-data/los/themes-and-words`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error("Failed to fetch LOS themes and words");

  return parseLosThemesAndWordsResponse(await response.json());
};
