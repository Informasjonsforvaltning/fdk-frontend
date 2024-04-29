import { type Dictionary } from '@fdk-frontend/dictionaries';
import { paths } from '@fdk-frontend/utils';

export const getHeaderData = (dictionary: Dictionary) => [
  {
    name: dictionary.aboutNationalDataCatalog,
    items: [
      {
        text: dictionary.aboutNationalDataCatalog,
        href: paths.about,
      },
      {
        text: dictionary.aboutDatasetCatalog,
        href: paths.aboutDatasetCatalog,
      },
      {
        text: dictionary.aboutDataServiceCatalog,
        href: paths.aboutDataServiceCatalog,
      },
      {
        text: dictionary.aboutConceptCatalog,
        href: paths.aboutConceptCatalog,
      },
      {
        text: dictionary.aboutInformationModelCatalog,
        href: paths.aboutInformationModelCatalog,
      },
      {
        text: dictionary.guidance,
        href: paths.guidance,
      },
    ],
  },
  {
    text: dictionary.organizations,
    href: paths.organizations,
  },
  {
    name: dictionary.tools,
    items: [
      {
        text: dictionary.artificialIntelligence,
        href: paths.artificialIntelligence,
      },
      {
        text: dictionary.reports,
        href: paths.reports,
      },
      {
        text: dictionary.sparqlQuery,
        href: paths.sparql,
      },
      {
        text: dictionary.requests,
        href: paths.requests,
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
