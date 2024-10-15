import 'server-only';

import '../../core/global.scss';

import { PropsWithChildren } from 'react';
import { getDictionary, i18n, type Locale } from '@fdk-frontend/dictionaries';

import Footer from '../../footer';
// import Header from '../../header';
import Script from 'next/script';

export type RootLayoutProps = {
    params: {
        lang: Locale['code'];
    };
    frontpage?: boolean;
};

const generateStaticParams = async () => i18n.locales.map((locale: Locale) => ({ lang: locale.code }));

const RootLayout = async ({ children, params, frontpage }: RootLayoutProps & PropsWithChildren) => {
    const dictionary = await getDictionary(params.lang, 'common');

    const {
        FDK_DATA_NORGE_BASE_URI,
        FDK_BASE_URI = '',
        FDK_COMMUNITY_BASE_URI: communityBaseUri = '/',
        FDK_REGISTRATION_BASE_URI: registrationBaseUri = '/',
    } = process.env;

    const baseUri = FDK_DATA_NORGE_BASE_URI || FDK_BASE_URI;

    return (
        <html lang={params.lang}>
            <body>
                {/*<Header
                    dictionary={dictionary}
                    baseUri={baseUri}
                    registrationBaseUri={registrationBaseUri}
                    communityBaseUri={communityBaseUri}
                    frontpage={frontpage}
                />*/}
                {/*<main id='main'>{children}</main>*/}
                {children}
                <Footer
                    dictionary={dictionary}
                    baseUri={baseUri}
                />
            </body>
            <Script src='https://siteimproveanalytics.com/js/siteanalyze_6255470.js' />
        </html>
    );
};

export default RootLayout;
export { generateStaticParams };
