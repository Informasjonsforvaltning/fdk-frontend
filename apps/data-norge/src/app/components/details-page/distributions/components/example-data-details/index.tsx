'use client';

import { useState } from 'react';
import { Details } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Localization } from '@fdk-frontend/localization';
import { printLocaleValue } from '@fdk-frontend/utils';
import { type Distribution, type SearchObject } from '@fellesdatakatalog/types';
import { DownloadButton } from '@fdk-frontend/ui';
import styles from '../../distributions.module.scss';
import DistributionDetails from '../distribution-details';
import DistributionHeader from '../distribution-header';

type ExampleDataDetailsProps = {
    distribution: Distribution;
    locale: LocaleCodes;
    dictionaries: {
        common: Localization;
        detailsPage: Localization;
    };
    isRelatedToTransportportal: boolean;
    resolvedDistributionDataServices: SearchObject[];
    resolvedDistributionInformationModels: SearchObject[];
};

const ExampleDataDetails = ({
    distribution,
    locale,
    dictionaries,
    isRelatedToTransportportal,
    resolvedDistributionDataServices,
    resolvedDistributionInformationModels,
}: ExampleDataDetailsProps) => {
    const [hasBeenOpened, setHasBeenOpened] = useState(false);

    const handleToggle = (event: Event) => {
        if (event.currentTarget instanceof HTMLDetailsElement && event.currentTarget.open) {
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
                        exampleData={true}
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
                    />
                </Details.Content>
            </Details>
            <DownloadButton
                uris={distribution.accessURL}
                className={styles.actionButton}
                modalTitle={
                    printLocaleValue(locale, distribution.title) ||
                    dictionaries.detailsPage.distributions.header.nameless
                }
                dictionary={dictionaries.detailsPage}
                locale={locale}
            >
                {dictionaries.detailsPage.distributions.header.downloadBtnLabel}
            </DownloadButton>
        </div>
    );
};

export default ExampleDataDetails;
