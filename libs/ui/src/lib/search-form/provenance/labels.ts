export type ProvenanceFilterDictionary = {
  nasjonal: string;
  vedtak: string;
  bruker: string;
  tredjepart: string;
};

export const getProvenanceLabels = (dict: ProvenanceFilterDictionary): Record<string, string> => ({
  NASJONAL: dict.nasjonal,
  VEDTAK: dict.vedtak,
  BRUKER: dict.bruker,
  TREDJEPART: dict.tredjepart,
});

export const formatProvenanceLabel = (key: string, labels: Record<string, string>): string => labels[key] ?? key;

export const formatProvenanceCheckboxLabel = (key: string, count: number, labels: Record<string, string>): string =>
  `${formatProvenanceLabel(key, labels)} (${count})`;
