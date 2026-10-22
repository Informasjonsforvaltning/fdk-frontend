const frontpage = {
  metadata: {
    title: "Der Norge deler data",
    description:
      "data.norge.no er Norges offisielle portal for deling av data fra offentlige og private virksomheter som du kan bruke til å lage tjenester eller drive forskning.",
  },
  aiBanner: {
    prompt: {
      label: "Spør vår KI om data fra over 125 virksomheter:",
      placeholder: "Hva leter du etter?",
    },
    suggestions: {
      list: [
        "Antall Teslaer solgt i Norge i 2022",
        "Hvilke områder i Norge er vernet?",
        "Hvilke varer eksporterer Norge mest?",
        "Hvordan ser trafikkmønstrene ut i Oslo?",
        "Hvordan presterer norske skoler?",
        "Hvor mye skog har Norge?",
        "Hvordan går det med digitalisering i Norge?",
      ],
      prefix: "Prøv f.eks.",
    },
    title: "Der Norge deler data",
  },
  catalogsBanner: {
    title: "Våre datakataloger",
  },
  shareDataBanner: {
    content: "...og over {{link}} - del dine data med resten av landet.",
    shareDataLinkText: "Del data",
    documentationLinkText: "Hjelp og veiledning",
    organizationsLinkText: "125 andre virksomheter",
    doLike: "Gjør som",
    popover: {
      start: "Klikk for å starte animasjonen",
      pause: "Klikk for å pause animasjonen",
    },
  },
};

export default frontpage;
