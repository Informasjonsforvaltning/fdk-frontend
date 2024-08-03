import CatalogsMenu from '../catalogs-menu';
import { HeadingWithDivider } from '../typography';

import styles from './catalogs-banner.module.scss';

type CatalogsBannerProps = {
	dictionary: Dictionary;
	baseUri: string;
}

const CatalogsBanner = ({ dictionary, baseUri }: CatalogsBannerProps) => {
	return (
		<div className={styles.catalogsBanner}>
			<div className={styles.inner}>
				<HeadingWithDivider
					className={styles.headline}
					level={2}
					size="md"
				>
					Våre datakataloger
				</HeadingWithDivider>
				<CatalogsMenu
					dictionary={dictionary}
					baseUri={baseUri}
				/>
			</div>
		</div>
	);
}

export default CatalogsBanner;