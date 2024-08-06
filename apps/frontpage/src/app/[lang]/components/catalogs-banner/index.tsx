import { Dictionary } from '@fdk-frontend/dictionaries';
import CatalogsMenu from '@fdk-frontend/ui/catalogs-menu';
import { HeadingWithDivider } from '@fdk-frontend/ui/typography';

import styles from './catalogs-banner.module.scss';

type CatalogsBannerProps = {
	commonDictionary: Dictionary;
	frontpageDictionary: Dictionary;
	baseUri: string;
}

const CatalogsBanner = ({ commonDictionary, frontpageDictionary, baseUri }: CatalogsBannerProps) => {
	return (
		<div className={styles.catalogsBanner}>
			<div className={styles.inner}>
				<HeadingWithDivider
					className={styles.headline}
					level={2}
					size="md"
				>
					{frontpageDictionary.catalogsBanner.title}
				</HeadingWithDivider>
				<CatalogsMenu
					dictionary={commonDictionary}
					baseUri={baseUri}
				/>
			</div>
		</div>
	);
}

export default CatalogsBanner;
