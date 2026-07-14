import React from "react";
import cn from "classnames";
import { Link, type LinkProps } from "@digdir/designsystemet-react";

import DigdirEmblem from "../core/svg/digdir-emblem";
import DigdirLogo from "../core/svg/digdir-logo";
import DpgBadge from "../core/svg/dpg-badge";

import styles from "./logo.module.scss";

export type LogoProfile = "default" | "transportportal";

export type LogoProps = {
  profile?: LogoProfile;
  tagline?: string;
};

const Logo = ({ profile = "default", tagline }: LogoProps) =>
  profile === "transportportal" ? (
    <div className={styles.transportportalLogo}>
      <span className={styles.transportportalWordmark}>Transportportal.no</span>
      {tagline ? <span className={styles.transportportalTagline}>{tagline}</span> : null}
    </div>
  ) : (
    <div className={styles.logo}>
      <DigdirEmblem />
      <span>data.norge.no</span>
    </div>
  );

export type LogoLinkProps = {
  baseUri?: string;
} & LogoProps;

const LogoLink = ({ className, profile, tagline, ...rest }: LogoLinkProps & Omit<LinkProps, "children">) => (
  <Link
    className={cn(styles.logoLink, "ds-button", className)}
    data-size="sm"
    data-variant="tertiary"
    {...rest}
  >
    <Logo
      profile={profile}
      tagline={tagline}
    />
  </Link>
);

const DpgLink = ({ className, ...props }: Omit<LinkProps, "children">) => (
  <Link
    className={cn(styles.dpgLink, "ds-button", className)}
    data-size="sm"
    data-variant="tertiary"
    {...props}
  >
    <DpgBadge />
  </Link>
);

const DigdirLogoLink = ({ className, ...props }: Omit<LinkProps, "children">) => (
  <Link
    className={cn(styles.digdirLogoLink, "ds-button", className)}
    data-size="sm"
    data-variant="tertiary"
    {...props}
  >
    <DigdirLogo />
  </Link>
);

export { Logo, LogoLink, DpgLink, DigdirLogoLink };
