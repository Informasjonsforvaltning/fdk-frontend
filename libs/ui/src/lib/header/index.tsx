'use client';

import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';

import { Link, ListItem, ListUnordered, Button } from '@digdir/designsystemet-react';
import { MagnifyingGlassIcon, MenuHamburgerIcon, XMarkIcon, ChevronRightIcon } from '@navikt/aksel-icons';

import { Dictionary } from '@fdk-frontend/dictionaries';
import { Logo, LogoLink } from '@fdk-frontend/ui/logo';
import MainMenu from '@fdk-frontend/ui/main-menu';

import styles from './header.module.scss';

type HeaderProps = {
  dictionary: Dictionary;
  baseUri?: string;
  communityBaseUri?: string;
  registrationBaseUri?: string;
};

const Header = ({
  dictionary,
  baseUri = '/',
  communityBaseUri = '#',
  registrationBaseUri = '#',
}: HeaderProps) => {

  const headerRef = useRef(null);
  const [ sticky, setSticky ] = useState(false);
  const [ showMenu, setShowMenu ] = useState(false);

  useEffect(() => {
    const toggleSticky = () => {
      if (window.scrollY > 0) {
        if (!sticky) setSticky(true);
      } else {
        if (sticky) setSticky(false);
      }
    };

    const handleClick = (e: any) => {
      if (!headerRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    }

    window.addEventListener('scroll', toggleSticky);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', toggleSticky);
      window.removeEventListener('click', handleClick);
    }
  });

  return (
    <header
      className={styles.header}
      ref={headerRef}
    >
      <div className={cn(styles.headerOuter, {
        [styles.headerSticky]: sticky | showMenu,
        [styles.drawerOpen]: showMenu
      })}>
        <div className={styles.headerInner}>
          <LogoLink
            className={styles.headerLogo}
            baseUri={baseUri}
          />
          <div className={styles.headerToolbar}>
            <Button asChild size="small" variant="tertiary">
              <Link href={`${baseUri}/search-all`}>
                <MagnifyingGlassIcon aria-hidden fontSize='1.5em' />
                <span>{dictionary.header.findDataButton}</span>
              </Link>
            </Button>
            <Button size="small" variant={showMenu ? 'secondary' : 'tertiary' } onClick={() => setShowMenu(!showMenu)}>
              {
                showMenu ?
                <XMarkIcon aria-hidden fontSize='1.5em' /> :
                <MenuHamburgerIcon aria-hidden fontSize='1.5em' />
              }
              <span>{dictionary.header.menuButton}</span>
            </Button>
            <Button asChild size="small" variant="primary">
              <Link href={`${baseUri}/publishing`}>
                <span>{dictionary.header.shareDataButton}</span>
              </Link>
            </Button>
          </div>
        </div>
        {
          showMenu &&
          <div className={styles.drawer}>
            <div className={styles.drawerInner}>
              {
                showMenu &&
                <MainMenu
                  dictionary={dictionary}
                  baseUri={baseUri}
                />
              }
            </div>
          </div>
        }
      </div>
    </header>
  );
};

export default Header;
