import { Button, Paragraph, Link } from "@digdir/designsystemet-react";
import { type Localization, type LocaleCodes, interpolate } from "@fdk-frontend/localization";

import { HeadingWithDivider, ShareDataDialog } from "@fdk-frontend/ui";

import styles from "./share-data-banner.module.scss";
import OrganizationCarousel from "../organization-carousel";

type ShareDataBannerProps = {
  dictionary: Localization;
  locale: LocaleCodes;
  catalogPortalBaseUri: string;
  adminGuiBaseUri: string;
};

const ShareDataBanner = ({ dictionary, locale, catalogPortalBaseUri, adminGuiBaseUri }: ShareDataBannerProps) => (
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
    <div className={styles.buttons}>
      <ShareDataDialog
        label={dictionary.shareDataBanner.shareDataLinkText}
        locale={locale}
        catalogPortalBaseUri={catalogPortalBaseUri}
        adminGuiBaseUri={adminGuiBaseUri}
      />
      <Button
        asChild
        data-size="sm"
        variant="secondary"
      >
        <Link href={`/${locale}/docs`}>{dictionary.shareDataBanner.documentationLinkText}</Link>
      </Button>
    </div>
  </div>
);

export { ShareDataBanner };
