import React, { ReactNode } from 'react';
import { i18n, type Locale } from '@fdk-frontend/dictionaries';
import './global.css';

interface Props {
  children: ReactNode;
  params: { lang: Locale };
}

export const generateStaticParams = async () => i18n.locales.map((locale: Locale) => ({ lang: locale }));

const RootLayout = ({ children, params }: Props) => (
  <html lang={params.lang}>
    <body>{children}</body>
  </html>
);

export const metadata = {
  title: 'Contact Form',
  description: 'Contact Form',
};

export default RootLayout;
