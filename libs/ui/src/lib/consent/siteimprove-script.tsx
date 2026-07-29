"use client";

import Script from "next/script";
import { useConsent } from "./consent-context";

/** Siteimprove Analytics loader, gated behind statistics consent. */
export const SiteimproveScript = () => {
  const { consent } = useConsent();

  if (!consent?.statistics) return null;

  return (
    <Script
      src="https://siteimproveanalytics.com/js/siteanalyze_6255470.js"
      strategy="afterInteractive"
    />
  );
};

export default SiteimproveScript;
