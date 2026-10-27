"use client";

import { useState, useEffect, type PropsWithChildren } from "react";
import { Link, type LinkProps } from "@digdir/designsystemet-react";
import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { i18n, type LocaleCodes } from "@fdk-frontend/localization";
import { sanitizeLinkHref } from "@fdk-frontend/utils";

/**
 * @prop {boolean} gateway - Determines if the link should go through /leaving-gateway.
 * Will still be bypassed if link goes to same hostname as app.
 */
export type ExternalLinkProps = Omit<LinkProps, "children"> &
  PropsWithChildren & {
    locale?: LocaleCodes;
    showIcon?: boolean;
    gateway?: boolean;
    baseUri?: string;
  };

const ExternalLink = ({
  children,
  showIcon,
  locale = i18n.defaultLocale,
  gateway,
  baseUri = "",
  ...props
}: ExternalLinkProps) => {
  const { href = "" } = props;
  if (!href) return children;
  const target = ExternalHref({ locale: locale, gateway: gateway, baseUri: baseUri, ...props });

  return (
    <Link
      {...props}
      href={target}
    >
      {children}
      {showIcon && (
        <ExternalLinkIcon
          aria-hidden
          fontSize="1em"
          style={{ marginLeft: "0.125em" }}
        />
      )}
    </Link>
  );
};

export default ExternalLink;

export function ExternalHref(props: ExternalLinkProps) {
  const { href = "", baseUri, locale, gateway } = props;
  // Block javascript:/data: schemes from becoming an href (used directly on SSR).
  const [target, setTarget] = useState(() => sanitizeLinkHref(href));

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("url", `${baseUri}${href}`);
    const gatewayLink = `/${locale}/leaving-gateway?${searchParams}`;

    // Needed to bypass gateway where an assumed external link actually points to data.norge.no
    const destination = new URL(href, baseUri || window.location.href);
    const current = new URL(window.location.href);
    const isSameHostname = destination.hostname === current.hostname;

    if (gateway && !isSameHostname) {
      setTarget(gatewayLink);
    }
  }, []);

  return target;
}
