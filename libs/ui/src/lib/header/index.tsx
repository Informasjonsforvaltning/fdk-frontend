import Image from 'next/image';
import { Dictionary } from '@fdk-frontend/dictionaries';
import { Link, ListItem, ListUnordered } from '@digdir/designsystemet-react';

import FDKLogo from './images/fdk-logo.svg';
import FDKDemoLogo from './images/fdk-logo-demo.svg';

import LanguageMenu from './components/menu-language';
import { getHeaderData } from './data';
import styles from './header.module.css';
import NavigationMenu from './components/menu-navigation';

type HeaderProps = {
  dictionary: Dictionary;
  baseUri?: string;
  communityBaseUri?: string;
  registrationBaseUri?: string;
  useDemoLogo?: boolean;
};

const Header = ({
  dictionary,
  baseUri = '/',
  communityBaseUri = '#',
  registrationBaseUri = '#',
  useDemoLogo
}: HeaderProps) => {

  const headerData = getHeaderData(
    dictionary,
    baseUri,
    communityBaseUri,
    registrationBaseUri,
  );

  return (
    <header className={styles.header}>
      <Link
        href={baseUri}
        aria-label={dictionary.goToMainPageAriaLabel}
        className={styles.logo}
      >
        <Image
          src={useDemoLogo ? FDKDemoLogo : FDKLogo}
          alt={dictionary.fdkLogoAlt}
          width={0}
          height={0}
        />
      </Link>
      <ListUnordered className={styles.nav}>
        {headerData.map((urlObject, i) => (
          <ListItem key={`${urlObject.name}-${i}`}>
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
