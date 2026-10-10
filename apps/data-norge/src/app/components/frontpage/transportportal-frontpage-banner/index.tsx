import React from "react";
import cn from "classnames";

import { Heading, Link } from "@digdir/designsystemet-react";
import { interpolate, type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { HeadingWithDivider, SearchInput, TransportportalPartnersLinklist } from "@fdk-frontend/ui";
import { TransportportalFrontpageLinks } from "../transportportal-frontpage-links";

import styles from "./transportportal-frontpage-banner.module.scss";
import { Profile } from "@fdk-frontend/types";

type TransportportalFrontpageBannerProps = {
  dictionary: Localization;
  locale: LocaleCodes;
  profile?: Profile;
};

const TransportportalFrontpageBanner = ({
  dictionary,
  locale,
  profile = "data.norge",
}: TransportportalFrontpageBannerProps) => (
  <div
    className={cn(styles.outer)}
    id="frontpage-banner"
  >
    <div className={styles.inner}>
      <HeadingWithDivider
        level={1}
        className={styles.headline}
      >
        <Link href={`${locale}/om-transportportal`}>{dictionary.tp.tagline}</Link>
      </HeadingWithDivider>
      <div
        className={styles.search}
        data-color-scheme="light"
      >
        <SearchInput
          locale={locale}
          className={styles.searchInput}
          showTrayNav={profile !== "transportportal"}
          placeholder={dictionary.tp.searchPlaceholder}
        />
      </div>
      <TransportportalFrontpageLinks
        dictionary={dictionary}
        locale={locale}
      />
      <div className={styles.partners}>
        <Heading className={styles.partnersTitle}>
          {interpolate(dictionary.tp.partnersTitle, {
            link: (
              <Link href={`/${locale}/om-transportportal/roller-og-ansvar`}>
                {dictionary.tp.partnersTitleLink}
              </Link>
            ),
          })}
        </Heading>
        <TransportportalPartnersLinklist className={styles.partnersLinks} />
      </div>
    </div>
    <div className={styles.gradient} />
    <div
      className={styles.backgroundImage}
      style={{ backgroundImage: `url("/${locale}/images/content/transportportal/1.jpg")` }}
    />
  </div>
);

export { TransportportalFrontpageBanner };
