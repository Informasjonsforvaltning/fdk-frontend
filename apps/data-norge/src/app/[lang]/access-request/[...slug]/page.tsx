// eslint-disable-next-line
import { redirect, notFound } from 'next/navigation';
import { Spinner, Paragraph } from '@digdir/designsystemet-react';
import { getLocalization, type LocaleCodes } from '@fdk-frontend/localization';
import { getAccessRequestDestination } from '@fdk-frontend/data-access/server';
import { type CatalogTypes } from '@fdk-frontend/types';
import styles from './access-request-page.module.scss';

export type AccessRequestPageProps = {
    params: Promise<{
        lang: LocaleCodes;
        slug: [CatalogTypes, string];
    }>;
};

const AccessRequestPage = async (props: AccessRequestPageProps) => {
    const { lang, slug } = await props.params;
    const [kind, id] = slug;

    const dictionary = getLocalization(lang).common;
    let destination;

    try {
        destination = await getAccessRequestDestination({ lang, kind, id });
    } catch (err) {
        console.error(`Failed to get access request destination`, JSON.stringify(err));
        notFound();
    }

    redirect(destination);

    return (
        <div className={styles.wrapper}>
            <div style={{ textAlign: 'center' }}>
                <Spinner
                    aria-label={dictionary.general.redirecting}
                    data-size='md'
                    aria-hidden
                />
                <Paragraph>{dictionary.general.redirecting}</Paragraph>
            </div>
        </div>
    );
};

export const generateMetadata = async (props: AccessRequestPageProps) => {
    const params = await props.params;
    const dictionary = getLocalization(params.lang).common;

    return {
        title: `${dictionary.general.redirecting} - data.norge.no`,
    };
};

export default AccessRequestPage;
