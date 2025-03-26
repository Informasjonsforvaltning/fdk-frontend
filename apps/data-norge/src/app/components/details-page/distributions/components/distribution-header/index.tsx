import { PropsWithChildren } from 'react';
import mime from 'mime-types';
import { Tag } from '@digdir/designsystemet-react';
import { type Distribution } from '@fdk-frontend/fdk-types';
import { isOpenLicense, printLocaleValue } from '@fdk-frontend/utils';
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
    return (
        <div className={styles.headerContent}>
            <span className={styles.title}>
                {distribution.title
                    ? printLocaleValue(locale, distribution.title)
                    : distribution.accessURL
                      ? distribution.accessURL
                      : dictionary.distributions.header.nameless}
                {hasTags && (
                    <div className={styles.tags}>
                        {hasOpenLicense && (
                            <Tag
                                className={styles.tag}
                                color='success'
                                size='sm'
                            >
                                {dictionary.distributions.header.openLicense}
                            </Tag>
                        )}
                        {exampleData && (
                            <Tag
                                className={styles.tag}
                                color='neutral'
                                size='sm'
                            >
                                {dictionary.distributions.header.exampleData}
                            </Tag>
                        )}
                        {distribution.fdkFormat
                            ?.filter((format: any) => format?.code)
                            .map((format: any) => (
                                <Tag
                                    className={styles.tag}
                                    color='info'
                                    size='sm'
                                    key={format.code}
                                >
                                    {mime.extension(format.code) || format.code}
                                    {/*{format.code}*/}
                                </Tag>
                            ))}
                    </div>
                )}
            </span>
        </div>
    );
};

export default DistributionHeader;
