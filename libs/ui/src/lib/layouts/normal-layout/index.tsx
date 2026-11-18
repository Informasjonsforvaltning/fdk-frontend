import { PropsWithChildren } from "react";
import { type RootLayoutProps } from "../root-layout";
import HeaderLayout from "../header-layout";
import FooterLayout from "../footer-layout";
import FeedbackBanner from "../../feedback-banner";
import { Profile } from "@fdk-frontend/types";

type NormalLayoutProps = RootLayoutProps & {
  profile?: Profile;
};

const NormalLayout = async ({ children, params, profile }: PropsWithChildren & NormalLayoutProps) => {
  const { lang } = await params;
  const communityBaseUri = process.env.FDK_COMMUNITY_BASE_URI;

  return (
    <HeaderLayout
      locale={lang}
      showSearchInput
      profile={profile}
      catalogPortalBaseUri={process.env.CATALOG_PORTAL_BASE_URI ?? ""}
      adminGuiBaseUri={process.env.ADMIN_GUI_BASE_URI ?? ""}
    >
      <FooterLayout
        locale={lang}
        profile={profile}
      >
        <main id="main">
          {children}
          {!(profile === "transportportal") && (
            <FeedbackBanner
              locale={lang}
              communityBaseUri={communityBaseUri as string}
            />
          )}
        </main>
      </FooterLayout>
    </HeaderLayout>
  );
};

export default NormalLayout;
