import cn from "classnames";
import { Link } from "@digdir/designsystemet-react";
import { EnvelopeClosedIcon } from "@navikt/aksel-icons";
import { type LocaleCodes, getLocalization } from "@fdk-frontend/localization";
import ExternalLink from "../external-link";
import LanguageSwitcher from "../language-switcher";
import styles from "./transportportal-footer.module.scss";

export type TransportportalFooterProps = {
  locale: LocaleCodes;
};

const TransportportalFooter = ({ locale }: TransportportalFooterProps) => {
  const dictionary = getLocalization(locale).common;
  const { footer, mainMenu } = dictionary;

  return (
    <footer
      className={styles.footer}
      aria-label="Footer"
      data-color-scheme="dark"
    >
      <div className={styles.inner}>
        <div className={styles.logos}>
          <span
            role="img"
            aria-label="Statens vegvesen"
            className={cn(styles.logo, styles.statensVegvesen)}
          />
          <span
            role="img"
            aria-label="Jernbanedirektoratet"
            className={cn(styles.logo, styles.jernbanedirektoratet)}
          />
          <span
            role="img"
            aria-label="Entur"
            className={cn(styles.logo, styles.entur)}
          />
          <span
            role="img"
            aria-label="Digdir"
            className={cn(styles.logo, styles.digdir)}
          />
        </div>

        <div className={styles.columns}>
          <div className={styles.about}>
            <p>{footer.transportportal.collaboration}</p>
            <Link
              className={styles.email}
              href="mailto:transportportal@vegvesen.no"
            >
              <EnvelopeClosedIcon aria-hidden />
              transportportal@vegvesen.no
            </Link>
          </div>

          <ul className={styles.links}>
            <li>
              <Link href={`/${locale}/search`}>{footer.transportportal.searchDatasets}</Link>
            </li>
            <li>
              <Link href={`/${locale}/om-transportportal`}>{mainMenu.transportportal.heading}</Link>
            </li>
            <li>
              <Link href={`/${locale}/om-transportportal/hjelp-til-a-registrere`}>
                {mainMenu.transportportal.links.registrationHelp}
              </Link>
            </li>
          </ul>

          <ul className={styles.links}>
            <li>
              <ExternalLink
                href="https://www.digdir.no/digdir/personvernerklaering/706"
                locale={locale}
              >
                {mainMenu.about.links.privacyPolicy}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href="https://www.digdir.no/digdir/informasjonskapsler/707"
                locale={locale}
              >
                {mainMenu.about.links.cookiePolicy}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href="https://uustatus.no/nb/erklaringer/publisert/8020b962-b706-4cdf-ab8b-cdb5f480a696"
                locale={locale}
              >
                {mainMenu.about.links.a11yStatement}
              </ExternalLink>
            </li>
          </ul>
        </div>

        <LanguageSwitcher loc={locale} />
      </div>
    </footer>
  );
};

export default TransportportalFooter;
