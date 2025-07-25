import { Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { CatalogsMenu, HeadingWithDivider } from '@fdk-frontend/ui';

import styles from './catalogs-banner.module.scss';

type CatalogsBannerProps = {
    commonDictionary: Dictionary;
    frontpageDictionary: Dictionary;
    locale: LocaleCodes;
};

const CatalogsBanner = ({ commonDictionary, frontpageDictionary, locale }: CatalogsBannerProps) => (
    <div className={styles.catalogsBanner}>
        <div className={styles.inner}>
            <HeadingWithDivider
                className={styles.headline}
                level={2}
                size='md'
            >
                {frontpageDictionary.catalogsBanner.title}
            </HeadingWithDivider>
            <CatalogsMenu
                dictionary={commonDictionary}
                locale={locale}
            />
        </div>
    </div>
);

export default CatalogsBanner;
