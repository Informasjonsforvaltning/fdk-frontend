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
    loading: "Lastar...",
    loadingWithQuery: "Søkjer etter '{{query}}'...",
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
  },
  searchTabs: {
    loadingBadgeAriaLabel: "Lastar antal treff",
    searchTabsAriaLabel: "vel søkjetype",
    ki: "KI",
    datasets: "Datasett",
    dataServices: "API",
    concepts: "Omgrep",
    informationModels: "Informasjonsmodellar",
    servicesAndEvents: "Tenester og hendingar",
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
    },
    clearAllFilters: "Tøm alle filter",
    resultsCount: "{{count}} treff",
    resultsPerPage: "{{count}} treff per side",
    sort: {
      relevance: "Relevans",
      newest: "Sist publisert",
      oldest: "Fyrst publisert",
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
