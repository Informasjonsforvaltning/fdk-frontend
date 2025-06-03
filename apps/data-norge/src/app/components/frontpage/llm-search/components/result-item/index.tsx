import React from 'react';
import { Heading } from '@digdir/designsystemet-react';
import Markdown from '@fdk-frontend/ui/markdown';
import { type LocaleCodes } from '@fdk-frontend/dictionaries';

import styles from './result-item.module.scss';

export type ItemObjectType = {
    id: string;
    title: string;
    description: string;
    type: string;
    publisher: string;
    publisherId: string;
};

type ResultItemProps = {
    item: ItemObjectType;
    locale: LocaleCodes;
};

const ResultItem = ({ item, locale, ...rest }: ResultItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
        href={`/${locale}/datasets/${item.id}`}
        className={styles.link}
        {...rest}
    >
        <div>
            <Heading
                className={styles.heading}
                level={4}
                size='xxsmall'
            >
                <span className={styles.title}>{item.title}</span>
                <span className={styles.publisher}> ({item.publisher})</span>
            </Heading>
            <div className={styles.description}>
                <Markdown locale={locale}>{item.description}</Markdown>
            </div>
        </div>
    </a>
);

export { ResultItem };
