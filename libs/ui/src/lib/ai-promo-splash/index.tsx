import { Link, Paragraph, Button, Fieldset } from "@digdir/designsystemet-react";
import { type LocaleCodes, getLocalization } from "@fdk-frontend/localization";
import styles from "./styles.module.scss";

export type AiPromoSplashProps = {
  locale: LocaleCodes;
};

const AiPromoSplash = ({ locale }: AiPromoSplashProps) => {
  const dictionary = getLocalization(locale);
  const t = dictionary.common.aiPromoSplash as {
    heading: string;
    examplePrefix: string;
    exampleLinkText: string;
    aboutLinkText: string;
  };
  const promo = dictionary.searchPage.aiPromoSplash;

  return (
    <div
      className={styles.aiPromoSplash}
      data-color-scheme="light"
    >
      <Paragraph data-size="md">
        <strong>{promo.introHighlight}</strong> {promo.intro}
      </Paragraph>
      <Fieldset className={styles.suggestions}>
        <Fieldset.Legend data-size="md">{promo.suggestionsLegend}</Fieldset.Legend>
        {dictionary.frontpage.aiBanner.suggestions.list.slice(0, 5).map((suggestion: string) => (
          <Button
            data-size="sm"
            variant="secondary"
            asChild
            key={suggestion}
          >
            <Link href={`/${locale}/search?q=${suggestion}`}>{suggestion}</Link>
          </Button>
        ))}
      </Fieldset>
      <Link
        href={`/${locale}/docs/finding-data/ai-search`}
        className={styles.aiAboutLink}
      >
        {t.aboutLinkText}
      </Link>
    </div>
  );
};

export default AiPromoSplash;
