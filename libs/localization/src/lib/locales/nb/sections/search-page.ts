const searchPage = {
  metadata: {
    title: "Søk",
    description: "Søk etter data på data.norge.no",
  },
  breadcrumb: {
    label: "Søk",
    labelWithQuery: 'Søk etter "{{query}}"',
  },
  heading: {
    label: "Søk",
    queryPrefix: "Søk etter",
  },
  entitySearch: {
    hitsCountLabel: "({{count}} treff)",
    noResults: "Ingen treff",
  },
  docs: {
    noResults: "Ingen treff i dokumentasjon",
    noContent: "Ingen dokumentasjon funnet.",
  },
  pagination: {
    previous: "Forrige",
    next: "Neste",
    pageAriaLabel: "Side {{page}}",
  },
  searchInput: {
    label: "Søk",
    placeholder: "Hva leter du etter?",
    seeAllResults: "Se alle treff",
    dataCatalogs: "Datakataloger",
    aiSearch: "KI-søk",
  },
  searchSuggestions: {
    heading: "Søkeforslag",
  },
  searchHistory: {
    heading: "Tidligere søk",
    clear: "Tøm historikk",
    delete: "Slett søket {{query}}",
  },
  searchSets: {
    loadingBadgeAriaLabel: "Laster antall treff",
    ariaLabel: "velg søketype",
    navAriaLabel: "velg sett av resultater",
    "all-catalogs": "Alle datakataloger",
    ai: "KI",
    datasets: "Datasett",
    "data-services": "API",
    concepts: "Begrep",
    "information-models": "Informasjonsmodeller",
    "services-and-events": "Tjenester og hendelser",
    docs: "Dokumentasjon",
  },
  searchForm: {
    filters: {
      organisation: "Virksomhet",
      theme: "Tema",
      accessLevel: "Tilgangsnivå",
      format: "Data-format",
      geography: "Geografi",
      provenance: "Opphav",
      dcatProfile: "Spesifikasjon",
    },
    clearAllFilters: "Tøm alle filtre",
    resultsPerPage: "{{count}} treff per side",
    sort: {
      relevance: "Mest relevant",
      newest: "Nyeste først",
      oldest: "Eldste først",
    },
    themeFilter: {
      tema: "Tema",
      euTema: "EU-tema",
    },
    formatFilter: {
      mediaFormat: "Medieformat",
      fileType: "Filtype",
    },
    accessFilter: {
      open: "Åpne data",
      public: "Allmenn tilgang",
      restricted: "Begrenset tilgang",
      nonPublic: "Ikke-allmenn tilgang",
      unknown: "Ukjent tilgang",
    },
    provenanceFilter: {
      nasjonal: "Nasjonal",
      vedtak: "Vedtak",
      bruker: "Bruker",
      tredjepart: "Tredjepart",
    },
    dcatProfileFilter: {
      mobilityDcatAp: "MobilityDCAT-AP",
      hvdDcatApNo: "HVD",
      dcatApNo: "DCAT-AP-NO",
    },
    orgTypeFilter: {
      kommune: "Kommune",
      stat: "Stat",
      privat: "Privat",
      annet: "Annet",
      fylke: "Fylke",
      unknown: "Ukjent",
    },
  },
  aiPromoSplash: {
    introHighlight: "KI-søket",
    intro:
      "bruker metadata fra data.norge.no og hjelper deg med å finne det du leter etter i alle våre datakataloger. Ved å bruke naturlig språk kan du søke fritt uten å måtte kjenne til spesifikke datasettnavn, fagtermer eller tekniske formater.",
    suggestionsLegend: "Prøv f.eks. en av disse:",
  },
};

export default searchPage;
