import { getDictionary, Locale } from '@fdk-frontend/i18n';

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
    FDK_BASE_URI: baseUri = '/',
    FDK_LLM_SEARCH_ENDPOINT: endpoint
  } = process.env;
  
  const commonDictionary = await getDictionary(params.lang, 'common');
  const frontpageDictionary = await getDictionary(params.lang, 'frontpage');

  return (
    <div>
      <FrontpageBanner
        dictionary={frontpageDictionary}
        baseUri={baseUri}
        endpoint={endpoint}
      />
      <main className='main-content'>
        <ShareDataBanner
          dictionary={frontpageDictionary}
          baseUri={baseUri}
        />
        <CatalogsBanner
          frontpageDictionary={frontpageDictionary}
          commonDictionary={commonDictionary}
          baseUri={baseUri}
        />
      </main>
    </div>
  );
}

export default Frontpage;