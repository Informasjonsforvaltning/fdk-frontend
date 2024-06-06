import 'server-only';

import { ReactNode } from 'react';
import { getDictionary, i18n, type Locale } from '@fdk-frontend/dictionaries';
import { Header } from '../header';
import { Footer } from '../footer';

import './global.css';

type RootLayoutProps = {
  children: ReactNode;
  params: {
    lang: Locale['code'];
  };
};

const generateStaticParams = async () => i18n.locales.map((locale: Locale) => ({ lang: locale.code }));

const RootLayout = async ({ children, params }: RootLayoutProps) => {
  const dictionary = await getDictionary(params.lang);

  const { FDK_BASE_URI, FDK_COMMUNITY_BASE_URI, FDK_REGISTRATION_BASE_URI, FDK_USE_DEMO_LOGO } = process.env;

  const baseUri = FDK_BASE_URI ?? '/';
  const communityBaseUri = FDK_COMMUNITY_BASE_URI ?? '/';
  const registrationBaseUri = FDK_REGISTRATION_BASE_URI ?? '/';
  const useDemoLogo = FDK_USE_DEMO_LOGO === 'true';

  return (
    <html lang={params.lang}>
      <body>
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

const getMetadata = (title: string, description: string) => ({
  title: title,
  description: description,
  alternates: {
    stylesheet: 'https://altinncdn.no/fonts/inter/inter.css',
  },
});

export { RootLayout, generateStaticParams, getMetadata };
