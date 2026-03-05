import React from 'react';
import { Heading, Link, Paragraph, Button } from '@digdir/designsystemet-react';
import { type LocaleCodes, getLocalization } from '@fdk-frontend/localization';
import styles from './styles.module.scss';

export type AiPromoSplashProps = {
  locale: LocaleCodes;
  /** Optional override for the "about" link href (e.g. to a docs page). */
  aboutLinkHref?: string;
  /** Optional override for the example query link href (e.g. pre-filled search). */
  exampleLinkHref?: string;
};

const AiPromoSplash = ({
  locale,
  aboutLinkHref = '#',
  exampleLinkHref = '#',
}: AiPromoSplashProps) => {
  const dictionary = getLocalization(locale);
  const t = dictionary.common.aiPromoSplash as {
    heading: string;
    examplePrefix: string;
    exampleLinkText: string;
    aboutLinkText: string;
  };

  return (
    <div className={styles.aiPromoSplash} data-color-scheme='light'>
      {/* <Heading className={styles.aiPromoHeading}>
        {t.heading}
        Prøv vårt KI-søk med naturlig språk
      </Heading> */}
      <Paragraph data-size='md'>
        <strong>KI-søket</strong> bruker metadata fra data.norge.no og hjelper deg med å finne det du leter etter i alle våre datakataloger. Ved å bruke naturlig språk kan du søke fritt uten å måtte kjenne til spesifikke datasettnavn, fagtermer eller tekniske formater.
      </Paragraph>
      <Paragraph data-size='md'>
        Prøv f.eks. en av disse:
      </Paragraph>
      <div className={styles.suggestions}>
          {
            dictionary.frontpage.aiBanner.suggestions.list.slice(0, 3).map(suggestion =>
              <Button
                data-size='sm'
                variant='secondary'
                asChild
              >
                <Link href={`/${locale}/search?q=${suggestion}`}>{suggestion}</Link>
              </Button>
            )
          }
      </div>
      {/* <Link href={aboutLinkHref} className={styles.aiAboutLink}>
        {t.aboutLinkText}
      </Link> */}
    </div>
  );
};

export default AiPromoSplash;
