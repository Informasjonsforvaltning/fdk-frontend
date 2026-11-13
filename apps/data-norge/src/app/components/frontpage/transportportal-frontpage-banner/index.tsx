import React from "react";
import Image from "next/image";
import cn from "classnames";

import { Heading, Link } from "@digdir/designsystemet-react";
import heroPhoto1 from "@fdk-frontend/images/transportportal/1.jpg";
import heroPhoto2 from "@fdk-frontend/images/transportportal/2.jpg";
import { interpolate, type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { Profile } from "@fdk-frontend/types";
import { ExternalLink, HeadingWithDivider, SearchInput, TransportportalPartnersLinklist } from "@fdk-frontend/ui";
import { TransportportalFrontpageLinks } from "../transportportal-frontpage-links";

import styles from "./transportportal-frontpage-banner.module.scss";

type TransportportalFrontpageBannerProps = {
  dictionary: Localization;
  locale: LocaleCodes;
  profile?: Profile;
};

const backgroundImages = [
  {
    src: heroPhoto1,
    credit: "Bernd Dittrich",
    creditHref: "https://unsplash.com/photos/an-aerial-view-of-a-highway-with-cars-on-it-mXG463mXYGI",
  },
  {
    src: heroPhoto2,
    credit: "Stig Husby",
    creditHref: "https://unsplash.com/photos/a-long-road-with-a-mountain-in-the-background-3Gh8XAGvNwU",
  },
];

const TransportportalFrontpageBanner = ({
  dictionary,
  locale,
  profile = "data.norge",
}: TransportportalFrontpageBannerProps) => {
  const backgroundImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)] ?? backgroundImages[0];

  return (
    <div
      className={cn(styles.outer)}
      id="frontpage-banner"
    >
      <div className={styles.inner}>
        <HeadingWithDivider
          level={1}
          className={styles.headline}
        >
          <Link href={`/${locale}/om-transportportal`}>{dictionary.tp.tagline}</Link>
        </HeadingWithDivider>
        <div
          className={styles.search}
          data-color-scheme="dark"
        >
          <SearchInput
            locale={locale}
            className={styles.searchInput}
            showTrayNav={profile !== "transportportal"}
            hideAiSet={profile === "transportportal"}
            placeholder={dictionary.tp.searchPlaceholder}
            data-size="lg"
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
                <Link href={`/${locale}/om-transportportal/roller-og-ansvar`}>{dictionary.tp.partnersTitleLink}</Link>
              ),
            })}
          </Heading>
          <TransportportalPartnersLinklist className={styles.partnersLinks} />
        </div>
      </div>
      <div className={styles.gradient} />
      <p className={styles.attribution}>
        {interpolate(dictionary.tp.photoBy, {
          photographer: backgroundImage.creditHref ? (
            <ExternalLink href={backgroundImage.creditHref}>{backgroundImage.credit}</ExternalLink>
          ) : (
            backgroundImage.credit
          ),
        })}
      </p>
      <Image
        src={backgroundImage.src}
        alt=""
        fill
        preload
        fetchPriority="high"
        quality={60}
        sizes="100vw"
        className={styles.backgroundImage}
      />
    </div>
  );
};

export { TransportportalFrontpageBanner };
