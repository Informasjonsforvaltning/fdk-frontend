'use client';

import React from 'react';
import cn from 'classnames';
import { ForwardRefComponent, motion } from 'framer-motion';
import { Link, Heading } from '@digdir/designsystemet-react';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import ExternalLink from '../external-link';
import styles from './main-menu.module.scss';
import GithubLogo from './images/github-logo';
import getMainMenuData from './data';

type MainMenuProps = React.HTMLAttributes<HTMLDivElement> & {
    dictionary: Dictionary;
    locale: LocaleCodes;
    motionProps?: any;
};

const MotionNav: ForwardRefComponent<any, any> = motion.nav;

const MainMenu = ({ className, dictionary, locale, motionProps = {}, ...rest }: MainMenuProps) => {
    const data = getMainMenuData(dictionary, locale);
    const animations = {
        links: {
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.05,
                },
            },
        },
        section: {
            hidden: { opacity: 0, scale: 0.9 },
            show: { opacity: 1, scale: 1 },
        },
    };

    return (
        <MotionNav
            className={cn(styles.mainMenu, className)}
            variants={animations.links}
            initial='hidden'
            animate='show'
            aria-label={dictionary.mainMenu.label}
            {...motionProps}
            {...rest}
        >
            <div className={styles.links}>
                <MotionNav
                    className={styles.linkSection}
                    variants={animations.section}
                    aria-labelledby='mainMenu.catalogs.heading'
                >
                    <Heading
                        className={styles.linkSectionHeader}
                        level={2}
                        data-size='sm'
                        id='mainMenu.catalogs.heading'
                    >
                        {dictionary.mainMenu.catalogs.heading}
                    </Heading>
                    <ul>
                        {data.catalogs.map((item) => (
                            <li key={item.key}>
                                <Link
                                    className={styles.iconLink}
                                    href={item.href}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </MotionNav>
                <MotionNav
                    className={styles.linkSection}
                    variants={animations.section}
                    aria-labelledby='mainMenu.help.heading'
                >
                    <Heading
                        className={styles.linkSectionHeader}
                        level={2}
                        data-size='sm'
                        id='mainMenu.help.heading'
                    >
                        {dictionary.mainMenu.help.heading}
                    </Heading>
                    <ul>
                        {data.help.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </MotionNav>
                <MotionNav
                    className={styles.linkSection}
                    variants={animations.section}
                    aria-labelledby='mainMenu.tools.heading'
                >
                    <Heading
                        className={styles.linkSectionHeader}
                        level={2}
                        data-size='sm'
                        id='mainMenu.tools.heading'
                    >
                        {dictionary.mainMenu.tools.heading}
                    </Heading>
                    <ul>
                        {data.tools.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </MotionNav>
                <MotionNav
                    className={styles.linkSection}
                    variants={animations.section}
                    aria-labelledby='mainMenu.about.heading'
                >
                    <Heading
                        className={styles.linkSectionHeader}
                        level={2}
                        data-size='sm'
                        id='mainMenu.about.heading'
                    >
                        {dictionary.mainMenu.about.heading}
                    </Heading>
                    <ul>
                        {data.about.map((item) => (
                            <li key={item.href}>
                                {item.external ? (
                                    <ExternalLink
                                        href={item.href}
                                        locale={locale}
                                    >
                                        {item.href.startsWith('https://github.com') && (
                                            <GithubLogo style={{ marginRight: '0.125em' }} />
                                        )}
                                        {item.title}
                                    </ExternalLink>
                                ) : (
                                    <Link href={item.href}>{item.title}</Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </MotionNav>
            </div>
        </MotionNav>
    );
};

export default MainMenu;
