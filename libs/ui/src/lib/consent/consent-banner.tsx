"use client";

import { useEffect, useId, useRef } from "react";
import { Button, Heading, Link, Paragraph } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import { useConsent } from "./consent-context";
import styles from "./consent-banner.module.scss";

export type ConsentBannerProps = {
  locale: LocaleCodes;
};

export const ConsentBanner = ({ locale }: ConsentBannerProps) => {
  const { consent, isBannerOpen, saveConsent } = useConsent();
  const t = getLocalization(locale).common.consent;
  const headingId = useId();
  const sectionRef = useRef<HTMLElement>(null);

  // Move focus to the banner only when the visitor reopened it themselves (a decision
  // already exists); never steal focus on the first-visit auto-display.
  useEffect(() => {
    if (isBannerOpen && consent !== null) {
      sectionRef.current?.focus();
    }
  }, [isBannerOpen, consent]);

  if (!isBannerOpen) return null;

  return (
    <section
      ref={sectionRef}
      tabIndex={-1}
      aria-labelledby={headingId}
      className={styles.banner}
      data-color-scheme="light"
    >
      <div className={styles.inner}>
        <Heading
          id={headingId}
          level={2}
          data-size="xs"
        >
          {t.heading}
        </Heading>
        <Paragraph data-size="sm">
          {t.description} <Link href={t.readMoreHref}>{t.readMoreLinkText}</Link>
        </Paragraph>
        <Paragraph data-size="sm">{t.necessaryNote}</Paragraph>
        {/* One purpose (statistics), so two equal buttons directly answer the question.
            Both share the primary variant so neither reads as the "correct" choice. */}
        <div className={styles.actions}>
          <Button
            data-size="sm"
            onClick={() => saveConsent({ statistics: true })}
          >
            {t.acceptButton}
          </Button>
          <Button
            data-size="sm"
            onClick={() => saveConsent({ statistics: false })}
          >
            {t.rejectButton}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConsentBanner;
