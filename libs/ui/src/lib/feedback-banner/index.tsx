import React from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import ExternalLink from '../external-link';
import { type LocaleCodes, getLocalization, interpolate } from '@fdk-frontend/localization';
import styles from './feedback-banner.module.scss';

type FeedbackBannerProps = {
    locale: LocaleCodes;
    communityBaseUri: string;
};

const FeedbackBanner = ({
    locale,
    communityBaseUri,
    ...props
}: FeedbackBannerProps & React.HTMLAttributes<HTMLDivElement>) => {
    const dictionary = getLocalization(locale).common;
    return (
        <div className={styles.feedbackBanner}>
            <div className={styles.feedbackBannerInner}>
                <Heading
                    className={styles.heading}
                    data-size='xs'
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
