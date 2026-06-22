const PROVENANCE_LABELS: Record<string, string> = {
  NASJONAL: "Nasjonal",
  VEDTAK: "Vedtak",
  BRUKER: "Bruker",
  TREDJEPART: "Tredjepart",
};

export const formatProvenanceLabel = (key: string): string => PROVENANCE_LABELS[key] ?? key;

export const formatProvenanceCheckboxLabel = (key: string, count: number): string =>
  `${formatProvenanceLabel(key)} (${count})`;
