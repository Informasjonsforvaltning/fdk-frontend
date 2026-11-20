"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Link, Paragraph } from "@digdir/designsystemet-react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { type LocaleCodes, getLocalization } from "@fdk-frontend/localization";
import { bannerConfig } from "./config";
import styles from "./header-banner.module.scss";

type HeaderBannerProps = {
  locale: LocaleCodes;
};

const HeaderBanner = ({ locale }: HeaderBannerProps) => {
  const dictionary = getLocalization(locale).common;
  const until: string | null = bannerConfig.until;
  const dismissedKey = until === null ? null : `fdk-header-message-dismissed:${until}`;
  const messages: Partial<Record<LocaleCodes, string>> = bannerConfig.message;
  const message = messages[locale] ?? messages.nb;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (until === null || dismissedKey === null || !message) return;
    const endsAt = Date.parse(until);
    if (Number.isNaN(endsAt) || Date.now() >= endsAt) return;
    if (!localStorage.getItem(dismissedKey)) {
      setVisible(true);
    }
  }, [dismissedKey, message, until]);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    if (dismissedKey) localStorage.setItem(dismissedKey, "true");
  };

  return (
    <Alert
      data-color="info"
      data-header-banner=""
      className={styles.banner}
    >
      <Paragraph>
        {message}&nbsp;
        <Link href={bannerConfig.href}>{dictionary.header.alert.linkText}</Link>
      </Paragraph>
      <Button
        className={styles.closeButton}
        variant="tertiary"
        data-size="sm"
        aria-label={dictionary.header.alert.closeButton}
        onClick={dismiss}
      >
        <XMarkIcon aria-hidden />
      </Button>
    </Alert>
  );
};

export default HeaderBanner;
