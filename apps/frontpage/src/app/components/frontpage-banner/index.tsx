import React from 'react';
import { Textfield, Heading } from '@digdir/designsystemet-react';

import { OrakelSearch } from '../orakel-search';
import { Norgeskart } from './components/norgeskart';

import styles from './frontpage-banner.module.css';

const FrontpageBanner = () => (
  <div className={styles.outer}>
    <div className={styles.inner}>
      <Heading
        level={1}
        size="2xlarge"
        className={styles.headline}
      >
        Der Norge deler data
      </Heading>
      <div className={styles.dividerLine} />
      <div className={styles.orakelSearchContainer}>
        <OrakelSearch />
      </div>
    </div>
    <Norgeskart />
  </div>
);

export { FrontpageBanner };
