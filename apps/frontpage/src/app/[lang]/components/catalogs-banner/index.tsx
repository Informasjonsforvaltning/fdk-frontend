import CatalogsMenu from '../catalogs-menu';
import { HeadingWithDivider } from '../typography';

import styles from './catalogs-banner.module.scss';

const CatalogsBanner = () => {
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
				<CatalogsMenu />
			</div>
		</div>
	);
}

export default CatalogsBanner;