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
    loading: "Laster...",
    loadingWithQuery: "Søker etter '{{query}}'...",
    results: "{{count}} treff",
    resultsWithQuery: "{{count}} treff for '{{query}}'",
  },
  aiSearch: {
    headingWithCount: "KI-søk ({{count}} treff)",
  },
  entitySearch: {
    hitsCountLabel: "({{count}} treff)",
    noResults: "Ingen treff",
  },
  docs: {
    heading: "Dokumentasjon",
    headingWithCount: "Dokumentasjon ({{count}} treff)",
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
  },
  searchTabs: {
    loadingBadgeAriaLabel: "Laster antall treff",
    ki: "KI",
    datasets: "Datasett",
    dataServices: "API",
    concepts: "Begrep",
    informationModels: "Informasjonsmodeller",
    servicesAndEvents: "Tjenester og hendelser",
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
    },
    clearAllFilters: "Tøm alle filtre",
    resultsCount: "{{count}} treff",
    resultsPerPage: "{{count}} treff per side",
    sort: {
      relevance: "Relevans",
      newest: "Sist publisert",
      oldest: "Først publisert",
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
