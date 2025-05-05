import { Dictionary } from '@fdk-frontend/dictionaries';

const getMainMenuData = (dictionary: Dictionary, locale: string) => ({
    catalogs: [
        {
            key: 'datasets',
            title: dictionary.mainMenu.catalogs.datasets.title,
            description: dictionary.mainMenu.catalogs.datasets.description,
            href: `/${locale}/catalogs/datasets`,
        },
        {
            key: 'apis',
            title: dictionary.mainMenu.catalogs.apis.title,
            description: dictionary.mainMenu.catalogs.apis.description,
            href: `/${locale}/catalogs/data-services`,
        },
        {
            key: 'terms',
            title: dictionary.mainMenu.catalogs.terms.title,
            description: dictionary.mainMenu.catalogs.terms.description,
            href: `/${locale}/catalogs/concepts`,
        },
        {
            key: 'information-models',
            title: dictionary.mainMenu.catalogs.informationModels.title,
            description: dictionary.mainMenu.catalogs.informationModels.description,
            href: `/${locale}/catalogs/information-models`,
        },
        {
            key: 'services-events',
            title: dictionary.mainMenu.catalogs.servicesEvents.title,
            description: dictionary.mainMenu.catalogs.servicesEvents.description,
            href: `/${locale}/catalogs/public-services-and-events`,
        },
    ],
    help: [
        {
            title: dictionary.mainMenu.help.links.userGuide,
            href: `/${locale}/docs`,
        },
        {
            title: dictionary.mainMenu.help.links.community,
            href: `/${locale}/docs/community`,
        },
        {
            title: dictionary.mainMenu.help.links.technical,
            href: `/${locale}/technical`,
        },
    ],
    tools: [
        {
            title: dictionary.mainMenu.tools.links.organizations,
            href: `/organizations`,
        },
        {
            title: dictionary.mainMenu.tools.links.requestData,
            href: `/requests`,
        },
        {
            title: dictionary.mainMenu.tools.links.dataHunter,
            href: `/${locale}/data-hunter`,
        },
        {
            title: dictionary.mainMenu.tools.links.sparqlSandbox,
            href: `/sparql`,
        },
        {
            title: dictionary.mainMenu.catalogs.ai.title,
            href: `/kunstig-intelligens`,
        },
    ],
    about: [
        {
            title: dictionary.mainMenu.about.links.aboutUs,
            href: `/${locale}/about`,
        },
        {
            title: dictionary.mainMenu.about.links.reports,
            href: `/reports`,
        },
        {
            title: dictionary.mainMenu.about.links.contactUs,
            href: `/${locale}/contact`,
        },
        {
            title: dictionary.mainMenu.about.links.a11yStatement,
            href: `https://uustatus.no/nb/erklaringer/publisert/8020b962-b706-4cdf-ab8b-cdb5f480a696`,
            external: true,
        },
        {
            title: dictionary.mainMenu.about.links.privacyPolicy,
            href: `https://www.digdir.no/digdir/personvernerklaering/706`,
            external: true,
        },
        {
            title: dictionary.mainMenu.about.links.cookiePolicy,
            href: `https://www.digdir.no/digdir/informasjonskapsler/707`,
            external: true,
        },
        {
            title: dictionary.mainMenu.about.links.githubFollow,
            href: `https://github.com/Informasjonsforvaltning`,
            external: true,
        },
    ],
});

export default getMainMenuData;
