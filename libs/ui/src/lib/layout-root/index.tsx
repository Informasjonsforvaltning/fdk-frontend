import 'server-only';

import "./global.scss";

import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import { getDictionary, i18n, type Locale } from '@fdk-frontend/dictionaries';
import cn from 'classnames';

import Footer from '@fdk-frontend/ui/footer';
import Header from '@fdk-frontend/ui/header';
import headerStyles from '@fdk-frontend/ui/header/header.module.scss';

import styles from './layout-root.module.css';

type RootLayoutProps = {
  params: {
    lang: Locale['code'];
  }
};

const generateStaticParams = async () => i18n.locales.map((locale: Locale) => ({ lang: locale.code }));

const RootLayout = async ({ children, params }: RootLayoutProps & PropsWithChildren) => {

  const dictionary = await getDictionary(params.lang, 'common');

  const {
    FDK_BASE_URI: baseUri = '',
    FDK_COMMUNITY_BASE_URI: communityBaseUri = '/',
    FDK_REGISTRATION_BASE_URI: registrationBaseUri = '/',
  } = process.env;

  return (
    <html lang={params.lang}>
      <body>
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

export default RootLayout
export { RootLayoutProps, generateStaticParams };
