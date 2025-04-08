import { redirect, notFound } from 'next/navigation';
import { Spinner, Paragraph } from '@digdir/designsystemet-react';
import { getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
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

    const dictionary = await getDictionary(lang, 'common');

    try {
        const destination = await getAccessRequestDestination({ lang, kind, id });
        redirect(destination);
    } catch (err) {
        notFound();
        throw err;
    }

    return (
        <div className={styles.wrapper}>
            <div style={{ textAlign: 'center' }}>
                <Spinner
                    title={dictionary.general.redirecting}
                    size='md'
                    variant='interaction'
                    aria-hidden
                />
                <Paragraph>{dictionary.general.redirecting}</Paragraph>
            </div>
        </div>
    );
};

export const generateMetadata = async (props: AccessRequestPageProps) => {
    const params = await props.params;
    const dictionary = await getDictionary(params.lang, 'common');

    return {
        title: `${dictionary.general.redirecting} - data.norge.no`,
    };
};

export default AccessRequestPage;
