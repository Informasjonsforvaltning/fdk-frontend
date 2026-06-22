export type MockFilterOption = {
  label: string;
  value: string;
};

export const MOCK_TEMA_OPTIONS: MockFilterOption[] = [
  { label: "Næring (182)", value: "naring" },
  { label: "Natur, klima og miljø (169)", value: "natur-klima-miljo" },
  { label: "Helse og omsorg (125)", value: "helse-omsorg" },
  { label: "Trafikk og transport (100)", value: "trafikk-transport" },
  { label: "Bygg og eiendom (99)", value: "bygg-eiendom" },
  { label: "Familie og barn (98)", value: "familie-barn" },
  { label: "Skatt og avgift (32)", value: "skatt-avgift" },
  { label: "Skole og utdanning (28)", value: "skole-utdanning" },
  { label: "Arbeid (24)", value: "arbeid" },
  { label: "Demokrati og innbyggerrettigheter (18)", value: "demokrati-innbyggerrettigheter" },
  { label: "Kultur, idrett og fritid (13)", value: "kultur-idrett-fritid" },
  { label: "Lov og rett (8)", value: "lov-rett" },
  { label: "Sosiale tjenester (8)", value: "sosiale-tjenester" },
  { label: "Samfunnssikkerhet og beredskap (6)", value: "samfunnssikkerhet-beredskap" },
];

export const MOCK_EU_TEMA_OPTIONS: MockFilterOption[] = [
  { label: "[EU] Regioner og byer (6695)", value: "regioner-byer" },
  { label: "[EU] Miljø (763)", value: "miljo" },
  { label: "[EU] Forvaltning og offentlig sektor (524)", value: "forvaltning-offentlig-sektor" },
  { label: "[EU] Befolkning og samfunn (407)", value: "befolkning-samfunn" },
  { label: "[EU] Jordbruk, fiskeri, skogbruk og mat (364)", value: "jordbruk-fiskeri-skogbruk-mat" },
  { label: "[EU] Utdanning, kultur og sport (204)", value: "utdanning-kultur-sport" },
  { label: "[EU] Transport (159)", value: "transport" },
  { label: "[EU] Helse (143)", value: "helse" },
  { label: "[EU] Vitenskap og teknologi (121)", value: "vitenskap-teknologi" },
  { label: "[EU] Justis, rettssystem og allmenn sikkerhet (111)", value: "justis-rettssystem-sikkerhet" },
  { label: "[EU] Økonomi og finans (102)", value: "okonomi-finans" },
  { label: "[EU] Energi (71)", value: "energi" },
  { label: "[EU] Internasjonale temaer (25)", value: "internasjonale-temaer" },
];

export const MOCK_TEMA_FILTER_OPTIONS: MockFilterOption[] = [...MOCK_TEMA_OPTIONS, ...MOCK_EU_TEMA_OPTIONS];
