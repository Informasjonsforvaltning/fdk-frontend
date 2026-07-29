import { type LocaleCodes, getLocalization } from "@fdk-frontend/localization";
import { LogoLink, DpgLink, DigdirLogoLink } from "../logo";
import LanguageSwitcher from "../language-switcher";
import MainMenu from "../main-menu";
import TransportportalFooter from "./transportportal-footer";
import styles from "./footer.module.scss";
import { HStack } from "@fellesdatakatalog/ui";

export type FooterProfile = "default" | "transportportal";

export type FooterProps = {
  locale: LocaleCodes;
  profile?: FooterProfile;
};

const Footer = ({ locale, profile = "default" }: FooterProps) => {
  const dictionary = getLocalization(locale).common;

  if (profile === "transportportal") {
    return <TransportportalFooter locale={locale} />;
  }

  return (
    <footer
      className={styles.footer}
      aria-label="Footer"
      data-color-scheme="dark"
    >
      <div className={styles.inner}>
        <MainMenu
          className={styles.footerNav}
          locale={locale}
          motionProps={{
            initial: "show",
          }}
        />
        <LanguageSwitcher loc={locale} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <HStack className={styles.leftLogos}>
            <LogoLink
              href={`/${locale}`}
              data-color-scheme="dark"
            />
            <DpgLink
              href="https://www.digitalpublicgoods.net/r/data-norge"
              data-color-scheme="dark"
            />
          </HStack>
          <div className={styles.digdirCredit}>
            <span>{dictionary.footer.digdirCredit}</span>
            <DigdirLogoLink
              href={`https://www.digdir.no/`}
              data-color-scheme="dark"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
