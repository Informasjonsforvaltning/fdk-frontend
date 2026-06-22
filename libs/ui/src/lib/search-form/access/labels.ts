import { OPEN_DATA_AGGREGATION_KEY } from "./types";

const ACCESS_RIGHTS_LABELS: Record<string, string> = {
  [OPEN_DATA_AGGREGATION_KEY]: "Åpne data",
  PUBLIC: "Allmenn tilgang",
  RESTRICTED: "Begrenset tilgang",
  NON_PUBLIC: "Ikke-allmenn tilgang",
  null: "Ukjent tilgang",
};

export const formatAccessLabel = (key: string): string => ACCESS_RIGHTS_LABELS[key] ?? key;

export const formatAccessCheckboxLabel = (key: string, count: number): string => `${formatAccessLabel(key)} (${count})`;
