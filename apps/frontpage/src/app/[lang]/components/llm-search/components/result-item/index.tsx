import React from 'react';
import { Heading } from '@digdir/designsystemet-react';
import Markdown from '@fdk-frontend/ui/markdown';
import CatalogSymbol from '@fdk-frontend/ui/catalog-symbol';

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
};

const getDatasetLink = (datasetId: string) => {
    const baseUrl = 'https://staging.fellesdatakatalog.digdir.no/datasets/';
    return `${baseUrl}${datasetId}`;
};

const ResultItem = ({ item, ...rest }: ResultItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
        href={getDatasetLink(item.id)}
        className={styles.link}
    >
        <CatalogSymbol
            className={styles.icon}
            catalog='datasets'
        />
        <div>
            <Heading
                className={styles.heading}
                level={4}
                size='xxsmall'
            >
                <span className={styles.title}>{item.title}</span>
                <span className={styles.publisher}> ({item.publisher})</span>
            </Heading>
            <Markdown className={styles.description}>{item.description}</Markdown>
        </div>
    </a>
);

export { ResultItem };
