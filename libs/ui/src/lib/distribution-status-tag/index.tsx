import cn from "classnames";
import { Tag, type TagProps } from "@digdir/designsystemet-react";
import { type LocaleCodes, getLocalization } from "@fdk-frontend/localization";
import { type TextLanguage } from "@fellesdatakatalog/types";
import { printLocaleValue } from "@fdk-frontend/utils";
import styles from "./styles.module.scss";

const DISTRIBUTION_STATUS_COLORS = {
  COMPLETED: "success",
  DEVELOP: "warning",
  WITHDRAWN: "danger",
  DEPRECATED: "warning",
  DISCONTINUED: "danger",
  ARCHIVE: "neutral",
  ONGOING: "info",
  PLANNED: "warning",
  REQUIRED: "info",
} as const;

type DistributionStatusCode = keyof typeof DISTRIBUTION_STATUS_COLORS;
type DistributionStatusColor = (typeof DISTRIBUTION_STATUS_COLORS)[DistributionStatusCode] | "neutral";

const isDistributionStatusCode = (code: string): code is DistributionStatusCode =>
  Object.hasOwn(DISTRIBUTION_STATUS_COLORS, code);

const normalizeStatusCode = (statusCode?: string) => {
  if (!statusCode) return undefined;
  const segment = statusCode.split("/").filter(Boolean).pop() ?? statusCode;
  const code = segment.trim().toUpperCase();
  return code || undefined;
};

const colorForStatus = (code?: string): DistributionStatusColor =>
  code && isDistributionStatusCode(code) ? DISTRIBUTION_STATUS_COLORS[code] : "neutral";

type DistributionStatusTagProps = {
  statusCode?: string;
  prefLabel?: Partial<TextLanguage>;
  locale: LocaleCodes;
};

const DistributionStatusTag = ({ statusCode, prefLabel, locale, ...props }: DistributionStatusTagProps & TagProps) => {
  const dictionary = getLocalization(locale).detailsPage;
  const code = normalizeStatusCode(statusCode);
  const labelFromCode = code ? dictionary.statusCodes[code] : undefined;
  const label =
    (typeof labelFromCode === "string" ? labelFromCode : undefined) ??
    printLocaleValue(locale, prefLabel) ??
    dictionary.unknownStatusLabel;

  return (
    <Tag
      {...props}
      className={cn(styles.tag, props.className)}
      data-color={colorForStatus(code)}
    >
      {label}
    </Tag>
  );
};

export default DistributionStatusTag;
