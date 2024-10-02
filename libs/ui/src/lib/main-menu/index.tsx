'use client';

import React from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { Link, Heading } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

import { Dictionary } from '@fdk-frontend/dictionaries';

import styles from './main-menu.module.scss';

import GithubLogo from './images/github-logo';
import getMainMenuData from './data';

type MainMenuProps = React.HTMLAttributes<HTMLDivElement> & {
    dictionary: Dictionary;
    baseUri: string;
};

const MainMenu = ({ className, dictionary, baseUri }: MainMenuProps) => {
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
        <div className={cn(styles.mainMenu, className)}>
            <motion.div
                className={styles.links}
                variants={animations.links}
            >
                <motion.div
                    className={styles.linkSection}
                    variants={animations.section}
                >
                    <Heading
                        className={styles.linkSectionHeader}
                        level={3}
                        size='sm'
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
                </motion.div>
                <motion.div
                    className={styles.linkSection}
                    variants={animations.section}
                >
                    <Heading
                        className={styles.linkSectionHeader}
                        level={3}
                        size='sm'
                    >
                        {dictionary.mainMenu.help.heading}
                    </Heading>
                    <ul>
                        {data.help.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    {item.title}
                                    {item.external && <ExternalLinkIcon fontSize='1em' />}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>
                <motion.div
                    className={styles.linkSection}
                    variants={animations.section}
                >
                    <Heading
                        className={styles.linkSectionHeader}
                        level={3}
                        size='sm'
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
                </motion.div>
                <motion.div
                    className={styles.linkSection}
                    variants={animations.section}
                >
                    <Heading
                        className={styles.linkSectionHeader}
                        level={3}
                        size='sm'
                    >
                        {dictionary.mainMenu.about.heading}
                    </Heading>
                    <ul>
                        {data.about.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    {item.href.startsWith('https://github.com') && <GithubLogo />}
                                    {item.title}
                                    {item.external && <ExternalLinkIcon fontSize='1em' />}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default MainMenu;
