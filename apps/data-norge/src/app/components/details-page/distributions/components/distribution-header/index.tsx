import { PropsWithChildren } from 'react';
import { type Distribution } from '@fellesdatakatalog/types';
import { isOpenLicense, printLocaleValue } from '@fdk-frontend/utils';
import { DistributionTags } from '@fdk-frontend/ui';
import { type LocaleCodes, type Localization } from '@fdk-frontend/localization';
import styles from './distribution-header.module.scss';

type DistributionHeaderProps = {
    distribution: Distribution;
    locale: LocaleCodes;
    dictionary: Localization;
    exampleData?: boolean;
};

const DistributionHeader = ({
    distribution,
    locale,
    exampleData,
    dictionary,
    ...props
}: DistributionHeaderProps & PropsWithChildren) => {
    const hasOpenLicense = distribution.license && distribution.license.some((l: any) => isOpenLicense(l.uri));
    const hasTags = hasOpenLicense || exampleData || distribution.fdkFormat?.length || hasOpenLicense;

    return (
        <div className={styles.headerContent}>
            <span className={styles.title}>
                {printLocaleValue(locale, distribution.title) || dictionary.distributions.header.nameless}
                {hasTags && (
                    <DistributionTags
                        distribution={distribution}
                        exampleData={exampleData}
                        dictionary={dictionary}
                    />
                )}
            </span>
        </div>
    );
};

export default DistributionHeader;
