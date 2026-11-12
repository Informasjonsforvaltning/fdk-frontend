import React from "react";
import cn from "classnames";
import { Button, type ButtonProps } from "@digdir/designsystemet-react";
import { OrgLogo, type OrgLogoProps } from "../org-logo";
import styles from "./org-button.module.scss";
import ExternalLink from "../external-link";

export type OrgButtonProps = {
  href?: string;
  reverse?: boolean;
  baseUri?: string;
} & OrgLogoProps;

const OrgButton = ({
  children,
  className,
  href,
  orgLogoSrc,
  orgNr,
  reverse,
  baseUri = "",
  ...props
}: OrgButtonProps & ButtonProps) => {
  const classNames = cn(styles.wrapper, className, { [styles.reverse]: reverse });
  const content = (
    <>
      <OrgLogo
        className={styles.orgLogo}
        orgLogoSrc={orgLogoSrc}
        orgNr={orgNr}
      />
      {children}
    </>
  );

  if (!href) {
    return <div className={classNames}>{content}</div>;
  }

  return (
    <Button
      asChild
      data-size="sm"
      variant="tertiary"
      className={classNames}
      {...props}
    >
      <ExternalLink
        href={href}
        baseUri={baseUri}
      >
        {content}
      </ExternalLink>
    </Button>
  );
};

export default OrgButton;
