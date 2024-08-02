import React from 'react';
import { Textfield, Heading } from '@digdir/designsystemet-react';

import { HeadingWithDivider } from '../typography';

import { OrakelSearch } from '../orakel-search';
import { Norgeskart } from './components/norgeskart';

import styles from './frontpage-banner.module.css';

const FrontpageBanner = () => (
  <div className={styles.outer}>
    <div className={styles.inner}>
      <HeadingWithDivider level={1} className={styles.headline}>
        Der Norge deler data
      </HeadingWithDivider>
      <OrakelSearch />
    </div>
    <Norgeskart />
  </div>
);

export { FrontpageBanner };
