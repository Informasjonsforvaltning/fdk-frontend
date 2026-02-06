'use client';
import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { ForwardRefComponent, motion } from 'framer-motion';
import { Link, Button } from '@digdir/designsystemet-react';
import { MagnifyingGlassIcon, MenuHamburgerIcon, XMarkIcon } from '@navikt/aksel-icons';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { LogoLink } from '../logo';
import MainMenu from '../main-menu';
import SearchInput from '../search-input';
import styles from './header.module.scss';

export type HeaderProps = {
    dictionary: Dictionary;
    locale: LocaleCodes;
    frontpage?: boolean;
};

const MotionDiv: ForwardRefComponent<any, any> = motion.div;

const Header = ({ dictionary, locale, frontpage }: HeaderProps) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [sticky, setSticky] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && showMenu) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        toggleSticky();

        window.addEventListener('scroll', toggleSticky);
        window.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('scroll', toggleSticky);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [frontpage, sticky, showMenu]);

    return (
        <header
            aria-label='Header'
            className={cn(styles.header, { [styles.frontpageHeader]: frontpage })}
            ref={headerRef}
            data-color-scheme={!showMenu && frontpage ? 'dark' : 'light'}
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
                        href={`/${locale}`}
                    />
                    <SearchInput
                        value={searchQuery}
                        onChange={setSearchQuery}
                        className={styles.headerSearchInput}
                    />
                    <div className={styles.headerToolbar}>
                        {/* <Button
                            asChild
                            data-size='sm'
                            variant='tertiary'
                            aria-label={dictionary.header.findDataButton}
                        >
                            <Link href={`/search-all`}>
                                <MagnifyingGlassIcon aria-hidden />
                                <span>{dictionary.header.findDataButton}</span>
                            </Link>
                        </Button> */}
                        <Button
                            data-size='sm'
                            variant={showMenu ? 'secondary' : 'tertiary'}
                            onClick={() => setShowMenu(!showMenu)}
                            aria-label={dictionary.header.menuButton}
                            aria-pressed={showMenu}
                        >
                            {showMenu ? <XMarkIcon aria-hidden /> : <MenuHamburgerIcon aria-hidden />}
                            <span>{dictionary.header.menuButton}</span>
                        </Button>
                        <Button
                            asChild
                            data-size='sm'
                            variant='primary'
                        >
                            <Link href={`/publishing`}>
                                <span>{dictionary.header.shareDataButton}</span>
                            </Link>
                        </Button>
                    </div>
                </div>
                {showMenu && (
                    <div className={styles.drawer}>
                        <MotionDiv
                            className={styles.drawerInner}
                            variants={animations.drawerInner}
                            initial='hidden'
                            animate='show'
                        >
                            <MainMenu
                                dictionary={dictionary}
                                locale={locale}
                            />
                        </MotionDiv>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
