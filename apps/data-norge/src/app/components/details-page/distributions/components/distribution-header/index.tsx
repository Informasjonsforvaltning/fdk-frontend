import { PropsWithChildren } from 'react';
import { type Distribution } from '@fdk-frontend/fdk-types';
import { isOpenLicense, printLocaleValue } from '@fdk-frontend/utils';
import DistributionTags from '@fdk-frontend/ui/distribution-tags';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import styles from './distribution-header.module.scss';

type DistributionHeaderProps = {
    distribution: Distribution;
    locale: LocaleCodes;
    dictionary: Dictionary;
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
    const hasApi = Boolean(distribution.accessService?.length);

    return (
        <div className={styles.headerContent}>
            <span className={styles.title}>
                {distribution.title
                    ? printLocaleValue(locale, distribution.title)
                    : distribution.accessURL
                      ? distribution.accessURL
                      : dictionary.distributions.header.nameless}
                {hasTags && (
                    <DistributionTags
                        distribution={distribution}
                        exampleData={exampleData}
                        hasApi={hasApi}
                        dictionary={dictionary}
                    />
                )}
            </span>
        </div>
    );
};

export default DistributionHeader;
