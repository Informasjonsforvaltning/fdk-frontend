import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
import { Heading } from '@digdir/designsystemet-react';

import styles from './page.module.scss';

export type DetailsViewPageType = {
    params: {
        lang: LocaleCodes;
        slug: string[];
    };
};

export default async function DetailsViewPage({ params }: DetailsViewPageType) {

	const locale = params.lang ?? i18n.defaultLocale;
	const commonDictionary = await getDictionary(locale, 'common');

	const breadcrumbList = [
	    {
	        href: '#',
	        text: 'Datasett',
	    },
	    {
	        href: '#',
	        text: 'Statistikk helt arbeidsledige fylke og kommune',
	    },
	];

	return (
		<div className={styles.detailsPage}>
			<Breadcrumbs
				dictionary={commonDictionary}
				breadcrumbList={breadcrumbList}
			/>
			<main className={styles.mainContent}>
				<Heading size="md">
					Statistikk helt arbeidsledige fylke og kommune
				</Heading>
			</main>
		</div>
	);
}

export const metadata = {
    title: 'Detaljer',
    description: 'POC for detaljvisning',
};