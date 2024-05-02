import { type Dictionary } from '@fdk-frontend/dictionaries';
import { getPaths } from '@fdk-frontend/utils';

export const getHeaderData = (dictionary: Dictionary, basePath: string) => [
  {
    name: dictionary.aboutNationalDataCatalog,
    items: [
      {
        text: dictionary.aboutNationalDataCatalog,
        href: getPaths(basePath).about,
      },
      {
        text: dictionary.aboutDatasetCatalog,
        href: getPaths(basePath).aboutDatasetCatalog,
      },
      {
        text: dictionary.aboutDataServiceCatalog,
        href: getPaths(basePath).aboutDataServiceCatalog,
      },
      {
        text: dictionary.aboutConceptCatalog,
        href: getPaths(basePath).aboutConceptCatalog,
      },
      {
        text: dictionary.aboutInformationModelCatalog,
        href: getPaths(basePath).aboutInformationModelCatalog,
      },
      {
        text: dictionary.guidance,
        href: getPaths(basePath).guidance,
      },
    ],
  },
  {
    text: dictionary.organizations,
    href: getPaths(basePath).organizations,
  },
  {
    name: dictionary.tools,
    items: [
      {
        text: dictionary.artificialIntelligence,
        href: getPaths(basePath).artificialIntelligence,
      },
      {
        text: dictionary.reports,
        href: getPaths(basePath).reports,
      },
      {
        text: dictionary.sparqlQuery,
        href: getPaths(basePath).sparql,
      },
      {
        text: dictionary.requests,
        href: getPaths(basePath).requests,
      },
    ],
  },
  {
    text: dictionary.dataCommunity,
    href: process.env.FDK_COMMUNITY_BASE_URI,
    external: true,
  },
  {
    text: dictionary.publishing,
    href: process.env.FDK_REGISTRATION_BASE_URI,
    external: true,
  },
];
