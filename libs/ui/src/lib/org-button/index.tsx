import React from "react";
import cn from "classnames";
import { Button, type ButtonProps, Link } from "@digdir/designsystemet-react";
import { OrgLogo, type OrgLogoProps } from "../org-logo";
import styles from "./org-button.module.scss";

export type OrgButtonProps = {
  href?: string;
  reverse?: boolean;
} & OrgLogoProps;

const OrgButton = ({
  children,
  className,
  href,
  orgLogoSrc,
  orgNr,
  reverse,
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
      <Link href={href}>{content}</Link>
    </Button>
  );
};

export default OrgButton;
