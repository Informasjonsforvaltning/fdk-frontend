import 'server-only';
import React from 'react';
import type { Metadata } from 'next';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { getLocalization, type LocaleCodes } from '@fdk-frontend/localization';
import { Breadcrumbs } from '@fdk-frontend/ui';
import styles from './page.module.css';
import { SparqlEditor } from './components/sparql-editor';

type SparqlPageProps = PageProps<'/[lang]/sparql'>;

const SparqlPage = async (props: SparqlPageProps) => {
    const { lang } = await props.params;
    const locale = lang as LocaleCodes;

    const { FDK_SPARQL_ENDPOINT } = process.env;

    const loc = getLocalization(locale);
    const dictionary = loc.sparqlSandboxPage;

    const breadcrumbList = [
        {
            href: `/${lang}/sparql-sandbox`,
            text: dictionary.title,
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
                <Heading data-size='xl'>{dictionary.title}</Heading>
                <Paragraph data-size='lg'>{dictionary.description}</Paragraph>
                {FDK_SPARQL_ENDPOINT && (
                    <SparqlEditor
                        endpoint={FDK_SPARQL_ENDPOINT}
                        className={styles.sparqlEditor}
                    />
                )}
            </div>
        </>
    );
};

export const generateMetadata = async (props: SparqlPageProps): Promise<Metadata> => {
    const params = await props.params;
    const locale = params.lang as LocaleCodes;
    const dictionary = getLocalization(locale).sparqlSandboxPage;

    return {
        title: dictionary.metadata.title,
        description: dictionary.metadata.description,
        alternates: {
            canonical: `https://data.norge.no/${locale}/sparql-sandbox`,
        },
    };
};

export default SparqlPage;
