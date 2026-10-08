import React from "react";
import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import ExternalLink from "../external-link";
import DatasetPreviewWidget from "../dataset-preview-widget/";
import styles from "./styles.module.scss";

type DownloadDistributionWidgetProps = {
  title: string;
  downloadUrl: string;
  dictionary: Localization;
  locale: LocaleCodes;
  hasBeenOpened: boolean;
};

const DownloadDistributionWidget = ({
  title,
  downloadUrl,
  dictionary,
  locale,
  hasBeenOpened,
  ...props
}: DownloadDistributionWidgetProps & React.HTMLAttributes<HTMLDivElement>) => {
  const datasetPreviewTitle = title || downloadUrl || dictionary.distributions.header.nameless;
  return (
    <div
      className={styles.wrapper}
      {...props}
    >
      <ExternalLink
        href={downloadUrl}
        locale={locale}
        gateway
      >
        {downloadUrl}
      </ExternalLink>
      <DatasetPreviewWidget
        downloadUrl={downloadUrl}
        dictionary={dictionary}
        title={datasetPreviewTitle}
        triggerBtnClass={styles.previewTriggerBtn}
        hasBeenOpened={hasBeenOpened}
      />
    </div>
  );
};

export default DownloadDistributionWidget;
