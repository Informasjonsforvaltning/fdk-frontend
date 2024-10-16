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
};

const generateStaticParams = async () => i18n.locales.map((locale: Locale) => ({ lang: locale.code }));

const RootLayout = async ({ children, params }: RootLayoutProps & PropsWithChildren) => {
    const dictionary = await getDictionary(params.lang, 'common');
    return (
        <html lang={params.lang}>
            <body>
                {children}
                <Footer
                    dictionary={dictionary}
                    baseUri={`/${params.lang}`}
                />
            </body>
            <Script src='https://siteimproveanalytics.com/js/siteanalyze_6255470.js' />
        </html>
    );
};

export default RootLayout;
export { generateStaticParams };
