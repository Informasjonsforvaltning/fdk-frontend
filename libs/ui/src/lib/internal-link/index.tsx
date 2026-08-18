"use client";

import { type PropsWithChildren } from "react";
import { Link, type LinkProps } from "@digdir/designsystemet-react";
import { i18n, type LocaleCodes } from "@fdk-frontend/localization";
import { Dataset, type SearchObject } from "@fellesdatakatalog/types";
import ExternalLink from "../external-link";
import { type Profile } from "@fdk-frontend/types";

interface TransportDataset extends SearchObject {
  isRelatedToTransportportal?: boolean;
}

export type InternalLinkProps = Omit<LinkProps, "children"> &
  PropsWithChildren & {
    entity?: SearchObject | Dataset;
    locale?: LocaleCodes;
    profile: Profile;
    baseUri: string;
  };

const InternalLink = ({
  children,
  entity,
  locale = i18n.defaultLocale,
  profile = "default",
  baseUri,
  ...props
}: InternalLinkProps) => {
  const dataset = entity as TransportDataset;
  if (!(profile === "transportportal") || (profile === "transportportal" && dataset?.isRelatedToTransportportal)) {
    return <Link {...props}>{children} </Link>;
  }

  return (
    <ExternalLink
      {...props}
      href={baseUri + props.href}
      gateway
    >
      {children}
    </ExternalLink>
  );
};

export default InternalLink;
