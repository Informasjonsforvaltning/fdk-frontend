import 'server-only';
import React from 'react';
import type { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import { Breadcrumbs } from '@fdk-frontend/ui';
import DataHunterForm from './components/data-hunter-form';
import styles from './page.module.css';

type DataHunterPageProps = {
    params: Promise<{
        lang: Locale['code'];
    }>;
};

const DataHunterPage = async (props: DataHunterPageProps) => {
    const params = await props.params;
    const { lang } = params;
    // Opt-in dynamic rendering
    await noStore();

    const dictionary = await getDictionary(lang, 'data-hunter-page');
    const commonDictionary = await getDictionary(lang, 'common');

    const breadcrumbList = [
        {
            href: `/${lang}/data-hunter`,
            text: dictionary.dataHunter,
        },
    ];

    return (
        <>
            <div style={{ margin: '0 2rem' }}>
                <Breadcrumbs
                    breadcrumbList={breadcrumbList}
                    dictionary={commonDictionary}
                />
            </div>
            <div className={styles.contentContainer}>
                <Heading data-size='xl'>{dictionary.dataHunterForm.title}</Heading>
                <Paragraph data-size='lg'>{dictionary.dataHunterForm.description}</Paragraph>
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
        alternates: {
            canonical: `https://data.norge.no/${params.lang}/data-hunter`,
        },
    };
};

export default DataHunterPage;
