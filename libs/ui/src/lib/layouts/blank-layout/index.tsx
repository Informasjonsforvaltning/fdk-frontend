import { PropsWithChildren } from "react";
import { type RootLayoutProps } from "../root-layout";
import ConsentReopenButton from "../../consent/consent-reopen-button";
import styles from "./blank-layout.module.scss";

const BlankLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
  const { lang } = await params;

  return (
    <div>
      {children}
      {/* Keep the consent-change control reachable even on chrome-less pages. */}
      <div className={styles.consentFooter}>
        <ConsentReopenButton locale={lang} />
      </div>
    </div>
  );
};

export default BlankLayout;
