import type { Metadata } from "next";
import { RootLayout as RootLayoutBase, generateStaticParams } from "@fdk-frontend/ui";
import { PropsWithChildren } from "react";
import { LocaleCodes } from "@fdk-frontend/localization";
import { getProfile } from "@fdk-frontend/utils/server";
import { getSite } from "../../utils/site";

export const generateMetadata = async (): Promise<Metadata> => {
  const site = await getSite();

  return {
    applicationName: site.name,
    openGraph: {
      siteName: site.name,
    },
  };
};

const RootLayout = async ({
  children,
  params,
}: PropsWithChildren & {
  params: Promise<{ lang: string }>;
}) => {
  const typedParams = params as Promise<{ lang: LocaleCodes }>;
  const profile = await getProfile();

  return (
    <RootLayoutBase
      params={typedParams}
      profile={profile}
    >
      {children}
    </RootLayoutBase>
  );
};

export default RootLayout;
export { generateStaticParams };
