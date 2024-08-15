import 'server-only';

import type { Metadata, ResolvingMetadata } from 'next'
import { unstable_noStore as noStore } from 'next/cache';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';

import { FrontpageBanner } from './components/frontpage-banner';
import { ShareDataBanner } from './components/share-data-banner';
import CatalogsBanner from './components/catalogs-banner';

export type FrontpageProps = {
    params: {
        lang: Locale['code'];
    };
};

const Frontpage = async ({ params }: FrontpageProps) => {
    // Opt-in dynamic rendering
    noStore();

    const { FDK_BASE_URI: baseUri = '', FDK_LLM_SEARCH_BASE_URI: llmSearchBaseUri = '' } = process.env;

    const commonDictionary = await getDictionary(params.lang, 'common');
    const frontpageDictionary = await getDictionary(params.lang, 'frontpage');

    return (
        <div>
            <FrontpageBanner
                dictionary={frontpageDictionary}
                baseUri={baseUri}
                endpoint={`${llmSearchBaseUri}/llm`}
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
};

export async function generateMetadata({ params }: FrontpageProps): Promise<Metadata> {
    
    const frontpageDictionary = await getDictionary(params.lang, 'frontpage');

    return {
        title: frontpageDictionary.metadata.title,
        description: frontpageDictionary.metadata.description
    }
}

export default Frontpage;
