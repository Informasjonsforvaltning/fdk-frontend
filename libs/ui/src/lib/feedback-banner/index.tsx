import React from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import ExternalLink from '../external-link';
import { type Dictionary, type LocaleCodes, interpolate } from '@fdk-frontend/dictionaries';
import styles from './feedback-banner.module.scss';

type FeedbackBannerProps = {
    locale: LocaleCodes;
    dictionary: Dictionary;
    communityBaseUri: string;
};

const FeedbackBanner = ({
    children,
    locale,
    dictionary,
    communityBaseUri,
    ...props
}: FeedbackBannerProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
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
                            <ExternalLink
                                href={communityBaseUri}
                                locale={locale}
                            >
                                {dictionary.feedbackBanner.communityLinkText}
                            </ExternalLink>
                        ),
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeedbackBanner;
