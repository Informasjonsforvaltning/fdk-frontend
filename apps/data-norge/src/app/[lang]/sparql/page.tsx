import 'server-only';
import React from 'react';
import type { Metadata } from 'next';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { getLocalization, type Locale } from '@fdk-frontend/localization';
import { Breadcrumbs } from '@fdk-frontend/ui';
import styles from './page.module.css';
import { SparqlEditor } from './components/sparql-editor';

type SparqlPageProps = {
    params: Promise<{
        lang: Locale['code'];
    }>;
};

const SparqlPage = async (props: SparqlPageProps) => {
    const params = await props.params;
    const { lang } = params;

    const { FDK_SPARQL_ENDPOINT } = process.env;

    const loc = getLocalization(lang);
    const dictionary = loc.sparqlSandboxPage;
    const commonDictionary = loc.common;

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
                    dictionary={commonDictionary}
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
    const dictionary = getLocalization(params.lang).sparqlSandboxPage;

    return {
        title: dictionary.metadata.title,
        description: dictionary.metadata.description,
        alternates: {
            canonical: `https://data.norge.no/${params.lang}/sparql-sandbox`,
        },
    };
};

export default SparqlPage;
