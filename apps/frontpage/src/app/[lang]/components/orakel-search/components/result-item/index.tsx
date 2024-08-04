import { Heading } from '@digdir/designsystemet-react';
import Markdown from '@fdk-frontend/ui/markdown';
import CatalogSymbol from '@fdk-frontend/ui/catalog-symbol';

import styles from './result-item.module.scss';

type ItemObject = {
	id: string;
	title: string;
	description: string;
	type: string;
	publisher: string;
	publisherId: string;
}

type ResultItemProps = {
	item: ItemObject;
}

const getDatasetLink = (datasetId: string) => {
	const baseUrl = 'https://staging.fellesdatakatalog.digdir.no/datasets/';
	return `${baseUrl}${datasetId}`;
}

const ResultItem = ({ item, ...rest }: ResultItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
	return (
		<a href={getDatasetLink(item.id)} className={styles.link}>
			<CatalogSymbol className={styles.icon} catalog="datasets" />
			<div>
				<Heading className={styles.heading} level={4} size="xxsmall">
					<span className={styles.title}>{item.title}</span>
					<span className={styles.publisher}> ({item.publisher})</span>
				</Heading>
				<Markdown className={styles.description}>
					{item.description}
				</Markdown>
			</div>
		</a>
	);
}

export { ResultItem };
