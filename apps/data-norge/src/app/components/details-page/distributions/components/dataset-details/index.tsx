"use client";

import { useState } from "react";
import { Details } from "@digdir/designsystemet-react";
import { type LocaleCodes, type Localization } from "@fdk-frontend/localization";
import { printLocaleValue } from "@fdk-frontend/utils";
import { type Distribution, type SearchObject } from "@fellesdatakatalog/types";
import { DownloadButton } from "@fdk-frontend/ui";
import styles from "../../distributions.module.scss";
import DistributionDetails from "../distribution-details";
import DistributionHeader from "../distribution-header";
import { type Profile } from "@fdk-frontend/types";

type DistributionListProps = {
  distribution: Distribution;
  locale: LocaleCodes;
  dictionaries: {
    common: Localization;
    detailsPage: Localization;
  };
  isRelatedToTransportportal: boolean;
  resolvedDistributionDataServices: SearchObject[];
  resolvedDistributionInformationModels: SearchObject[];
  profile?: Profile;
};

const DistributionList = ({
  distribution,
  locale,
  dictionaries,
  isRelatedToTransportportal,
  resolvedDistributionDataServices,
  resolvedDistributionInformationModels,
  profile,
}: DistributionListProps) => {
  const [hasBeenOpened, setHasBeenOpened] = useState(false);

  const handleToggle = (event: Event) => {
    if ((event.currentTarget as HTMLDetailsElement).open) {
      setHasBeenOpened(true);
    }
  };

  return (
    <div className={styles.accordionWrapper}>
      <Details
        className={styles.accordionItem}
        onToggle={handleToggle}
      >
        <Details.Summary>
          <DistributionHeader
            distribution={distribution}
            locale={locale}
            dictionary={dictionaries.detailsPage}
          />
        </Details.Summary>
        <Details.Content className={styles.content}>
          <DistributionDetails
            distribution={distribution}
            locale={locale}
            dictionaries={dictionaries}
            isRelatedToTransportportal={isRelatedToTransportportal}
            resolvedDistributionDataServices={resolvedDistributionDataServices}
            resolvedDistributionInformationModels={resolvedDistributionInformationModels}
            hasBeenOpened={hasBeenOpened}
            profile={profile}
          />
        </Details.Content>
      </Details>
      {distribution.accessURL && (
        <DownloadButton
          uris={distribution.accessURL}
          className={styles.actionButton}
          modalTitle={
            printLocaleValue(locale, distribution.title) || dictionaries.detailsPage.distributions.header.nameless
          }
          dictionary={dictionaries.detailsPage}
          locale={locale}
        >
          {dictionaries.detailsPage.distributions.header.downloadBtnLabel}
        </DownloadButton>
      )}
    </div>
  );
};

export default DistributionList;
