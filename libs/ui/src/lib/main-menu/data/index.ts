import { Dictionary } from '@fdk-frontend/dictionaries';

const getMainMenuData = (dictionary: Dictionary, baseUri: string) => ({
    catalogs: [
        {
            key: 'datasets',
            title: dictionary.mainMenu.catalogs.datasets.title,
            description: dictionary.mainMenu.catalogs.datasets.description,
            href: `${baseUri}/datasets`,
        },
        {
            key: 'apis',
            title: dictionary.mainMenu.catalogs.apis.title,
            description: dictionary.mainMenu.catalogs.apis.description,
            href: `${baseUri}/data-services`,
        },
        {
            key: 'terms',
            title: dictionary.mainMenu.catalogs.terms.title,
            description: dictionary.mainMenu.catalogs.terms.description,
            href: `${baseUri}/concepts`,
        },
        {
            key: 'information-models',
            title: dictionary.mainMenu.catalogs.informationModels.title,
            description: dictionary.mainMenu.catalogs.informationModels.description,
            href: `${baseUri}/information-models`,
        },
        {
            key: 'services-events',
            title: dictionary.mainMenu.catalogs.servicesEvents.title,
            description: dictionary.mainMenu.catalogs.servicesEvents.description,
            href: `${baseUri}/public-services-and-events`,
        },
        {
            key: 'ai',
            title: dictionary.mainMenu.catalogs.ai.title,
            description: dictionary.mainMenu.catalogs.ai.description,
            href: `${baseUri}/kunstig-intelligens`,
        },
    ],
    help: [
        {
            title: dictionary.mainMenu.help.links.findingData,
            href: `${baseUri}/getting-started/finding-data`,
        },
        {
            title: dictionary.mainMenu.help.links.sharingData,
            href: `${baseUri}/getting-started/publishing-intro`,
        },
        {
            title: dictionary.mainMenu.help.links.documentation,
            href: `https://informasjonsforvaltning.github.io/`,
            external: true,
        },
        {
            title: dictionary.mainMenu.help.links.community,
            href: `https://datalandsbyen.norge.no/`,
            external: true,
        },
    ],
    tools: [
        {
            title: dictionary.mainMenu.tools.links.organizations,
            href: `${baseUri}/organizations`,
        },
        {
            title: dictionary.mainMenu.tools.links.requestData,
            href: `${baseUri}/requests`,
        },
        {
            title: dictionary.mainMenu.tools.links.dataHunter,
            href: `${baseUri}/forms`,
        },
        {
            title: dictionary.mainMenu.tools.links.sparqlSandbox,
            href: `${baseUri}/sparql`,
        },
    ],
    about: [
        {
            title: dictionary.mainMenu.about.links.aboutUs,
            href: `${baseUri}/about`,
        },
        {
            title: dictionary.mainMenu.about.links.reports,
            href: `${baseUri}/reports`,
        },
        {
            title: dictionary.mainMenu.about.links.contactUs,
            href: `${baseUri}/contact`,
        },
    ],
});

export default getMainMenuData;
