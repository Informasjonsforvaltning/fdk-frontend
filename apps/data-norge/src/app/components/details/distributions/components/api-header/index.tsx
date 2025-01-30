import { PropsWithChildren } from 'react';
import mime from 'mime-types';
import { Button, Link, Tag } from '@digdir/designsystemet-react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { type JSONValue } from '@fdk-frontend/types';
import { type LocaleCodes, i18n } from '@fdk-frontend/dictionaries';
import styles from '../distribution-header/distribution-header.module.scss';

type ApiHeaderProps = {
    api: JSONValue;
    locale: LocaleCodes;
}

const ApiHeader = ({ api, locale, ...props }: ApiHeaderProps & PropsWithChildren) => {
	return (
		<div className={styles.headerContent}>
            <span className={styles.title}>
                {
                    api.title?.[locale] ||
                    api.title?.[i18n.defaultLocale]
                }
                <div className={styles.tags}>
                    {api.fdkFormat?.filter((format: any) => format?.code).map((format: any, i: number) => (
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
                    <Link href={`/data-services/${api.id}`}>
                        Gå til API
                        <ArrowRightIcon fontSize='1.2em' />
                    </Link>
                </Button>
            </div>
        </div>
	);
}

export default ApiHeader;