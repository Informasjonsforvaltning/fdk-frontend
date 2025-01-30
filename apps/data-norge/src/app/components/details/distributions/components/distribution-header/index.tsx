import { PropsWithChildren } from 'react';
import mime from 'mime-types';
import { Button, Link, Tag } from '@digdir/designsystemet-react';
import { DownloadIcon } from '@navikt/aksel-icons';
import { type JSONValue } from '@fdk-frontend/types';
import { isOpenLicense } from '@fdk-frontend/utils';
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
                distribution.accessURL ||
                'Navnløs distribusjon'
            }
            <div className={styles.tags}>
                {/*{distribution.license && distribution.license.map(l => l.uri)}*/}
                {
                    distribution.license &&
                    distribution.license.some((l: any) => isOpenLicense(l.uri)) &&
                    <Tag
                        className={styles.tag}
                        color='success'
                        size='sm'
                    >
                        Åpne data
                    </Tag>
                }
                {
                    exampleData &&
                    <Tag
                        className={styles.tag}
                        color='neutral'
                        size='sm'
                    >
                        Eksempeldata
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