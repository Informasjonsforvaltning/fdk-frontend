import React from 'react';

import { Dictionary } from '@fdk-frontend/dictionaries';
import { HeadingWithDivider } from '@fdk-frontend/ui/typography';

import OrakelSearch from '../orakel-search';
import Norgeskart from './components/norgeskart';

import styles from './frontpage-banner.module.css';

type FrontpageBannerProps = {
    dictionary: Dictionary;
    baseUri: string;
    endpoint: string;
};

const FrontpageBanner = ({ dictionary, baseUri, endpoint }: FrontpageBannerProps) => (
    <div className={styles.outer}>
        <div className={styles.inner}>
            <HeadingWithDivider
                level={1}
                className={styles.headline}
            >
                {dictionary.aiBanner.title}
            </HeadingWithDivider>
            <OrakelSearch
                dictionary={dictionary}
                baseUri={baseUri}
                endpoint={endpoint}
            />
        </div>
        <Norgeskart />
    </div>
);

export { FrontpageBanner };
