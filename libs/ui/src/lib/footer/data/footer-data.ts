import { Dictionary } from '@fdk-frontend/dictionaries';
import { paths } from '@fdk-frontend/utils';

export const getFooterData = (dictionary: Dictionary) => [
  {
    heading: dictionary.searchInCatalogs,
    links: [
      {
        href: paths.searchAll,
        text: dictionary.searchInAllCatalogs,
      },
      {
        href: paths.datasets,
        text: dictionary.searchInDatasets,
      },
      {
        href: paths.dataServices,
        text: dictionary.searchInDataServices,
      },
      {
        href: paths.concepts,
        text: dictionary.searchInConcepts,
      },
      {
        href: paths.informationModels,
        text: dictionary.searchInInformationModels,
      },
    ],
  },
  {
    heading: dictionary.aboutNationalDataCatalog,
    links: [
      {
        href: paths.guidance,
        text: dictionary.guidanceAndStandards,
      },
      {
        href: paths.reports,
        text: dictionary.reports,
      },
      {
        href: paths.organizations,
        text: dictionary.organizations,
      },
      {
        href: paths.about,
        text: dictionary.aboutNationalDataCatalog,
      },
      {
        href: paths.accessibilityStatement,
        text: dictionary.accessibilityStatement,
        external: true,
      },
      {
        href: paths.aboutRegistration,
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
        href: paths.privacyPolicy,
        text: dictionary.privacyPolicy,
        external: true,
      },
      {
        href: paths.cookies,
        text: dictionary.cookies,
      },
    ],
  },
  {
    heading: dictionary.contact,
    links: [
      {
        href: paths.nationalDatacatalogEmail,
        text: dictionary.nationalDatacatalogEmail,
      },
    ],
  },
];
