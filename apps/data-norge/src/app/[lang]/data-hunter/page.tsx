import 'server-only';
import React from 'react';
import type { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { getLocalization, LocaleCodes } from '@fdk-frontend/localization';
import { Breadcrumbs } from '@fdk-frontend/ui';
import DataHunterForm from './components/data-hunter-form';
import styles from './page.module.css';

type DataHunterPageProps = PageProps<'/[lang]/data-hunter'>;

const DataHunterPage = async (props: DataHunterPageProps) => {
    const params = await props.params;
    const { lang } = params;
    const locale = lang as LocaleCodes;
    // Opt-in dynamic rendering
    await noStore();

    const loc = getLocalization(locale);
    const dictionary = loc.dataHunterPage;

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
                    locale={locale}
                />
            </div>
            <div className={styles.contentContainer}>
                <Heading data-size='xl'>{dictionary.dataHunterForm.title}</Heading>
                <Paragraph data-size='lg'>{dictionary.dataHunterForm.description}</Paragraph>
                <DataHunterForm
                    dictionary={dictionary}
                    locale={locale}
                />
            </div>
        </>
    );
};

export const generateMetadata = async (props: DataHunterPageProps): Promise<Metadata> => {
    const params = await props.params;
    const locale = params.lang as LocaleCodes;
    const dictionary = getLocalization(locale).dataHunterPage;

    return {
        title: dictionary.metadata.title,
        description: dictionary.metadata.description,
        alternates: {
            canonical: `https://data.norge.no/${locale}/data-hunter`,
        },
    };
};

export default DataHunterPage;
