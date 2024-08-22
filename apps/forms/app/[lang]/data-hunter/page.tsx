import 'server-only';

import React from 'react';
import type { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';

import { Heading, Paragraph } from '@digdir/designsystemet-react';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import { Breadcrumbs } from '@fdk-frontend/ui/breadcrumbs';
import { getPaths } from '@fdk-frontend/utils';

import DataHunterForm from './components/data-hunter-form';

import styles from './page.module.css';

type DataHunterPageProps = {
    params: {
        lang: Locale['code'];
    };
};

const DataHunterPage = async ({ params: { lang } }: DataHunterPageProps) => {
    // Opt-in dynamic rendering
    noStore();

    const dictionary = await getDictionary(lang, 'data-hunter-page');

    const { FDK_BASE_URI } = process.env;

    const baseUri = FDK_BASE_URI ?? '/';

    const breadcrumbList = [
        {
            href: getPaths(baseUri).forms,
            text: dictionary.forms,
        },
        {
            href: getPaths(baseUri).dataHunter,
            text: dictionary.dataHunter,
        },
    ];

    return (
        <div>
            <Breadcrumbs
                baseUri={baseUri}
                breadcrumbList={breadcrumbList}
                dictionary={dictionary}
            />
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
        </div>
    );
};

export const generateMetadata = async ({ params }: DataHunterPageProps): Promise<Metadata> => {
    const dictionary = await getDictionary(params.lang, 'data-hunter-page');

    return {
        title: dictionary.metadata.title,
        description: dictionary.metadata.description,
    };
};

export default DataHunterPage;
