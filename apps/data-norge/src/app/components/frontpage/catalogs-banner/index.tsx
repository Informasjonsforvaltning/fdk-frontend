import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { CatalogsMenu, HeadingWithDivider } from "@fdk-frontend/ui";

import styles from "./catalogs-banner.module.scss";

type CatalogsBannerProps = {
  commonDictionary: Localization;
  frontpageDictionary: Localization;
  locale: LocaleCodes;
};

const CatalogsBanner = ({ commonDictionary, frontpageDictionary, locale }: CatalogsBannerProps) => (
  <div className={styles.catalogsBanner}>
    <div className={styles.inner}>
      <HeadingWithDivider
        className={styles.headline}
        level={1}
        data-size="md"
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
