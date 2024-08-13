import { Dictionary } from '@fdk-frontend/dictionaries';

const getFooterData = (dictionary: Dictionary) => ({
	policies: [
		{
			title: dictionary.footer.policies.a11yStatement,
			href: `https://uustatus.no/nb/erklaringer/publisert/8020b962-b706-4cdf-ab8b-cdb5f480a696`,
			external: true
		},
		{
			title: dictionary.footer.policies.privacyPolicy,
			href: `https://www.digdir.no/digdir/personvernerklaering/706`,
			external: true
		},
		{
			title: dictionary.footer.policies.cookiePolicy,
			href: `https://www.digdir.no/digdir/informasjonskapsler/707`,
			external: true
		}
	],
	githubUri: `https://github.com/Informasjonsforvaltning`,
	digdirUri: `https://www.digdir.no/`
});

export default getFooterData;