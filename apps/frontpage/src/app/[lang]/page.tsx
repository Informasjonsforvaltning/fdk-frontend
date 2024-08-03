import { getDictionary, Locale } from '@fdk-frontend/dictionaries';

// import styles from './page.module.css';

import { FrontpageBanner } from './components/frontpage-banner';
import { ShareDataBanner } from './components/share-data-banner';
import CatalogsBanner from './components/catalogs-banner';

export type FrontpageProps = {
  params: {
    lang: Locale['code'];
  }
};

const Frontpage = async ({ params }: FrontpageProps) => {

  const {
    FDK_BASE_URI
  } = process.env;

  const dictionary = await getDictionary(params.lang, 'common');

  return (
    <div>
      <FrontpageBanner />
      <main className='main-content'>
        <ShareDataBanner />
        <CatalogsBanner
          dictionary={dictionary}
          baseUri={FDK_BASE_URI}
        />
      </main>
    </div>
  );
}

export default Frontpage;