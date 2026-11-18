"use client";

import { Button, Dialog, Card, Heading, Paragraph, Link } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import styles from "./styles.module.scss";
import Article from "../article";

type ShareDataDialogProps = {
  label: string;
  className?: string;
  locale: LocaleCodes;
  catalogPortalBaseUri: string;
  adminGuiBaseUri: string;
};

const ShareDataDialog = ({ label, className, locale, catalogPortalBaseUri, adminGuiBaseUri }: ShareDataDialogProps) => {
  const dictionary = getLocalization(locale).common.shareDataDialog;
  const docsPath = (path: string) => `/${locale}/docs/sharing-data/${path}`;
  return (
    <Dialog.TriggerContext>
      <Dialog.Trigger asChild>
        <Button
          className={className}
          data-size="sm"
          variant="primary"
        >
          <span>{label}</span>
        </Button>
      </Dialog.Trigger>
      <Dialog
        className={styles.dialog}
        closedby="any"
        data-color-scheme="light"
      >
        <Dialog.Block>
          <Heading
            className={styles.headerWrapper}
            data-size="sm"
          >
            {dictionary.heading}
          </Heading>
          <div className={styles.cards}>
            <Card className={styles.card}>
              <Card.Block>
                <Heading
                  className={styles.catalogTitle}
                  data-size="xs"
                  level={3}
                >
                  {dictionary.registration.title}
                </Heading>
                <Paragraph>
                  {dictionary.registration.description}
                </Paragraph>
                <Button data-size="sm" asChild>
                  <a href={catalogPortalBaseUri}>
                    {dictionary.registration.cta}
                  </a>
                </Button>
              </Card.Block>
              <Card.Block className={styles.auxPanel}>
                <Heading
                  className={styles.catalogTitle}
                  data-size="2xs"
                  level={3}
                >
                  {dictionary.helpHeading}
                </Heading>
                <Article>
                  <ul>
                    <li><Link href={docsPath("about-registration")}>{dictionary.registration.getStartedLink}</Link></li>
                    <li><Link href={docsPath("login-and-access")}>{dictionary.accessLink}</Link></li>
                    <li><Link href={docsPath("publishing-data-descriptions/2-creating-descriptions-registration")}>{dictionary.registration.createDescriptionsLink}</Link></li>
                  </ul>
                </Article>
              </Card.Block>
            </Card>
            <Card className={styles.card}>
              <Card.Block>
                <Heading
                  className={styles.catalogTitle}
                  data-size="xs"
                  level={3}
                >
                  {dictionary.harvesting.title}
                </Heading>
                <Paragraph>
                  {dictionary.harvesting.description}
                </Paragraph>
                <Button data-size="sm" asChild>
                  <a href={adminGuiBaseUri}>
                    {dictionary.harvesting.cta}
                  </a>
                </Button>
              </Card.Block>
              <Card.Block className={styles.auxPanel}>
                <Heading
                  className={styles.catalogTitle}
                  data-size="2xs"
                  level={3}
                >
                  {dictionary.helpHeading}
                </Heading>
                <Article>
                  <ul>
                      <li><Link href={docsPath("about-harvesting")}>{dictionary.harvesting.getStartedLink}</Link></li>
                      <li><Link href={docsPath("login-and-access")}>{dictionary.accessLink}</Link></li>
                      <li><Link href={docsPath("publishing-data-descriptions/3-publishing-descriptions")}>{dictionary.harvesting.registerEndpointLink}</Link></li>
                  </ul>
                </Article>
              </Card.Block>
            </Card>
          </div>
        </Dialog.Block>
      </Dialog>
    </Dialog.TriggerContext>
  );
};

export default ShareDataDialog;
