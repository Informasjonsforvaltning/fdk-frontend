import { Button, Paragraph, Link } from '@digdir/designsystemet-react';
import { Dictionary, interpolate, type LocaleCodes } from '@fdk-frontend/dictionaries';

import { HeadingWithDivider } from '@fdk-frontend/ui/typography';

import styles from './share-data-banner.module.scss';
import OrganizationCarousel from '../organization-carousel';

type ShareDataBannerProps = {
    dictionary: Dictionary;
    baseUri: string;
    locale: LocaleCodes;
};

const ShareDataBanner = ({ dictionary, baseUri, locale }: ShareDataBannerProps) => (
    <div className={styles.shareDataBanner}>
        <HeadingWithDivider
            level={2}
            className={styles.headline}
        >
            <OrganizationCarousel dictionary={dictionary} />
        </HeadingWithDivider>
        <Paragraph>
            {interpolate(dictionary.shareDataBanner.content, {
                link: <Link href={`${baseUri}/organizations`}>{dictionary.shareDataBanner.organizationsLinkText}</Link>,
            })}
        </Paragraph>
        <div className={styles.buttons}>
            <Button asChild>
                <Link
                    href={`${baseUri}/publishing`}
                    inverted
                >
                    {dictionary.shareDataBanner.shareDataLinkText}
                </Link>
            </Button>
            <Button
                asChild
                variant='secondary'
            >
                <Link href={`${baseUri}/${locale}/docs`}>{dictionary.shareDataBanner.documentationLinkText}</Link>
            </Button>
        </div>
    </div>
);

export { ShareDataBanner };
