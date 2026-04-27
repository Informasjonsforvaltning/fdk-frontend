'use client';
import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'next/navigation';
import { ForwardRefComponent, motion } from 'framer-motion';
import { Link, Button, Alert, Paragraph } from '@digdir/designsystemet-react';
import { MenuHamburgerIcon, XMarkIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { type LocaleCodes, getLocalization } from '@fdk-frontend/localization';
import { LogoLink } from '../logo';
import MainMenu from '../main-menu';
import SearchInput from '../search-input';
import styles from './header.module.scss';

export type HeaderProps = {
    locale: LocaleCodes;
    frontpage?: boolean;
    showSearchInput?: boolean;
};

const MotionDiv: ForwardRefComponent<any, any> = motion.div;

const Header = ({ locale, frontpage, showSearchInput }: HeaderProps) => {
    const dictionary = getLocalization(locale).common;
    const searchParams = useSearchParams();
    const isTransportProfile = searchParams.get('profile') === 'transport';
    const headerRef = useRef<HTMLDivElement>(null);
    const [sticky, setSticky] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showHeaderMessage, setShowHeaderMessage] = useState(false);

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

    const disableHeaderMessage = () => {
        setShowHeaderMessage(false);
        localStorage.setItem('fdk-header-message-dismissed', 'true');
    };

    // useEffect(() => {
    //     if (!localStorage.getItem('fdk-header-message-dismissed')) {
    //         setShowHeaderMessage(true);
    //     }
    // }, []);

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
            className={cn(styles.header, {
                [styles.frontpageHeader]: frontpage,
                [styles.transportHeader]: isTransportProfile,
                [styles.showHeaderMessage]: showHeaderMessage,
            })}
            ref={headerRef}
            data-color-scheme={isTransportProfile || (!showMenu && frontpage) ? 'dark' : 'light'}
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
                {showHeaderMessage && (
                    <Alert
                        data-color='info'
                        className={styles.headerMessage}
                    >
                        <Paragraph>
                            {dictionary.header.alert.message}&nbsp;
                            <Link href='https://datalandsbyen.norge.no/topic/736/planlagt-vedlikehold-tirsdag-03.03.2026-kl-18-00-23-00'>
                                {dictionary.header.alert.linkText}
                            </Link>
                        </Paragraph>
                        <Button
                            variant='tertiary'
                            data-size='sm'
                            onClick={() => disableHeaderMessage()}
                        >
                            <XMarkIcon />
                        </Button>
                    </Alert>
                )}
                <div className={styles.headerInner}>
                    <LogoLink
                        className={styles.headerLogo}
                        href={`/${locale}`}
                        variant={isTransportProfile ? 'transport' : undefined}
                    />
                    {
                        showSearchInput ?
                        <SearchInput locale={locale} className={styles.headerSearchInput} /> :
                        <div style={{flexGrow:1}} />
                    }
                    <div className={styles.headerToolbar}>
                        {
                            !showSearchInput &&
                            <Button
                                asChild
                                data-size='sm'
                                variant='tertiary'
                                aria-label={dictionary.header.findDataButton}
                            >
                                <Link href={`/search-all`}>
                                    <MagnifyingGlassIcon aria-hidden />
                                    <span>{dictionary.header.findDataButton}</span>
                                </Link>
                            </Button>
                        }
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
                            data-color-scheme='light'
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
                            <MainMenu locale={locale} />
                        </MotionDiv>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
