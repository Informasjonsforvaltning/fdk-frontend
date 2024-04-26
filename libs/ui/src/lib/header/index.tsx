import 'server-only';

import Image from 'next/image';
import { Dictionary } from '@fdk-frontend/dictionaries';
import FDKLogo from './images/fdk-logo.svg';
import FDKDemoLogo from './images/fdk-logo-demo.svg';
import LanguageMenu from './components/language-menu';
import styles from './header.module.css';
import { paths } from '@fdk-frontend/utils';

interface HeaderProps {
  dictionary: Dictionary;
}

const Header = async ({ dictionary }: HeaderProps) => {
  const homeUrl = process.env.FDK_BASE_URI;
  const useDemoLogo = process.env.REACT_APP_USE_DEMO_LOGO === 'true';

  const urls = [
    {
      name: dictionary.aboutNationalDataCatalog,
      url: process.env.FDK_BASE_URI,
      external: false,
    },
    {
      name: dictionary.organizations,
      url: `${process.env.FDK_BASE_URI}${paths.organizations}`,
      external: false,
    },
    {
      name: dictionary.tools,
      url: `${process.env.FDK_BASE_URI}${paths.tools}`,
      external: false,
    },
    {
      name: dictionary.goToDataCommunity,
      url: process.env.FDK_COMMUNITY_BASE_URI,
      external: true,
    },
    {
      name: dictionary.publishing,
      url: process.env.FDK_REGISTRATION_BASE_URI,
      external: true,
    },
  ];

  return (
    <header className={styles.header}>
      <a
        href={homeUrl}
        aria-label={dictionary.goToMainPageAriaLabel}
        className={styles.logo}
      >
        <Image
          src={useDemoLogo ? FDKDemoLogo : FDKLogo}
          alt={dictionary.fdkLogoAlt}
        />
      </a>
      <ul className={styles.nav}>
        {urls.map((urlObject) => (
          <li key={urlObject.name}>
            <a
              href={urlObject.url}
              target={urlObject.external ? '_blank' : ''}
              rel='noreferrer'
            >
              {urlObject.name}
            </a>
          </li>
        ))}
      </ul>
      <LanguageMenu
        triggerText={dictionary.language}
        className={styles.language}
      />
    </header>
  );
};

export { Header };
