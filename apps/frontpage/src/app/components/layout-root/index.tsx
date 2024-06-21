import 'server-only';

import "./global.css";

import { ReactNode } from 'react';
import { getDictionary, i18n, type Locale } from '@fdk-frontend/dictionaries';
import cn from 'classnames';

import { Footer } from '@fdk-frontend/ui/footer';
import { Header } from '../header';

import styles from './layout-root.module.css';

export type RootLayoutProps = {
  children: ReactNode;
  params: {
    lang: Locale['code'];
  },
  title?: string;
  frontpage?: boolean;
};

const generateStaticParams = async () => i18n.locales.map((locale: Locale) => ({ lang: locale.code }));

const RootLayout = async ({ children, params, title, frontpage }: RootLayoutProps) => {

  const dictionary = await getDictionary(params.lang);

  const {
    FDK_BASE_URI,
    FDK_COMMUNITY_BASE_URI,
    FDK_REGISTRATION_BASE_URI,
    FDK_USE_DEMO_LOGO
  } = process.env;

  // const baseUri = FDK_BASE_URI ?? '/';
  const baseUri = '/';
  const communityBaseUri = FDK_COMMUNITY_BASE_URI ?? '/';
  const registrationBaseUri = FDK_REGISTRATION_BASE_URI ?? '/';
  const useDemoLogo = FDK_USE_DEMO_LOGO === 'true';

  return (
    <html lang={params.lang}>
      <body className={cn({ 'frontpage': frontpage, [styles.frontpageBody]: frontpage })}>
        <Header
          dictionary={dictionary}
          baseUri={baseUri}
          registrationBaseUri={registrationBaseUri}
          communityBaseUri={communityBaseUri}
          useDemoLogo={useDemoLogo}
        />
        <main>{children}</main>
        <Footer
          dictionary={dictionary}
          baseUri={baseUri}
        />
      </body>
    </html>
  );
};

const getMetadata = ({ title, description }: { title: string, description: string }) => ({
  title: title,
  description: description,
  alternates: {
    stylesheet: 'https://altinncdn.no/fonts/inter/inter.css'
  },
});

export { RootLayout, generateStaticParams, getMetadata };
