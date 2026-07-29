import "../../core/global.scss";
import { PropsWithChildren } from "react";
import { i18n, type Locale } from "@fdk-frontend/localization";
import { ConsentProvider } from "../../consent/consent-context";
import { ConsentBanner } from "../../consent/consent-banner";
import { SiteimproveScript } from "../../consent/siteimprove-script";

export type RootLayoutProps = {
  params: Promise<{
    lang: Locale["code"];
  }>;
};

const generateStaticParams = async () => i18n.locales.map((locale: Locale) => ({ lang: locale.code }));

const RootLayout = async ({ children, params }: RootLayoutProps & PropsWithChildren) => {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body>
        <ConsentProvider>
          <ConsentBanner locale={lang} />
          {children}
          <SiteimproveScript />
        </ConsentProvider>
      </body>
    </html>
  );
};

export default RootLayout;
export { generateStaticParams };
