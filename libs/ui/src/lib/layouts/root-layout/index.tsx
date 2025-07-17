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
            <head>
                {/* Favicon meta tags for better browser and search engine support */}
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#1e2b3c" />
            </head>
            <body>{children}</body>
            <Script src='https://siteimproveanalytics.com/js/siteanalyze_6255470.js' />
        </html>
    );
};

export default RootLayout;
export { generateStaticParams };
