import React from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import { EntityType } from '@fellesdatakatalog/types';
import { Markdown } from '@fdk-frontend/ui';
import { type LocaleCodes } from '@fdk-frontend/localization';
import { getSlug } from '@fdk-frontend/utils';

import styles from './result-item.module.scss';

export type ItemObjectType = {
    id: string;
    title: string;
    description: string;
    type: EntityType;
    publisher: string;
    publisherId: string;
};

type ResultItemProps = {
    item: ItemObjectType;
    locale: LocaleCodes;
};

const ResultItem = ({ item, locale, ...rest }: ResultItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const slug = getSlug(item, locale);
    const href =
        item.type === EntityType.DATA_SERVICE
            ? `/${locale}/data-services/${item.id}/${slug}`
            : `/${locale}/datasets/${item.id}/${slug}`;

    return (
        <Link
            href={href}
            className={styles.link}
            data-color-scheme='dark'
            {...rest}
        >
            <div>
                <Heading
                    className={styles.heading}
                    level={4}
                    data-size='2xs'
                >
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.publisher}> ({item.publisher})</span>
                </Heading>
                <div className={styles.description}>
                    <Markdown locale={locale}>{item.description}</Markdown>
                </div>
            </div>
        </Link>
    );
};

export { ResultItem };
