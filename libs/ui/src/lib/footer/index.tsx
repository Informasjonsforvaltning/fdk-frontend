import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { LogoLink, DigdirLogoLink } from '../logo';
import LanguageSwitcher from '../language-switcher';
import MainMenu from '../main-menu';
import styles from './footer.module.scss';

export type FooterProps = {
    dictionary: Dictionary;
    locale: LocaleCodes;
};

const Footer = ({ dictionary, locale }: FooterProps) => {
    return (
        <footer
            className={styles.footer}
            aria-label='Footer'
            data-color-scheme='dark'
        >
            <div className={styles.inner}>
                <MainMenu
                    className={styles.footerNav}
                    dictionary={dictionary}
                    locale={locale}
                    motionProps={{
                        initial: 'show',
                    }}
                />
                <LanguageSwitcher />
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottomInner}>
                    <LogoLink
                        href={`/${locale}`}
                        data-color-scheme='dark'
                    />
                    <div className={styles.digdirCredit}>
                        <span>{dictionary.footer.digdirCredit}</span>
                        <DigdirLogoLink
                            href={`https://www.digdir.no/`}
                            data-color-scheme='dark'
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
