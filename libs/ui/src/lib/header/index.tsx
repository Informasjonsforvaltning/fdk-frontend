import 'server-only';

import Image from 'next/image';
import { Dictionary } from '@fdk-frontend/dictionaries';
import FDKLogo from './images/fdk-logo.svg';
import FDKDemoLogo from './images/fdk-logo-demo.svg';
import LanguageMenu from './components/menu-language';
import { getHeaderData } from './data';
import styles from './header.module.css';
import { Link, ListItem, ListUnordered } from '@digdir/designsystemet-react';
import NavigationMenu from './components/menu-navigation';
import { unstable_noStore as noStore } from 'next/cache';

type HeaderProps = {
  dictionary: Dictionary;
};

const Header = async ({ dictionary }: HeaderProps) => {
  // Opt-in dynamic rendering
  noStore();

  const { FDK_BASE_URI, FDK_COMMUNITY_BASE_URI, FDK_REGISTRATION_BASE_URI, FDK_USE_DEMO_LOGO } = process.env;
  const useDemoLogo = FDK_USE_DEMO_LOGO === 'true';
  const headerData = getHeaderData(
    dictionary,
    FDK_BASE_URI ?? '/',
    FDK_COMMUNITY_BASE_URI ?? '#',
    FDK_REGISTRATION_BASE_URI ?? '#',
  );

  return (
    <header className={styles.header}>
      <Link
        href={FDK_BASE_URI}
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
