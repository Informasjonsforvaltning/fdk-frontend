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
