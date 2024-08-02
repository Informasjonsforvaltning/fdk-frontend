import styles from './page.module.css';

import { FrontpageBanner } from './components/frontpage-banner';
import { ShareDataBanner } from './components/share-data-banner';
import CatalogsBanner from './components/catalogs-banner';

export default function Index() {
  return (
    <div className={styles.page}>
      <FrontpageBanner />
      <main className='main-content'>
        <ShareDataBanner />
        <CatalogsBanner />
      </main>
    </div>
  );
}
