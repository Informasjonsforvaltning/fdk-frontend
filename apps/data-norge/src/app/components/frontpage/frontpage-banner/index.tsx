import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { HeadingWithDivider } from "@fdk-frontend/ui";

import { FrontpageBannerSearch } from "./components/frontpage-banner-search";
import Norgeskart from "./components/norgeskart";
import ScrollButton from "./components/scroll-button";

import styles from "./frontpage-banner.module.scss";

type FrontpageBannerProps = {
  dictionary: Localization;
  locale: LocaleCodes;
};

const FrontpageBanner = ({ dictionary, locale }: FrontpageBannerProps) => (
  <div
    className={styles.outer}
    id="frontpage-banner"
  >
    <div className={styles.inner}>
      <HeadingWithDivider
        level={1}
        className={styles.headline}
      >
        {dictionary.aiBanner.title}
      </HeadingWithDivider>
      <FrontpageBannerSearch
        dictionary={dictionary}
        locale={locale}
      />
    </div>
    <div className={styles.gradient} />
    <Norgeskart />
    <ScrollButton />
  </div>
);

export { FrontpageBanner };
