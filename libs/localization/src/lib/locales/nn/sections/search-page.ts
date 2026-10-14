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
    noContent: "Ingen dokumentasjon funne.",
  },
  pagination: {
    previous: "Førre",
    next: "Neste",
    pageAriaLabel: "Side {{page}}",
  },
  searchInput: {
    label: "Søk",
    placeholder: "Kva leitar du etter?",
    seeAllResults: "Sjå alle treff",
    dataCatalogs: "Datakatalogar",
    aiSearch: "KI-søk",
  },
  searchSuggestions: {
    heading: "Søkeforslag",
  },
  searchHistory: {
    heading: "Tidlegare søk",
    clear: "Tøm historikk",
    delete: "Slett søket {{query}}",
  },
  searchSets: {
    loadingBadgeAriaLabel: "Lastar antal treff",
    ariaLabel: "vel søkjetype",
    navAriaLabel: "vel sett av resultat",
    "all-catalogs": "Alle datakatalogar",
    ai: "KI",
    datasets: "Datasett",
    "data-services": "API",
    concepts: "Omgrep",
    "information-models": "Informasjonsmodellar",
    "services-and-events": "Tenester og hendingar",
    docs: "Dokumentasjon",
  },
  searchForm: {
    filters: {
      organisation: "Verksemd",
      theme: "Tema",
      accessLevel: "Tilgangsnivå",
      format: "Dataformat",
      geography: "Geografi",
      provenance: "Opphav",
      dcatProfile: "Spesifikasjon",
    },
    clearAllFilters: "Tøm alle filter",
    resultsPerPage: "{{count}} treff per side",
    sort: {
      relevance: "Mest relevant",
      newest: "Nyaste fyst",
      oldest: "Eldste fyst",
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
      open: "Opne data",
      public: "Allmenn tilgang",
      restricted: "Avgrensa tilgang",
      nonPublic: "Ikkje-allmenn tilgang",
      unknown: "Ukjend tilgang",
    },
    provenanceFilter: {
      nasjonal: "Nasjonal",
      vedtak: "Vedtak",
      bruker: "Brukar",
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
      annet: "Anna",
      fylke: "Fylke",
      unknown: "Ukjend",
    },
  },
  aiPromoSplash: {
    introHighlight: "KI-søket",
    intro:
      "brukar metadata frå data.norge.no og hjelper deg med å finne det du leitar etter i alle datakatalogane våre. Ved å bruke naturleg språk kan du søkje fritt utan å måtte kjenne til spesifikke datasettnamn, fagtermar eller tekniske format.",
    suggestionsLegend: "Prøv t.d. ein av desse:",
  },
};

export default searchPage;
