import { PropsWithChildren } from "react";
import { NormalLayout } from "@fdk-frontend/ui";
import { LocaleCodes } from "@fdk-frontend/localization";
import { getProfile } from "@fdk-frontend/utils/server";

type SiteLayoutProps = PropsWithChildren & {
  params: Promise<{ lang: LocaleCodes }>;
};

const SiteLayout = async ({ children, params }: SiteLayoutProps) => {
  const profile = await getProfile();

  return (
    <NormalLayout
      params={params}
      profile={profile}
    >
      {children}
    </NormalLayout>
  );
};

export default SiteLayout;
