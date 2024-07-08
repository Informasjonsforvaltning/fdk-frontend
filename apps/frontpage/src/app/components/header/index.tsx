'use client';

import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';

import { Dictionary } from '@fdk-frontend/dictionaries';
import { Link, ListItem, ListUnordered, Button } from '@digdir/designsystemet-react';
import { MagnifyingGlassIcon, MenuHamburgerIcon, XMarkIcon, ChevronRightIcon } from '@navikt/aksel-icons';

import { Logo, LogoLink } from '../logo';
import { MainMenu } from '../main-menu';
import { HeaderSearch } from '../header-search';

import { getHeaderData } from './data';
import styles from './header.module.scss';
import NavigationMenu from './components/menu-navigation';

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
  const [ showSearch, setShowSearch ] = useState(false);

  const headerData = getHeaderData(
    dictionary,
    baseUri,
    communityBaseUri,
    registrationBaseUri,
  );

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
        setShowSearch(false);
      }
    }

    // window.addEventListener('scroll', toggleSticky);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', toggleSticky);
      window.removeEventListener('click', handleClick);
    }
  });

  // useEffect(() => {
  //   if (showSearch && showMenu) setShowMenu(false);
  // }, [ showSearch ])

  // useEffect(() => {
  //   if (showSearch && showMenu) setShowSearch(false);
  // }, [ showMenu ])

  return (
    <header
      ref={headerRef}
      className={cn(styles.headerOuter, {
        [styles.headerSticky]: sticky | showMenu,
        [styles.drawerOpen]: showMenu
      })}
    >
      <div className={styles.headerInner}>
        <LogoLink
          className={styles.headerLogo}
          baseUri={baseUri}
          label={dictionary.goToMainPageAriaLabel}
        />
        <div className={styles.headerToolbar}>
          {/*<Button size="small" variant="tertiary">Del data</Button>*/}
          {
            showSearch &&
            <HeaderSearch />
          }
          <Button asChild size="small" variant="tertiary">
            <Link href="https://staging.fellesdatakatalog.digdir.no/search-all">
              <MagnifyingGlassIcon aria-hidden fontSize='1.5em' />
              <span>Finn data</span>
            </Link>
          </Button>
          {/*<Button size="small" variant={showSearch ? 'secondary' : 'tertiary' } onClick={() => setShowSearch(!showSearch)}>
            {
              showSearch ?
              <XMarkIcon aria-hidden fontSize='1.5em' /> :
              <MagnifyingGlassIcon aria-hidden fontSize='1.5em' />
            }
            <span>Finn data</span>
          </Button>*/}
          <Button size="small" variant={showMenu ? 'secondary' : 'tertiary' } onClick={() => setShowMenu(!showMenu)}>
            {
              showMenu ?
              <XMarkIcon aria-hidden fontSize='1.5em' /> :
              <MenuHamburgerIcon aria-hidden fontSize='1.5em' />
            }
            <span>Meny</span>
          </Button>
          <Button asChild size="small" variant="primary">
            <Link href="https://staging.fellesdatakatalog.digdir.no/publishing">
              Del data
            </Link>
          </Button>
        </div>
        {/*<ListUnordered className={styles.nav}>
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
        <Button asChild size="small">
          <Link href="https://data.norge.no/guidance" inverted>
            Del data
          </Link>
        </Button>*/}
      </div>
      {
        (showMenu || showSearch) &&
        <div className={styles.drawer}>
          <div className={styles.drawerInner}>
            { showMenu && <MainMenu /> }
            {/*
              showSearch &&
              <div>
                <HeaderSearch />
              </div>
            */}
          </div>
        </div>
      }
    </header>
  );
};

export { Header };
