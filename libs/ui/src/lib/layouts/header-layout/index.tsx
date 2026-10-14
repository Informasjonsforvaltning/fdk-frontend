import { PropsWithChildren } from "react";

import Header, { type HeaderProps } from "../../header";

const HeaderLayout = ({
  children,
  locale,
  frontpage,
  showSearchInput,
  showFindDataButton,
  profile,
}: HeaderProps & PropsWithChildren) => {
  return (
    <>
      <Header
        locale={locale}
        frontpage={frontpage}
        showSearchInput={showSearchInput}
        showFindDataButton={showFindDataButton}
        profile={profile}
      />
      {children}
    </>
  );
};

export default HeaderLayout;
