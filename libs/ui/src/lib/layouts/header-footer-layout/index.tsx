import { PropsWithChildren } from "react";
import { type RootLayoutProps } from "../root-layout";
import HeaderLayout from "../header-layout";
import FooterLayout from "../footer-layout";

const HeaderFooterLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
  const { lang } = await params;
  return (
    <HeaderLayout
      locale={lang}
      showSearchInput
      catalogPortalBaseUri={process.env.CATALOG_PORTAL_BASE_URI ?? ""}
      adminGuiBaseUri={process.env.ADMIN_GUI_BASE_URI ?? ""}
    >
      <FooterLayout locale={lang}>{children}</FooterLayout>
    </HeaderLayout>
  );
};

export default HeaderFooterLayout;
