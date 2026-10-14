const searchPage = {
  metadata: {
    title: "Search",
    description: "Search for data on data.norge.no",
  },
  breadcrumb: {
    label: "Search",
    labelWithQuery: 'Search for "{{query}}"',
  },
  heading: {
    label: "Search",
    queryPrefix: "Search for",
  },
  entitySearch: {
    hitsCountLabel: "({{count}} results)",
    noResults: "No results",
  },
  docs: {
    noResults: "No results in documentation",
    noContent: "No documentation found.",
  },
  pagination: {
    previous: "Previous",
    next: "Next",
    pageAriaLabel: "Page {{page}}",
  },
  searchInput: {
    label: "Search",
    placeholder: "What are you looking for?",
    seeAllResults: "See all results",
    dataCatalogs: "Data catalogs",
    aiSearch: "AI search",
  },
  searchSuggestions: {
    heading: "Search suggestions",
  },
  searchHistory: {
    heading: "Recent searches",
    clear: "Clear history",
    delete: "Delete search {{query}}",
  },
  searchSets: {
    loadingBadgeAriaLabel: "Loading result count",
    ariaLabel: "choose search type",
    navAriaLabel: "choose set of results",
    "all-catalogs": "All data catalogs",
    ai: "AI",
    datasets: "Datasets",
    "data-services": "APIs",
    concepts: "Concepts",
    "information-models": "Information models",
    "services-and-events": "Services and events",
    docs: "Documentation",
  },
  searchForm: {
    filters: {
      organisation: "Organisation",
      theme: "Theme",
      accessLevel: "Access level",
      format: "Data format",
      geography: "Geography",
      provenance: "Provenance",
      dcatProfile: "Specification",
    },
    clearAllFilters: "Clear all filters",
    resultsPerPage: "{{count}} results per page",
    sort: {
      relevance: "Most relevant",
      newest: "Newest first",
      oldest: "Oldest first",
    },
    themeFilter: {
      tema: "Theme",
      euTema: "EU theme",
    },
    formatFilter: {
      mediaFormat: "Media format",
      fileType: "File type",
    },
    accessFilter: {
      open: "Open data",
      public: "Public access",
      restricted: "Restricted access",
      nonPublic: "Non-public access",
      unknown: "Unknown access",
    },
    provenanceFilter: {
      nasjonal: "National",
      vedtak: "Decision",
      bruker: "User",
      tredjepart: "Third party",
    },
    dcatProfileFilter: {
      mobilityDcatAp: "MobilityDCAT-AP",
      hvdDcatApNo: "HVD",
      dcatApNo: "DCAT-AP-NO",
    },
    orgTypeFilter: {
      kommune: "Municipality",
      stat: "State",
      privat: "Private",
      annet: "Other",
      fylke: "County",
      unknown: "Unknown",
    },
  },
  aiPromoSplash: {
    introHighlight: "The AI search",
    intro:
      "uses metadata from data.norge.no and helps you find what you are looking for across all our data catalogs. By using natural language, you can search freely without having to know specific dataset names, technical terms, or file formats.",
    suggestionsLegend: "Try one of these, for example:",
  },
};

export default searchPage;
