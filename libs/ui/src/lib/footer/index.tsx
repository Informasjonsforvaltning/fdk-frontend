import { Dictionary } from '@fdk-frontend/dictionaries';

import { LogoLink, DigdirLogoLink } from '../logo';
import LanguageSwitcher from '../language-switcher';
import MainMenu from '../main-menu';

import styles from './footer.module.scss';

export type FooterProps = {
    dictionary: Dictionary;
    baseUri: string;
};

const Footer = ({ dictionary, baseUri }: FooterProps) => {
    return (
        <footer
            className={styles.footer}
            aria-label='Footer'
        >
            <div className={styles.inner}>
                <MainMenu
                    className={styles.footerNav}
                    dictionary={dictionary}
                    baseUri={baseUri}
                    motionProps={{
                        initial: 'show',
                    }}
                />
                <LanguageSwitcher inverted />
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottomInner}>
                    <LogoLink baseUri={baseUri} />
                    <div className={styles.digdirCredit}>
                        <span>{dictionary.footer.digdirCredit}</span>
                        <DigdirLogoLink href={`https://www.digdir.no/`} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
