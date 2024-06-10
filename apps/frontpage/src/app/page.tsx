import "./global.css"

import styles from './page.module.css';

import { FrontpageBanner } from './components/frontpage-banner';
import { ShareDataBanner } from './components/share-data-banner';

export default function Index() {
  return (
    <div className={styles.page}>
      <FrontpageBanner />
      <main className='main-content'>
        <ShareDataBanner />
      </main>
    </div>
  );
}
