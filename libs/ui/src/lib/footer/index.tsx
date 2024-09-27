import { Link, Heading } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Dictionary } from '@fdk-frontend/dictionaries';
import { CatalogTypes } from '@fdk-frontend/types';

import { CatalogIcon } from '../catalog-symbol';
import { LogoLink, DigdirLogoLink } from '../logo';
import getMainMenuData from '../main-menu/data';
import LanguageSwitcher from '../language-switcher';

import GithubLogo from '../core/svg/github-logo';

import getFooterData from './data';

import styles from './footer.module.scss';

type FooterProps = {
    dictionary: Dictionary;
    baseUri: string;
};

const Footer = ({ dictionary, baseUri }: FooterProps) => {
    const mainMenuData = getMainMenuData(dictionary, baseUri);
    const footerData = getFooterData(dictionary);

    return (
        <footer className={styles.footer} aria-label="Footer">
            <div className={styles.inner}>
                <div className={styles.links}>
                    <div className={styles.linkSection}>
                        <Heading
                            className={styles.linkSectionHeader}
                            level={3}
                            size='sm'
                        >
                            {dictionary.mainMenu.catalogs.heading}
                        </Heading>
                        <ul>
                            {mainMenuData.catalogs.map((item) => (
                                <li key={item.key}>
                                    <Link
                                        className={styles.iconLink}
                                        href={item.href}
                                    >
                                        <CatalogIcon
                                            catalog={item.key as CatalogTypes}
                                            fontSize='1.5em'
                                        />
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.linkSection}>
                        <Heading
                            className={styles.linkSectionHeader}
                            level={3}
                            size='sm'
                        >
                            {dictionary.mainMenu.help.heading}
                        </Heading>
                        <ul>
                            {mainMenuData.help.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}>
                                        {item.title}
                                        {item.external && <ExternalLinkIcon fontSize='1em' />}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.linkSection}>
                        <Heading
                            className={styles.linkSectionHeader}
                            level={3}
                            size='sm'
                        >
                            {dictionary.mainMenu.tools.heading}
                        </Heading>
                        <ul>
                            {mainMenuData.tools.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}>{item.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.linkSection}>
                        <Heading
                            className={styles.linkSectionHeader}
                            level={3}
                            size='sm'
                        >
                            {dictionary.mainMenu.about.heading}
                        </Heading>
                        <ul>
                            {mainMenuData.about.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}>{item.title}</Link>
                                </li>
                            ))}
                            {footerData.policies.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href}>
                                        {item.title}
                                        {item.external && <ExternalLinkIcon fontSize='1em' />}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    className={styles.iconLink}
                                    href={footerData.githubUri}
                                >
                                    <GithubLogo fontSize='1.25em' />
                                    {dictionary.footer.githubFollow}
                                    <ExternalLinkIcon fontSize='1em' />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <LanguageSwitcher inverted />
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottomInner}>
                    <LogoLink baseUri={baseUri} />
                    <div className={styles.digdirCredit}>
                        <span>{dictionary.footer.digdirCredit}</span>
                        <DigdirLogoLink href={footerData.digdirUri} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
