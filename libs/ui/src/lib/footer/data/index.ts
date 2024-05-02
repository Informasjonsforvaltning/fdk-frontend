import { Dictionary } from '@fdk-frontend/dictionaries';
import { getPaths } from '@fdk-frontend/utils';

export const getFooterData = (dictionary: Dictionary, basePath: string) => [
  {
    heading: dictionary.searchInCatalogs,
    links: [
      {
        href: getPaths(basePath).searchAll,
        text: dictionary.searchInAllCatalogs,
      },
      {
        href: getPaths(basePath).datasets,
        text: dictionary.searchInDatasets,
      },
      {
        href: getPaths(basePath).dataServices,
        text: dictionary.searchInDataServices,
      },
      {
        href: getPaths(basePath).concepts,
        text: dictionary.searchInConcepts,
      },
      {
        href: getPaths(basePath).informationModels,
        text: dictionary.searchInInformationModels,
      },
    ],
  },
  {
    heading: dictionary.aboutNationalDataCatalog,
    links: [
      {
        href: getPaths(basePath).guidance,
        text: dictionary.guidanceAndStandards,
      },
      {
        href: getPaths(basePath).reports,
        text: dictionary.reports,
      },
      {
        href: getPaths(basePath).organizations,
        text: dictionary.organizations,
      },
      {
        href: getPaths(basePath).about,
        text: dictionary.aboutNationalDataCatalog,
      },
      {
        href: getPaths(basePath).accessibilityStatement,
        text: dictionary.accessibilityStatement,
        external: true,
      },
      {
        href: getPaths(basePath).aboutRegistration,
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
        href: getPaths(basePath).privacyPolicy,
        text: dictionary.privacyPolicy,
        external: true,
      },
      {
        href: getPaths(basePath).cookies,
        text: dictionary.cookies,
      },
    ],
  },
  {
    heading: dictionary.contact,
    links: [
      {
        href: getPaths(basePath).nationalDatacatalogEmail,
        text: dictionary.nationalDatacatalogEmail,
      },
    ],
  },
];
