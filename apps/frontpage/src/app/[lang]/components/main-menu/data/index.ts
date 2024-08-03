import { Dictionary } from '@fdk-frontend/dictionaries';

const getMainMenuData = (dictionary: Dictionary, baseUrl: string) => ({
	catalogs: {
		heading: dictionary.mainMenu.catalogs.heading,
		items: [
			{
				key: 'datasets',
				title: dictionary.mainMenu.catalogs.datasets.title,
				description: dictionary.mainMenu.catalogs.datasets.description,
				href: `${baseUrl}/om-datasettkatalogen`
			},
			{
				key: 'apis',
				title: dictionary.mainMenu.catalogs.apis.title,
				description: dictionary.mainMenu.catalogs.apis.description,
				href: `${baseUrl}/om-api-katalogen`
			},
			{
				key: 'terms',
				title: dictionary.mainMenu.catalogs.terms.title,
				description: dictionary.mainMenu.catalogs.terms.description,
				href: `${baseUrl}/om-begrepskatalogen`
			},
			{
				key: 'information-models',
				title: dictionary.mainMenu.catalogs.informationModels.title,
				description: dictionary.mainMenu.catalogs.informationModels.description,
				href: `${baseUrl}/om-informasjonskatalogen`
			},
			{
				key: 'services-events',
				title: dictionary.mainMenu.catalogs.servicesEvents.title,
				description: dictionary.mainMenu.catalogs.servicesEvents.description,
				href: `${baseUrl}/public-services-and-events`
			},
			{
				key: 'ai',
				title: dictionary.mainMenu.catalogs.ai.title,
				description: dictionary.mainMenu.catalogs.ai.description,
				href: `${baseUrl}/kunstig-intelligens`
			}
		]
	},
	help: {
		heading: dictionary.mainMenu.help.heading,
		links: [
			{
				title: dictionary.mainMenu.help.links.getStarted,
				href: `${baseUrl}/veiledning`
			}
		]
	}
});

export default getMainMenuData;