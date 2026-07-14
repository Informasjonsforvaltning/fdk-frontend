import { PropsWithChildren } from "react";

import Footer, { type FooterProps } from "../../footer";

const FooterLayout = ({ children, locale, profile }: FooterProps & PropsWithChildren) => {
  return (
    <>
      {children}
      <Footer
        locale={locale}
        profile={profile}
      />
    </>
  );
};

export default FooterLayout;
