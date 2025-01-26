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
                    {api.fdkFormatPrefixed?.map((format, i) => (
                        <Tag
                            className={styles.tag}
                            color='info'
                            size='sm'
                            key={format}
                        >
                            {
                                /*
                                    Here we strip the value of 'MEDIA_TYPE ' string because
                                    values are given like this:

                                    "fdkFormatPrefixed":
                                    [
                                        "MEDIA_TYPE application/gml+xml",
                                        "MEDIA_TYPE text/csv",
                                        "MEDIA_TYPE application/json"
                                    ]

                                    And then use mime-types library to get extension.
                                */
                                mime.extension(format.replace('MEDIA_TYPE ', ''))
                            }
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
                    <Link href={api.uri}>
                        Gå til API
                        <ArrowRightIcon fontSize='1.2em' />
                    </Link>
                </Button>
            </div>
        </div>
	);
}

export default ApiHeader;