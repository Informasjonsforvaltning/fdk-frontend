
import { redirect, notFound } from 'next/navigation';
import { Spinner, Paragraph } from '@digdir/designsystemet-react';
import { getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import styles from './access-request-page.module.scss';

export type AccessRequestPageProps = {
    params: Promise<{
        lang: LocaleCodes;
        slug: string[];
    }>;
};

const AccessRequestPage = async (props: AccessRequestPageProps) => {
    const { ACCESS_REQUEST_API_HOST } = process.env;
    const { lang, slug } = await props.params;
    const dictionary = await getDictionary(lang, 'common');
    const [ kind, id ] = slug;
    
    const url = `${ACCESS_REQUEST_API_HOST}/access-request/${lang}/${kind}/${id}`;
    const response = await fetch(url, { method: 'POST' });
    if (!response.ok) notFound();
    
    const destination = await response.text();
    redirect(destination);

    return (
        <div className={styles.wrapper}>
            <div style={{textAlign:'center'}}>
                <Spinner title={dictionary.general.redirecting} size='md' variant='interaction' aria-hidden />
                <Paragraph>{dictionary.general.redirecting}</Paragraph>
            </div>
        </div>
    );
}

export const generateMetadata = async (props: AccessRequestPageProps) => {
    const params = await props.params;
    const dictionary = await getDictionary(params.lang, 'common');

    return {
        title: `${dictionary.general.redirecting} - data.norge.no`,
    };
}


export default AccessRequestPage;