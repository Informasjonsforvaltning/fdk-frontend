import { Paragraph, Tag } from "@digdir/designsystemet-react";
import { HelpText } from "@fellesdatakatalog/ui";
import { getLocalization, interpolate, type LocaleCodes } from "@fdk-frontend/localization";
import styles from "./styles.module.scss";

type UnpublishedTagProps = {
  locale: LocaleCodes;
  lastModified?: string;
};

// Chromium has no Nynorsk date locale, so month names otherwise fall back to English.
const dateLocale = (locale: LocaleCodes) => (locale === "nn" ? "nb" : locale);

const UnpublishedTag = ({ locale, lastModified }: UnpublishedTagProps) => {
  const dictionary = getLocalization(locale).common.unpublishedTag;

  return (
    <Tag
      className={styles.tag}
      data-color="warning"
    >
      {dictionary.label}
      <HelpText aria-label={dictionary.helpTextTitle}>
        <div className="article">
          <Paragraph>{dictionary.helpText}</Paragraph>
          {lastModified && (
            <Paragraph>
              {interpolate(dictionary.lastUpdated, {
                date: new Date(lastModified).toLocaleString(dateLocale(locale), { dateStyle: "long" }),
              })}
            </Paragraph>
          )}
        </div>
      </HelpText>
    </Tag>
  );
};

export default UnpublishedTag;
