// eslint-disable-next-line
import { redirect, notFound } from 'next/navigation';
import { Spinner, Paragraph } from '@digdir/designsystemet-react';
import { getLocalization, type LocaleCodes } from '@fdk-frontend/localization';
import { getAccessRequestDestination } from '@fdk-frontend/data-access/server';
import styles from './access-request-page.module.scss';
import { CatalogTypes } from '@fdk-frontend/types';

type AccessRequestPageProps = PageProps<'/[lang]/access-request/[...slug]'>;

const AccessRequestPage = async (props: AccessRequestPageProps) => {
    const { lang, slug } = await props.params;
    const locale = lang as LocaleCodes;
    const [kind, id] = slug;

    const dictionary = getLocalization(locale).common;
    let destination;

    try {
        destination = await getAccessRequestDestination({ lang: locale, kind: kind as CatalogTypes, id });
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
    const dictionary = getLocalization(params.lang as LocaleCodes).common;

    return {
        title: `${dictionary.general.redirecting} - data.norge.no`,
    };
};

export default AccessRequestPage;
