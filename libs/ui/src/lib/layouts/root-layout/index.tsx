import 'server-only';
import '../../core/global.scss';
import { PropsWithChildren } from 'react';
import Script from 'next/script';
import { i18n, type Locale } from '@fdk-frontend/dictionaries';

export type RootLayoutProps = {
    params: Promise<{
        lang: Locale['code'];
    }>;
};

const generateStaticParams = async () => i18n.locales.map((locale: Locale) => ({ lang: locale.code }));

const RootLayout = async ({ children, params }: RootLayoutProps & PropsWithChildren) => {
    const { lang } = await params;
    return (
        <html lang={lang}>
            <body>{children}</body>
            <Script src='https://siteimproveanalytics.com/js/siteanalyze_6255470.js' />
        </html>
    );
};

export default RootLayout;
export { generateStaticParams };
