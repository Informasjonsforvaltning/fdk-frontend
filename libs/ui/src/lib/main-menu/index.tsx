'use client';

import React from 'react';
import cn from 'classnames';
import { ForwardRefComponent, motion } from 'framer-motion';
import { Link, Heading } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Dictionary } from '@fdk-frontend/dictionaries';

import styles from './main-menu.module.scss';
import GithubLogo from './images/github-logo';
import getMainMenuData from './data';

type MainMenuProps = React.HTMLAttributes<HTMLDivElement> & {
    dictionary: Dictionary;
    baseUri: string;
    motionProps?: any;
};

const MotionNav: ForwardRefComponent<any, any> = motion.nav;

const MainMenu = ({ className, dictionary, baseUri, motionProps = {} }: MainMenuProps) => {
    const data = getMainMenuData(dictionary, baseUri);

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
                        size='sm'
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
                        size='sm'
                        id='mainMenu.help.heading'
                    >
                        {dictionary.mainMenu.help.heading}
                    </Heading>
                    <ul>
                        {data.help.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    {item.title}
                                    {item.external && (
                                        <ExternalLinkIcon
                                            aria-hidden
                                            fontSize='1em'
                                        />
                                    )}
                                </Link>
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
                        size='sm'
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
                        size='sm'
                        id='mainMenu.about.heading'
                    >
                        {dictionary.mainMenu.about.heading}
                    </Heading>
                    <ul>
                        {data.about.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    {item.href.startsWith('https://github.com') && <GithubLogo />}
                                    {item.title}
                                    {item.external && (
                                        <ExternalLinkIcon
                                            aria-hidden
                                            fontSize='1em'
                                        />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </MotionNav>
            </div>
        </MotionNav>
    );
};

export default MainMenu;
