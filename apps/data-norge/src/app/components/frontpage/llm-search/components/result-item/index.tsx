import React from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import { Markdown } from '@fdk-frontend/ui';
import { type LocaleCodes } from '@fdk-frontend/localization';
import { getSlug } from '@fdk-frontend/utils';
import { type LlmSearchResult } from '@fdk-frontend/data-access';

import styles from './result-item.module.scss';

export type ItemObjectType = LlmSearchResult;

type ResultItemProps = {
    item: ItemObjectType;
    locale: LocaleCodes;
};

const ResultItem = ({ item, locale, ...rest }: ResultItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {    
    // Generate slug for resources displayed in fdk-frontend (not used in fdk-portal)
    const slug = item.type.toLowerCase() === "dataset" ||item.type.toLowerCase().replace("_","") === "dataservice" ||item.type.toLowerCase() === "service" ? getSlug(item, locale) : "";

    const catalogTypeToStr = new Map<string, string>([
      ["DATASET", `${locale}/datasets`],
      ["DATA_SERVICE", `${locale}/data-services`],
      ["CONCEPT", "concepts"],
      ["INFORMATION_MODEL", "information_models"],
      ["SERVICE", `${locale}/services`]
    ])

    const urlStr = `/${catalogTypeToStr.get(item.type)}/${item.id}/${slug}`;

    return (
        <Link
            href={urlStr}
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
