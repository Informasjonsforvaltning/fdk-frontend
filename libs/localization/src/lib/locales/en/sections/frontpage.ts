const frontpage = {
  metadata: {
    title: "Where Norway shares data",
    description:
      "data.norge.no is Norway's official portal for sharing data from Norwegian organizations that you can use for innovation and research.",
  },
  aiBanner: {
    prompt: {
      label: "Ask our AI about data from over 125 organizations:",
      placeholder: "What are you looking for?",
    },
    suggestions: {
      list: [
        "Number of Teslas sold in Norway in 2022",
        "Which areas in Norway are protected?",
        "Which goods does Norway export the most?",
        "What do traffic patterns look like in Oslo?",
        "How do Norwegian schools perform?",
        "How much forest does Norway have?",
        "How is digitalization progressing in Norway?",
      ],
      prefix: "Try for example:",
    },
    title: "Where Norway shares data",
  },
  catalogsBanner: {
    title: "Our data catalogs",
  },
  shareDataBanner: {
    content: "...and {{link}} - share your data with the rest of the country.",
    shareDataLinkText: "Share data",
    documentationLinkText: "Help and guidance",
    organizationsLinkText: "125 other organizations",
    doLike: "Do like",
    popover: {
      start: "Click to start the animation",
      pause: "Click to pause the animation",
    },
  },
};

export default frontpage;
