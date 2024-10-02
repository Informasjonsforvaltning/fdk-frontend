'use client';

import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';

import { Link, Button } from '@digdir/designsystemet-react';
import { MagnifyingGlassIcon, MenuHamburgerIcon, XMarkIcon } from '@navikt/aksel-icons';

import { Dictionary } from '@fdk-frontend/dictionaries';

import { LogoLink } from '../logo';
import MainMenu from '../main-menu';

import styles from './header.module.scss';

type HeaderProps = {
    dictionary: Dictionary;
    baseUri?: string;
    communityBaseUri?: string;
    registrationBaseUri?: string;
    frontpage?: boolean;
};

const Header = ({
    dictionary,
    baseUri = '/',
    communityBaseUri = '#',
    registrationBaseUri = '#',
    frontpage,
}: HeaderProps) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [sticky, setSticky] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const animations = {
        drawerInner: {
            hidden: { height: 0 },
            show: { height: 'auto', transition: { duration: 0.15 } },
        },
    };

    const toggleSticky = () => {
        if (frontpage) return false;
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
    };

    useEffect(() => {
        toggleSticky();

        window.addEventListener('scroll', toggleSticky);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('scroll', toggleSticky);
            window.removeEventListener('click', handleClick);
        };
    });

    return (
        <header
            className={cn(styles.header, { [styles.frontpageHeader]: frontpage })}
            ref={headerRef}
        >
            <div
                className={cn(styles.headerOuter, {
                    [styles.headerSticky]: sticky || showMenu,
                    [styles.drawerOpen]: showMenu,
                })}
            >
                <Link
                    className={styles.skipToMain}
                    href='#main'
                >
                    {dictionary.header.skipToMain}
                </Link>
                <div className={styles.headerInner}>
                    <LogoLink
                        className={styles.headerLogo}
                        baseUri={baseUri}
                    />
                    <div className={styles.headerToolbar}>
                        <Button
                            asChild
                            size='small'
                            variant='tertiary'
                            aria-label={dictionary.header.findDataButton}
                        >
                            <Link href={`${baseUri}/search-all`}>
                                <MagnifyingGlassIcon
                                    aria-hidden
                                    fontSize='1.5em'
                                />
                                <span>{dictionary.header.findDataButton}</span>
                            </Link>
                        </Button>
                        <Button
                            size='small'
                            variant={showMenu ? 'secondary' : 'tertiary'}
                            onClick={() => setShowMenu(!showMenu)}
                            aria-label={dictionary.header.menuButton}
                        >
                            {showMenu ? (
                                <XMarkIcon
                                    aria-hidden
                                    fontSize='1.5em'
                                />
                            ) : (
                                <MenuHamburgerIcon
                                    aria-hidden
                                    fontSize='1.5em'
                                />
                            )}
                            <span>{dictionary.header.menuButton}</span>
                        </Button>
                        <Button
                            asChild
                            size='small'
                            variant='primary'
                        >
                            <Link href={`${baseUri}/publishing`}>
                                <span>{dictionary.header.shareDataButton}</span>
                            </Link>
                        </Button>
                    </div>
                </div>
                {showMenu && (
                    <div className={styles.drawer}>
                        <motion.div
                            className={styles.drawerInner}
                            variants={animations.drawerInner}
                            initial='hidden'
                            animate='show'
                        >
                            <MainMenu
                                dictionary={dictionary}
                                baseUri={baseUri}
                            />
                        </motion.div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
