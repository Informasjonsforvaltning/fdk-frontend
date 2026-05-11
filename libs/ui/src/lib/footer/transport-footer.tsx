import { Link } from '@digdir/designsystemet-react';
import { EnvelopeClosedIcon } from '@navikt/aksel-icons';
import { type LocaleCodes, getLocalization } from '@fdk-frontend/localization';

import statensVegvesenSrc from './images/logo-statens-vegvesen.svg';
import jernbanedirektoratetSrc from './images/logo-jernbanedirektoratet.svg';
import enturSrc from './images/logo-entur.svg';
import digdirSrc from './images/logo-digdir.svg';
import styles from './transport-footer.module.scss';

export type TransportFooterProps = {
    locale: LocaleCodes;
};

const resolveSrc = (src: string | { src: string }) => (typeof src === 'string' ? src : src.src);

const TransportFooter = ({ locale }: TransportFooterProps) => {
    const dictionary = getLocalization(locale).common.footer.transport;

    return (
        <footer
            className={styles.footer}
            aria-label='Footer'
            data-color-scheme='dark'
        >
            <div className={styles.wrapper}>
                <div className={styles.logos}>
                    <img
                        src={resolveSrc(statensVegvesenSrc)}
                        alt='Statens vegvesen'
                        className={styles.logoVegvesen}
                    />
                    <img
                        src={resolveSrc(jernbanedirektoratetSrc)}
                        alt='Jernbanedirektoratet'
                        className={styles.logoJernbane}
                    />
                    <img
                        src={resolveSrc(enturSrc)}
                        alt='Entur'
                        className={styles.logoEntur}
                    />
                    <img
                        src={resolveSrc(digdirSrc)}
                        alt='Digitaliseringsdirektoratet'
                        className={styles.logoDigdir}
                    />
                </div>
                <div className={styles.content}>
                    <div className={styles.column}>
                        <span>{dictionary.informationTextNap}</span>
                        <Link
                            href={`mailto:${dictionary.contactEmail}`}
                            className={styles.emailLink}
                        >
                            <EnvelopeClosedIcon aria-hidden />
                            <span>{dictionary.contactEmail}</span>
                        </Link>
                    </div>
                    <div className={styles.column}>
                        <Link href='#'>{dictionary.searchDatasets}</Link>
                        <Link href='#'>{dictionary.aboutNap}</Link>
                        <Link href='#'>{dictionary.guideToRegister}</Link>
                    </div>
                    <div className={styles.column}>
                        <Link href='https://www.digdir.no/om-oss/personvernerklaering/706'>
                            {dictionary.privacyStatement}
                        </Link>
                        <Link href='https://www.digdir.no/om-oss/informasjonskapsler/707'>
                            {dictionary.informationCookies}
                        </Link>
                        <Link href='https://uustatus.no/nb/erklaringer/publisert/8020b962-b706-4cdf-ab8b-cdb5f480a696'>
                            {dictionary.accessibility}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default TransportFooter;
