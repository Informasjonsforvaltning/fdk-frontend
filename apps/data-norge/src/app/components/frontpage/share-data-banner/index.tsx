import { Button, Paragraph, Link } from '@digdir/designsystemet-react';
import { type Localization, type LocaleCodes, interpolate } from '@fdk-frontend/localization';

import { HeadingWithDivider } from '@fdk-frontend/ui';

import styles from './share-data-banner.module.scss';
import OrganizationCarousel from '../organization-carousel';

type ShareDataBannerProps = {
    dictionary: Localization;
    locale: LocaleCodes;
};

const ShareDataBanner = ({ dictionary, locale }: ShareDataBannerProps) => (
    <div className={styles.shareDataBanner}>
        <HeadingWithDivider
            level={2}
            className={styles.headline}
        >
            <OrganizationCarousel dictionary={dictionary} />
        </HeadingWithDivider>
        <Paragraph>
            {interpolate(dictionary.shareDataBanner.content, {
                link: <Link href={`/organizations`}>{dictionary.shareDataBanner.organizationsLinkText}</Link>,
            })}
        </Paragraph>
        <div>
            <div className={styles.buttons}>
                <Button asChild>
                    <Link href={`/publishing`}>{dictionary.shareDataBanner.shareDataLinkText}</Link>
                </Button>
                <Button
                    asChild
                    variant='secondary'
                >
                    <Link href={`/${locale}/docs`}>{dictionary.shareDataBanner.documentationLinkText}</Link>
                </Button>
            </div>
        </div>
    </div>
);

export { ShareDataBanner };
