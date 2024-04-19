import 'server-only';

import { ReactNode } from 'react';
import { i18n, type Locale } from '@fdk-frontend/dictionaries';
import '@digdir/designsystemet-theme';
import '@digdir/designsystemet-css';
import './global.css';
import { Header } from '../header';

type Props = {
  children: ReactNode;
  params: { lang: Locale };
};

const generateStaticParams = async () => i18n.locales.map((locale: Locale) => ({ lang: locale.code }));

const RootLayout = ({ children, params }: Props) => (
  <html lang={params.lang.code}>
    <body>
      <Header lang={params.lang.code} />
      {children}
    </body>
  </html>
);

const getMetadata = (title: string, description: string) => ({
  title: title,
  description: description,
  alternates: {
    stylesheet: 'https://altinncdn.no/fonts/inter/inter.css',
  },
});

export { RootLayout, generateStaticParams, getMetadata };
