import { Link } from '@digdir/designsystemet-react';
import { Dictionary } from '@fdk-frontend/dictionaries';

import { LogoLink } from '../logo';
import LanguageSwitcher from '../language-switcher';
import MainMenu from '../main-menu';

import DigdirLogo from './images/digdir-logo';

import styles from './footer.module.scss';

type FooterProps = {
    dictionary: Dictionary;
    baseUri: string;
};

const Footer = ({ dictionary, baseUri }: FooterProps) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <MainMenu
                    className={styles.footerNav}
                    dictionary={dictionary}
                    baseUri={baseUri}
                />
                <LanguageSwitcher inverted />
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottomInner}>
                    <LogoLink baseUri={baseUri} />
                    <div className={styles.digdirCredit}>
                        <span>{dictionary.footer.digdirCredit}</span>
                        <Link href={`https://www.digdir.no/`}>
                            <DigdirLogo />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
