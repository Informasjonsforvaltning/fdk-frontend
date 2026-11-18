import { PropsWithChildren } from "react";

import Header, { type HeaderProps } from "../../header";

const HeaderLayout = ({
  children,
  locale,
  frontpage,
  showSearchInput,
  profile,
  catalogPortalBaseUri,
  adminGuiBaseUri,
}: HeaderProps & PropsWithChildren) => {
  return (
    <>
      <Header
        locale={locale}
        frontpage={frontpage}
        showSearchInput={showSearchInput}
        profile={profile}
        catalogPortalBaseUri={catalogPortalBaseUri}
        adminGuiBaseUri={adminGuiBaseUri}
      />
      {children}
    </>
  );
};

export default HeaderLayout;
