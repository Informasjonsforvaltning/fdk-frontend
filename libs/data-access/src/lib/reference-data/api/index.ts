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
