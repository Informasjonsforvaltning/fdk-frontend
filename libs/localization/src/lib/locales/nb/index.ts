import type { Localization } from "../../types";

import common from "./sections/common";
import detailsPage from "./sections/details-page";
import docs from "./sections/docs";
import frontpage from "./sections/frontpage";
import sparqlSandboxPage from "./sections/sparql-sandbox-page";
import dataHunterPage from "./sections/data-hunter-page";
import searchPage from "./sections/search-page";

const localization: Localization = {
  common: common,
  detailsPage: detailsPage,
  docs: docs,
  frontpage: frontpage,
  sparqlSandboxPage: sparqlSandboxPage,
  dataHunterPage: dataHunterPage,
  searchPage: searchPage,
};

export default localization;
