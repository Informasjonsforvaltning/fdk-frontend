import { PropsWithChildren } from 'react';
import mime from 'mime-types';
import { Button, Link, Tag } from '@digdir/designsystemet-react';
import { DownloadIcon } from '@navikt/aksel-icons';
import { type JSONValue } from '@fdk-frontend/types';
import { isOpenLicense, printLocaleValue } from '@fdk-frontend/utils';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import styles from './distribution-header.module.scss';

type DistributionHeaderProps = {
    distribution: JSONValue;
    locale: LocaleCodes;
    dictionary: Dictionary;
    exampleData?: boolean;
}

const DistributionHeader = ({ distribution, locale, exampleData, dictionary, ...props }: DistributionHeaderProps & PropsWithChildren) => {

    const hasOpenLicense =
        distribution.license &&
        distribution.license.some((l: any) => isOpenLicense(l.uri));

    const hasTags = isOpenLicense(distribution.license?.uri) ||
        exampleData ||
        distribution.fdkFormat?.length ||
        hasOpenLicense;

	return (
		<div className={styles.headerContent}>
        <span className={styles.title}>
            {
                distribution.title ?
                printLocaleValue(locale, distribution.title) :
                distribution.accessURL ?
                distribution.accessURL :
                dictionary.distributions.header.nameless
                
            }
            {
                hasTags &&
                <div className={styles.tags}>
                    {
                        hasOpenLicense &&
                        <Tag
                            className={styles.tag}
                            color='success'
                            size='sm'
                        >
                            {dictionary.distributions.header.openLicense}
                        </Tag>
                    }
                    {
                        exampleData &&
                        <Tag
                            className={styles.tag}
                            color='neutral'
                            size='sm'
                        >
                            {dictionary.distributions.header.exampleData}
                        </Tag>
                    }
                    {distribution.fdkFormat?.filter((format: any) => format?.code).map((format: any) => (
                        <Tag
                            className={styles.tag}
                            color='info'
                            size='sm'
                            key={format.code}
                        >
                            {mime.extension(format.code) || format.code}
                        </Tag>
                    ))}
                </div>
            }
        </span>
        {
            distribution.accessURL &&
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Button
                    asChild
                    size='sm'
                    variant='secondary'
                    color='first'
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Link href={distribution.accessURL}>
                        <DownloadIcon fontSize='1.2em' />
                        {dictionary.distributions.header.downloadBtnLabel}
                    </Link>
                </Button>
            </div>
        }
    </div>
	);
}

export default DistributionHeader;