import "../../core/global.scss";
import { PropsWithChildren } from "react";
import { i18n, type Locale } from "@fdk-frontend/localization";
import { type Profile } from "@fdk-frontend/types";
import { getDataNorgePublicOrigin } from "@fdk-frontend/utils/data-norge-origin";
import { ConsentProvider } from "../../consent/consent-context";
import { ConsentBanner } from "../../consent/consent-banner";
import { SiteimproveScript } from "../../consent/siteimprove-script";
import { DataNorgeOriginProvider } from "../../internal-link/origin-context";

export type RootLayoutProps = {
  params: Promise<{
    lang: Locale["code"];
  }>;
};

const generateStaticParams = async () => i18n.locales.map((locale: Locale) => ({ lang: locale.code }));

const RootLayout = async ({
  children,
  params,
  profile = "data.norge",
}: RootLayoutProps & PropsWithChildren & { profile?: Profile }) => {
  const { lang } = await params;
  const dataNorgeOrigin = getDataNorgePublicOrigin();

  return (
    <html lang={lang}>
      <body data-profile={profile}>
        <DataNorgeOriginProvider origin={dataNorgeOrigin}>
          <ConsentProvider>
            <ConsentBanner locale={lang} />
            {children}
            <SiteimproveScript />
          </ConsentProvider>
        </DataNorgeOriginProvider>
      </body>
    </html>
  );
};

export default RootLayout;
export { generateStaticParams };
