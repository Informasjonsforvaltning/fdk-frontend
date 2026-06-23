export type DataThemeLabelMap = Readonly<Record<string, string>>;

export const formatDataThemeLabel = (code: string, labels: DataThemeLabelMap): string => labels[code] ?? code;

export const formatDataThemeCheckboxLabel = (code: string, count: number, labels: DataThemeLabelMap): string => {
  const label = formatDataThemeLabel(code, labels);
  return `${label} (${count})`;
};
