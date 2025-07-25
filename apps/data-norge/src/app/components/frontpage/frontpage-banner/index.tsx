import React from 'react';

import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { HeadingWithDivider } from '@fdk-frontend/ui';

import LlmSearch from '../llm-search';
import Norgeskart from './components/norgeskart';
import ScrollButton from './components/scroll-button';

import styles from './frontpage-banner.module.scss';

type FrontpageBannerProps = {
    dictionary: Dictionary;
    locale: LocaleCodes;
    endpoint: string;
};

const FrontpageBanner = ({ dictionary, locale, endpoint }: FrontpageBannerProps) => (
    <div
        className={styles.outer}
        id='frontpage-banner'
    >
        <div className={styles.inner}>
            <HeadingWithDivider
                level={1}
                className={styles.headline}
            >
                {dictionary.aiBanner.title}
            </HeadingWithDivider>
            <LlmSearch
                dictionary={dictionary}
                locale={locale}
                endpoint={endpoint}
            />
        </div>
        <div className={styles.gradient} />
        <Norgeskart />
        <ScrollButton />
    </div>
);

export { FrontpageBanner };
