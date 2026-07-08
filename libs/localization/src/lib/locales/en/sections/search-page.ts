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
    loading: "Loading...",
    loadingWithQuery: "Searching for '{{query}}'...",
    results: "{{count}} results",
    resultsWithQuery: "{{count}} results for '{{query}}'",
  },
  aiSearch: {
    headingWithCount: "AI search ({{count}} results)",
  },
  entitySearch: {
    hitsCountLabel: "({{count}} results)",
    noResults: "No results",
  },
  docs: {
    heading: "Documentation",
    headingWithCount: "Documentation ({{count}} results)",
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
  },
  searchTabs: {
    loadingBadgeAriaLabel: "Loading result count",
    searchTabsAriaLabel: "choose search type",
    ki: "AI",
    datasets: "Datasets",
    dataServices: "APIs",
    concepts: "Concepts",
    informationModels: "Information models",
    servicesAndEvents: "Services and events",
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
    },
    clearAllFilters: "Clear all filters",
    resultsCount: "{{count}} results",
    resultsPerPage: "{{count}} results per page",
    sort: {
      relevance: "Relevance",
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
