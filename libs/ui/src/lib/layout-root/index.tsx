import 'server-only';

import "./global.scss";

import { PropsWithChildren } from 'react';
import { getDictionary, i18n, type Locale } from '@fdk-frontend/i18n';
import cn from 'classnames';

import Footer from '../footer';
import Header from '../header';

export type RootLayoutProps = {
  params: {
    lang: Locale['code'];
  },
  className?: string;
};

const generateStaticParams = async () => i18n.locales.map((locale: Locale) => ({ lang: locale.code }));

const RootLayout = async ({ children, className, params }: RootLayoutProps & PropsWithChildren) => {

  const dictionary = await getDictionary(params.lang, 'common');

  const {
    FDK_BASE_URI: baseUri = '/',
    FDK_COMMUNITY_BASE_URI: communityBaseUri = '/',
    FDK_REGISTRATION_BASE_URI: registrationBaseUri = '/',
  } = process.env;

  return (
    <html lang={params.lang}>
      <body className={cn(className)}>
        <Header
          dictionary={dictionary}
          baseUri={baseUri}
          registrationBaseUri={registrationBaseUri}
          communityBaseUri={communityBaseUri}
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

export { RootLayout, generateStaticParams };
