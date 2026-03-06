import { Link, Paragraph, Button, Fieldset } from '@digdir/designsystemet-react';
import { type LocaleCodes, getLocalization } from '@fdk-frontend/localization';
import styles from './styles.module.scss';

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

  return (
    <div className={styles.aiPromoSplash} data-color-scheme='light'>
      <Paragraph data-size='md'>
        <strong>KI-søket</strong> bruker metadata fra data.norge.no og hjelper deg med å finne det du leter etter i alle våre datakataloger. Ved å bruke naturlig språk kan du søke fritt uten å måtte kjenne til spesifikke datasettnavn, fagtermer eller tekniske formater.
      </Paragraph>
      <Fieldset className={styles.suggestions}>
        <Fieldset.Legend data-size='md'>Prøv f.eks. en av disse:</Fieldset.Legend>
        {dictionary.frontpage.aiBanner.suggestions.list.slice(0, 5).map((suggestion: string) => (
          <Button data-size='sm' variant='secondary' asChild key={suggestion}>
            <Link href={`/${locale}/search?q=${suggestion}`}>{suggestion}</Link>
          </Button>
        ))}
      </Fieldset>
      <Link href={`/${locale}/docs/finding-data/ai-search`} className={styles.aiAboutLink}>
        {t.aboutLinkText}
      </Link>
    </div>
  );
};

export default AiPromoSplash;
