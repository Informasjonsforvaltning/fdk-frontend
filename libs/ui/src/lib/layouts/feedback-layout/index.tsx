import { PropsWithChildren } from 'react';

import { Heading, Link } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

import { type Dictionary, interpolate } from '@fdk-frontend/dictionaries';

import styles from './feedback-layout.module.scss';
import { cookies } from 'next/headers';

type FeedbackLayoutProps = {
    dictionary: Dictionary;
    baseUri: string;
    communityBaseUri: string;
};

const FeedbackLayout = async ({
    children,
    dictionary,
    baseUri,
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
                                <Link href={`${baseUri}/contact`}>{dictionary.feedbackBanner.contactLinkText}</Link>
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
