"use client";

import { Link } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import { useConsent } from "./consent-context";

export type ConsentReopenButtonProps = {
  locale: LocaleCodes;
  className?: string;
  /** Override the link text (defaults to the localized "manage cookies" label). */
  label?: string;
};

/**
 * Control that reopens the consent banner so a visitor can change their choice.
 * Rendered as a plain designsystemet Link so it is visually identical to sibling
 * links wherever it is placed (footer, main menu). `href` points to the cookie policy
 * as a no-JS fallback; with JS the click opens the banner instead of navigating.
 */
export const ConsentReopenButton = ({ locale, className, label }: ConsentReopenButtonProps) => {
  const { openBanner } = useConsent();
  const t = getLocalization(locale).common.consent;

  return (
    <Link
      href={t.readMoreHref}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        openBanner();
      }}
    >
      {label ?? t.reopenLink}
    </Link>
  );
};

export default ConsentReopenButton;
