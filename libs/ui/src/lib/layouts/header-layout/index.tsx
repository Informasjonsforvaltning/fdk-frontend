import { PropsWithChildren } from "react";

import Header, { type HeaderProps } from "../../header";

const HeaderLayout = ({ children, locale, frontpage, showSearchInput, profile }: HeaderProps & PropsWithChildren) => {
  return (
    <>
      <Header
        locale={locale}
        frontpage={frontpage}
        showSearchInput={showSearchInput}
        profile={profile}
      />
      {children}
    </>
  );
};

export default HeaderLayout;
