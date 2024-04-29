import { Dictionary } from '@fdk-frontend/dictionaries';
import { getPaths } from '@fdk-frontend/utils';

export const getFooterData = (dictionary: Dictionary, baseUri: string) => [
  {
    heading: dictionary.searchInCatalogs,
    links: [
      {
        href: getPaths(baseUri).searchAll,
        text: dictionary.searchInAllCatalogs,
      },
      {
        href: getPaths(baseUri).datasets,
        text: dictionary.searchInDatasets,
      },
      {
        href: getPaths(baseUri).dataServices,
        text: dictionary.searchInDataServices,
      },
      {
        href: getPaths(baseUri).concepts,
        text: dictionary.searchInConcepts,
      },
      {
        href: getPaths(baseUri).informationModels,
        text: dictionary.searchInInformationModels,
      },
    ],
  },
  {
    heading: dictionary.aboutNationalDataCatalog,
    links: [
      {
        href: getPaths(baseUri).guidance,
        text: dictionary.guidanceAndStandards,
      },
      {
        href: getPaths(baseUri).reports,
        text: dictionary.reports,
      },
      {
        href: getPaths(baseUri).organizations,
        text: dictionary.organizations,
      },
      {
        href: getPaths(baseUri).about,
        text: dictionary.aboutNationalDataCatalog,
      },
      {
        href: getPaths(baseUri).accessibilityStatement,
        text: dictionary.accessibilityStatement,
        external: true,
      },
      {
        href: getPaths(baseUri).aboutRegistration,
        text: dictionary.registrationHelp,
      },
    ],
  },
  {
    heading: dictionary.aboutWebsite,
    links: [
      {
        text: dictionary.nationalDataCatalog,
        undecoratedText: `${dictionary.footer.aboutWebsite.nationalDataCatalogManager}${dictionary.nationalDataCatalog}`,
      },
      {
        href: getPaths(baseUri).privacyPolicy,
        text: dictionary.privacyPolicy,
        external: true,
      },
      {
        href: getPaths(baseUri).cookies,
        text: dictionary.cookies,
      },
    ],
  },
  {
    heading: dictionary.contact,
    links: [
      {
        href: getPaths(baseUri).nationalDatacatalogEmail,
        text: dictionary.nationalDatacatalogEmail,
      },
    ],
  },
];
