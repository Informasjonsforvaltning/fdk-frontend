import Header from '@fdk-frontend/ui/header';
import { getDictionary } from '@fdk-frontend/dictionaries';
import styles from './error-page.module.scss';

export default async function ErrorPage({ children }) {

    const lang = 'nb';
    const { FDK_COMMUNITY_BASE_URI: communityBaseUri = '/', FDK_REGISTRATION_BASE_URI: registrationBaseUri = '/' } =
        process.env;

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
            <main
                id='main'
                className={styles.errorPage}
            >
                <div className={styles.inner}>
                    {children}
                </div>
            </main>
        </>
    );
}
