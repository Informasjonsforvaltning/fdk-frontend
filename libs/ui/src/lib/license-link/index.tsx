import React from "react";
import cn from "classnames";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { isOpenLicense } from "@fdk-frontend/utils";
import ExternalLink from "../external-link";
import { Tag } from "@digdir/designsystemet-react";
import styles from "./styles.module.scss";

type LicenseLinkProps = {
  uri: string;
  locale: LocaleCodes;
  openLicenseLabel: string;
};

const LicenseLink = ({
  children,
  uri,
  locale,
  openLicenseLabel,
  ...props
}: LicenseLinkProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(styles.wrapper, { [styles.isOpenLicense]: isOpenLicense(uri) })}
      {...props}
    >
      <ExternalLink
        href={uri}
        locale={locale}
        gateway
      >
        {children}
      </ExternalLink>
      {isOpenLicense(uri) && (
        <div className={styles.licenseTagContainer}>
          <Tag
            data-color="success"
            data-size="md"
          >
            {openLicenseLabel}
          </Tag>
        </div>
      )}
    </div>
  );
};

export default LicenseLink;
