"use client";

import { type PropsWithChildren } from "react";
import { Link, type LinkProps } from "@digdir/designsystemet-react";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { Dataset, type SearchObject } from "@fellesdatakatalog/types";
import { type Profile } from "@fdk-frontend/types";
import { useDataNorgeOrigin } from "./origin-context";

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
  locale: _locale,
  profile = "data.norge",
  baseUri: _baseUri,
  ...props
}: InternalLinkProps) => {
  const dataset = entity as TransportDataset;
  const dataNorgeOrigin = useDataNorgeOrigin();

  if (!props.href) return children;

  // Transportportal resources stay on this host. Everything else opens on the
  // data.norge origin in the same window, including shared docs.
  if (profile !== "transportportal" || dataset?.isRelatedToTransportportal) {
    return <Link {...props}>{children}</Link>;
  }

  const href =
    typeof props.href === "string" ? `${dataNorgeOrigin.replace(/\/+$/, "")}${props.href}` : props.href;

  return (
    <Link
      {...props}
      href={href}
    >
      {children}
    </Link>
  );
};

export default InternalLink;
