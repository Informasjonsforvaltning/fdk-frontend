import { PropsWithChildren } from 'react';
import { Header } from '@fdk-frontend/ui';
import { getLocalization } from '@fdk-frontend/localization';
import styles from './error-page.module.scss';

export default async function ErrorPage({ children }: PropsWithChildren) {
    const lang = 'nb';
    const commonDictionary = getLocalization(lang).common;
    return (
        <>
            <Header
                dictionary={commonDictionary}
                locale={lang}
                frontpage
            />
            <main
                id='main'
                className={styles.errorPage}
            >
                <div className={styles.inner}>{children}</div>
            </main>
        </>
    );
}
