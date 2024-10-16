import type { Metadata } from 'next';

import { Link, Button, Heading } from '@digdir/designsystemet-react';

import { getDictionary } from '@fdk-frontend/dictionaries';
import Header from '@fdk-frontend/ui/header';

import styles from './not-found.module.scss';

export default async function NotFound() {
    const lang = 'nb';
    const {
        FDK_COMMUNITY_BASE_URI: communityBaseUri = '/',
        FDK_REGISTRATION_BASE_URI: registrationBaseUri = '/'
    } = process.env;

    const commonDictionary = await getDictionary(lang, 'common');

    return (
        <>
            <Header
                dictionary={commonDictionary}
                baseUri={`/${lang}`}
                registrationBaseUri={registrationBaseUri}
                communityBaseUri={communityBaseUri}
                frontpage
            />
            <main id='main' className={styles.notFoundPage}>
                <div className={styles.inner}>
                    <Heading
                        level={1}
                        size='medium'
                    >
                        404: Siden ble ikke funnet ☹️
                    </Heading>
                    <p>Vi klarte dessverre ikke å finne siden du ba om.</p>
                    <Button
                        asChild
                        variant='primary'
                        size='small'
                    >
                        <Link href='/'>Gå til forsiden</Link>
                    </Button>
                </div>
            </main>
        </>
    );
}

export const metadata: Metadata = {
    title: '404 - data.norge.no',
    description: "Siden ble ikke funnet",
};
