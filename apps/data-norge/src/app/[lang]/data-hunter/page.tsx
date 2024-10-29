import 'server-only';

import React from 'react';
import type { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';

import { Heading, Paragraph } from '@digdir/designsystemet-react';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import Breadcrumbs, { BreadcrumbsContainer } from '@fdk-frontend/ui/breadcrumbs';
import { getPaths } from '@fdk-frontend/utils';

import DataHunterForm from './components/data-hunter-form';

import styles from './page.module.css';

type DataHunterPageProps = {
    params: Promise<{
        lang: Locale['code'];
    }>;
};

const DataHunterPage = async (props: DataHunterPageProps) => {
    const params = await props.params;

    const {
        lang
    } = params;

    // Opt-in dynamic rendering
    await noStore();

    const dictionary = await getDictionary(lang, 'data-hunter-page');
    const commonDictionary = await getDictionary(lang, 'common');

    const { FDK_DATA_NORGE_BASE_URI, FDK_BASE_URI = '/' } = process.env;

    const baseUri = FDK_DATA_NORGE_BASE_URI || FDK_BASE_URI;

    const breadcrumbList = [
        {
            href: getPaths(baseUri).dataHunter,
            text: dictionary.dataHunter,
        },
    ];

    return (
        <>
            <BreadcrumbsContainer>
                <Breadcrumbs
                    baseUri={baseUri}
                    breadcrumbList={breadcrumbList}
                    dictionary={commonDictionary}
                />
            </BreadcrumbsContainer>
            <div className={styles.contentContainer}>
                <Heading
                    size='xlarge'
                    spacing
                >
                    {dictionary.dataHunterForm.title}
                </Heading>
                <Paragraph
                    size='large'
                    spacing
                >
                    {dictionary.dataHunterForm.description}
                </Paragraph>
                <DataHunterForm dictionary={dictionary} />
            </div>
        </>
    );
};

export const generateMetadata = async (props: DataHunterPageProps): Promise<Metadata> => {
    const params = await props.params;
    const dictionary = await getDictionary(params.lang, 'data-hunter-page');

    return {
        title: dictionary.metadata.title,
        description: dictionary.metadata.description,
    };
};

export default DataHunterPage;
