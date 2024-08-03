import { Dictionary } from '@fdk-frontend/dictionaries';

const getMainMenuData = (dictionary: Dictionary, baseUrl: string) => ({
	catalogs: [
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
	],
	help: [
		{
			title: dictionary.mainMenu.help.links.getStarted,
			href: `${baseUrl}/veiledning`
		},
		{
			title: dictionary.mainMenu.help.links.documentation,
			href: `https://informasjonsforvaltning.github.io/`
		},
		{
			title: dictionary.mainMenu.help.links.community,
			href: `https://datalandsbyen.norge.no/`
		}
	],
	tools: [
		{
			title: dictionary.mainMenu.tools.links.organizations,
			href: `${baseUrl}/organizations`
		},
		{
			title: dictionary.mainMenu.tools.links.requestData,
			href: `${baseUrl}/requests`
		},
		{
			title: dictionary.mainMenu.tools.links.dataHunter,
			href: `${baseUrl}/forms`
		},
		{
			title: dictionary.mainMenu.tools.links.sparqlSandbox,
			href: `${baseUrl}/sparql`
		}
	],
	about: [
		{
			title: dictionary.mainMenu.about.links.reports,
			href: `${baseUrl}/reports`
		},
		{
			title: dictionary.mainMenu.about.links.aboutUs,
			href: `${baseUrl}/about`
		},
		{
			title: dictionary.mainMenu.about.links.contactUs,
			href: `${baseUrl}/contact`
		}
	],
});

export default getMainMenuData;