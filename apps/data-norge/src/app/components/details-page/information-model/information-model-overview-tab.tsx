import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { type InformationModel } from "@fellesdatakatalog/types";
import { printLocaleValue } from "@fdk-frontend/utils";
import { Markdown, Article, PlaceholderBox, noHeadings } from "@fdk-frontend/ui";
import { Heading, Card } from "@digdir/designsystemet-react";
import styles from "../details-page.module.scss";

type InformationModelOverviewTabProps = {
  resource: InformationModel;
  locale: LocaleCodes;
  dictionary: Localization;
};

export default function InformationModelOverviewTab({
  resource,
  locale,
  dictionary,
}: InformationModelOverviewTabProps) {
  const description = printLocaleValue(locale, resource.description);

  return (
    <section className={styles.section}>
      <Heading
        level={2}
        data-size="xs"
      >
        {dictionary.overview.description.title}
      </Heading>
      {description ? (
        <Card className={styles.descriptionCard}>
          <Article>
            <Markdown
              locale={locale}
              allowedElements={noHeadings}
            >
              {description}
            </Markdown>
          </Article>
        </Card>
      ) : (
        <PlaceholderBox>{dictionary.overview.description.informationModelPlaceholder}</PlaceholderBox>
      )}
    </section>
  );
}
