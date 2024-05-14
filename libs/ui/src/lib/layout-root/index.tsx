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
  return (
    <html lang={params.lang}>
      <body>
        <Header dictionary={dictionary} />
        <main>{children}</main>
        <Footer dictionary={dictionary} />
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
