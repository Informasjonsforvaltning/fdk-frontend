import 'server-only';

import Image from 'next/image';
import { Dictionary } from '@fdk-frontend/dictionaries';
import FDKLogo from './images/fdk-logo.svg';
import FDKDemoLogo from './images/fdk-logo-demo.svg';
import LanguageMenu from './components/menu-language';
import { getHeaderData } from './data';
import styles from './header.module.css';
import { getPaths } from '@fdk-frontend/utils';
import { Link, ListItem, ListUnordered } from '@digdir/designsystemet-react';
import NavigationMenu from './components/menu-navigation';

type HeaderProps = {
  dictionary: Dictionary;
};

const Header = async ({ dictionary }: HeaderProps) => {
  const homeUrl = process.env.FDK_BASE_URI ?? getPaths().root;
  const { FDK_COMMUNITY_BASE_URI, FDK_REGISTRATION_BASE_URI } = process.env;
  const useDemoLogo = process.env.REACT_APP_USE_DEMO_LOGO === 'true';
  const headerData = getHeaderData(dictionary, homeUrl, FDK_COMMUNITY_BASE_URI ?? '', FDK_REGISTRATION_BASE_URI ?? '');

  return (
    <header className={styles.header}>
      <Link
        href={homeUrl ?? getPaths().root}
        aria-label={dictionary.goToMainPageAriaLabel}
        className={styles.logo}
      >
        <Image
          src={useDemoLogo ? FDKDemoLogo : FDKLogo}
          alt={dictionary.fdkLogoAlt}
        />
      </Link>
      <ListUnordered className={styles.nav}>
        {headerData.map((urlObject) => (
          <ListItem key={urlObject.name}>
            {urlObject.items ? (
              <NavigationMenu
                key={urlObject.name}
                triggerText={urlObject.name}
                links={urlObject.items}
              />
            ) : (
              urlObject.href && (
                <Link
                  href={urlObject.href}
                  target={urlObject.external ? '_blank' : undefined}
                  rel='noreferrer'
                  className={styles.link}
                >
                  {urlObject.text}
                </Link>
              )
            )}
          </ListItem>
        ))}
      </ListUnordered>
      <LanguageMenu triggerText={dictionary.language} />
    </header>
  );
};

export { Header };
