import React from 'react';

import { Textfield, Heading } from '@digdir/designsystemet-react';
import { HeadingWithDivider } from '@fdk-frontend/ui/typography';
import { Dictionary } from '@fdk-frontend/i18n';

import { OrakelSearch } from '../orakel-search';
import { Norgeskart } from './components/norgeskart';

import styles from './frontpage-banner.module.css';

type FrontpageBannerProps = {
  endpoint: string;
  dictionary: Dictionary;
}

const FrontpageBanner = ({ endpoint, dictionary }: FrontpageBannerProps) => (
  <div className={styles.outer}>
    <div className={styles.inner}>
      <HeadingWithDivider level={1} className={styles.headline}>
        {dictionary.aiBanner.title}
      </HeadingWithDivider>
      <OrakelSearch
        endpoint={endpoint}
        dictionary={dictionary}
      />
    </div>
    <Norgeskart />
  </div>
);

export { FrontpageBanner };
