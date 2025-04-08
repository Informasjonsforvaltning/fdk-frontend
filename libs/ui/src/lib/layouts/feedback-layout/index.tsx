import { PropsWithChildren } from 'react';

import { Heading, Link } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

import { type Dictionary, type LocaleCodes, interpolate } from '@fdk-frontend/dictionaries';

import styles from './feedback-layout.module.scss';
import { cookies } from 'next/headers';

type FeedbackLayoutProps = {
    dictionary: Dictionary;
    locale: LocaleCodes;
    communityBaseUri: string;
};

const FeedbackLayout = async ({
    children,
    dictionary,
    locale,
    communityBaseUri,
}: PropsWithChildren & FeedbackLayoutProps) => {
    // Opt-in SSR
    cookies();

    return (
        <div className={styles.feedbackLayout}>
            {children}
            <div className={styles.feedbackBanner}>
                <div className={styles.feedbackBannerInner}>
                    <Heading
                        className={styles.heading}
                        size='xs'
                        level={2}
                    >
                        {dictionary.feedbackBanner.heading}
                    </Heading>
                    <div>
                        {interpolate(dictionary.feedbackBanner.text, {
                            contactLink: (
                                <Link href={`/${locale}/contact`}>{dictionary.feedbackBanner.contactLinkText}</Link>
                            ),
                            communityLink: (
                                <Link href={communityBaseUri}>
                                    {dictionary.feedbackBanner.communityLinkText}&nbsp;
                                    <ExternalLinkIcon
                                        aria-hidden
                                        fontSize='1em'
                                    />
                                </Link>
                            ),
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackLayout;
