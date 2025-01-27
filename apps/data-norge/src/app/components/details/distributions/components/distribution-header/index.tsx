import { PropsWithChildren } from 'react';
import { Button, Link, Tag } from '@digdir/designsystemet-react';
import { DownloadIcon } from '@navikt/aksel-icons';
import { type JSONValue } from '@fdk-frontend/types';
import { type LocaleCodes, i18n } from '@fdk-frontend/dictionaries';
import styles from './distribution-header.module.scss';

type DistributionHeaderProps = {
    distribution: JSONValue;
    locale: LocaleCodes;
    exampleData?: boolean;
}

const DistributionHeader = ({ distribution, locale, exampleData, ...props }: DistributionHeaderProps & PropsWithChildren) => {
	return (
		<div className={styles.headerContent}>
        <span className={styles.title}>
            {
                distribution.title?.[locale] ||
                distribution.title?.[i18n.defaultLocale] ||
                distribution.accessURL
            }
            <div className={styles.tags}>
                {
                    exampleData &&
                    <Tag
                        className={styles.tag}
                        color='success'
                        size='sm'
                    >
                        Eksempeldata
                    </Tag>
                }
                {distribution.fdkFormat?.map((format: any) => (
                    <Tag
                        className={styles.tag}
                        color='info'
                        size='sm'
                        key={format.name}
                    >
                        {format.name}
                    </Tag>
                ))}
            </div>
        </span>
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
                    Last ned
                    {/*Gå til datasett*/}
                    {/*<ExternalLinkIcon />*/}
                </Link>
            </Button>
        </div>
    </div>
	);
}

export default DistributionHeader;