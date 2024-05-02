/* eslint-disable no-magic-numbers */
export const getPaths = (baseUri: string) => {
  const baseUriWithoutSlash = baseUri.endsWith('/') ? baseUri.slice(0, -1) : baseUri;
  return ({
    root: `${baseUriWithoutSlash}`,
    organizations: `${baseUriWithoutSlash}/organizations`,
    tools: `${baseUriWithoutSlash}/tools`,
    forms: `${baseUriWithoutSlash}/forms`,
    dataHunter: `${baseUriWithoutSlash}/forms/data-hunter`,
    searchAll: `${baseUriWithoutSlash}/search-all`,
    datasets: `${baseUriWithoutSlash}/datasets`,
    dataServices: `${baseUriWithoutSlash}/data-services`,
    concepts: `${baseUriWithoutSlash}/concepts`,
    informationModels: `${baseUriWithoutSlash}/information-models`,
    guidance: `${baseUriWithoutSlash}/guidance`,
    reports: `${baseUriWithoutSlash}/reports`,
    about: `${baseUriWithoutSlash}/about`,
    sparql: `${baseUriWithoutSlash}/sparql`,
    aboutDatasetCatalog: `${baseUriWithoutSlash}/om-datasettkatalogen`,
    aboutConceptCatalog: `${baseUriWithoutSlash}/om-begrepskatalogen`,
    aboutInformationModelCatalog: `${baseUriWithoutSlash}/om-informasjonskatalogen`,
    aboutDataServiceCatalog: `${baseUriWithoutSlash}/om-api-katalogen`,
    aboutRegistration: `${baseUriWithoutSlash}/about-registration`,
    artificialIntelligence: `${baseUriWithoutSlash}/kunstig-intelligens`,
    requests: `${baseUriWithoutSlash}/requests`,
    accessibilityStatement: 'https://uustatus.no/nb/erklaringer/publisert/8020b962-b706-4cdf-ab8b-cdb5f480a696',
    privacyPolicy: 'https://www.digdir.no/digdir/personvernerklaering/706',
    cookies: 'https://www.digdir.no/digdir/informasjonskapsler/707',
    nationalDatacatalogEmail: 'mailto:fellesdatakatalog@digdir.no',
  });
};
