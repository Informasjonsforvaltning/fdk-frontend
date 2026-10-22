const frontpage = {
  metadata: {
    title: "Der Noreg deler data",
    description:
      "data.norge.no er Noregs offisielle portal for deling av data frå offentlege og private verksemder som du kan bruke til å lage tenester eller drive forsking.",
  },
  aiBanner: {
    prompt: {
      label: "Spør vår KI om data frå over 125 verksemder:",
      placeholder: "Kva leitar du etter?",
    },
    suggestions: {
      list: [
        "Kor mange Teslaer vart seld i Noreg i 2022",
        "Kva for område i Noreg er verna?",
        "Kva for varer eksporterer Noreg mest?",
        "Korleis ser trafikkmønstra ut i Oslo?",
        "Korleis presterer norske skular?",
        "Kor mykje skog har Noreg?",
        "Korleis går det med digitalisering i Noreg?",
      ],
      prefix: "Prøv t.d.",
    },
    title: "Der Noreg deler data",
  },
  catalogsBanner: {
    title: "Våre datakatalogar",
  },
  shareDataBanner: {
    content: "...og over {{link}} - del dine data med resten av landet.",
    shareDataLinkText: "Del data",
    documentationLinkText: "Hjelp og rettleiing",
    organizationsLinkText: "125 andre verksemder",
    doLike: "Gjer som",
    popover: {
      start: "Klikk for å starte animasjonen",
      pause: "Klikk for å pause animasjonen",
    },
  },
};

export default frontpage;
