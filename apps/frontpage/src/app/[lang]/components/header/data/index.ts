import { type Dictionary } from '@fdk-frontend/dictionaries';
import { getPaths } from '@fdk-frontend/utils';

export const getHeaderData = (
  dictionary: Dictionary,
  baseUri: string,
  communityBaseUri: string,
  registrationBaseUri: string,
) => [
  {
    name: dictionary.aboutNationalDataCatalog,
    items: [
      {
        text: dictionary.aboutNationalDataCatalog,
        href: getPaths(baseUri).about,
      },
      {
        text: dictionary.aboutDatasetCatalog,
        href: getPaths(baseUri).aboutDatasetCatalog,
      },
      {
        text: dictionary.aboutDataServiceCatalog,
        href: getPaths(baseUri).aboutDataServiceCatalog,
      },
      {
        text: dictionary.aboutConceptCatalog,
        href: getPaths(baseUri).aboutConceptCatalog,
      },
      {
        text: dictionary.aboutInformationModelCatalog,
        href: getPaths(baseUri).aboutInformationModelCatalog,
      },
      {
        text: dictionary.guidance,
        href: getPaths(baseUri).guidance,
      },
    ],
  },
  {
    text: dictionary.organizations,
    href: getPaths(baseUri).organizations,
  },
  {
    name: dictionary.tools,
    items: [
      {
        text: dictionary.artificialIntelligence,
        href: getPaths(baseUri).artificialIntelligence,
      },
      {
        text: dictionary.reports,
        href: getPaths(baseUri).reports,
      },
      {
        text: dictionary.sparqlQuery,
        href: getPaths(baseUri).sparql,
      },
      {
        text: dictionary.requests,
        href: getPaths(baseUri).requests,
      },
    ],
  },
  {
    text: dictionary.dataCommunity,
    href: communityBaseUri,
    external: true,
  }
];
