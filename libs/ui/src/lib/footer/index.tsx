import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { LogoLink, DpgLink, DigdirLogoLink } from '../logo';
import LanguageSwitcher from '../language-switcher';
import MainMenu from '../main-menu';
import styles from './footer.module.scss';
import { HStack } from '@fellesdatakatalog/ui';

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
                    <HStack className={styles.leftLogos}>
                        <LogoLink
                            href={`/${locale}`}
                            data-color-scheme='dark'
                        />
                        <DpgLink
                            title=''
                            href='https://www.digitalpublicgoods.net/r/data-norge'
                            data-color-scheme='dark'
                        />
                    </HStack>
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
