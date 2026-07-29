"use client";

import cn from "classnames";
import { Link } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import { useConsent } from "./consent-context";
import styles from "./consent-reopen-button.module.scss";

export type ConsentReopenButtonProps = {
  locale: LocaleCodes;
  className?: string;
};

/**
 * Footer control that reopens the consent banner so a visitor can change their choice.
 * Rendered as a designsystemet Link (via `asChild`) so it matches the other footer links.
 */
export const ConsentReopenButton = ({ locale, className }: ConsentReopenButtonProps) => {
  const { openBanner } = useConsent();
  const t = getLocalization(locale).common.consent;

  return (
    <Link asChild>
      <button
        type="button"
        className={cn(styles.reset, className)}
        onClick={openBanner}
      >
        {t.reopenLink}
      </button>
    </Link>
  );
};

export default ConsentReopenButton;
