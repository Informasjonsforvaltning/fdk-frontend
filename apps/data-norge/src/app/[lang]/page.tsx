import 'server-only';
import { type Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import { Header, Footer } from '@fdk-frontend/ui';
import { FrontpageBanner } from '../components/frontpage/frontpage-banner';
import { ShareDataBanner } from '../components/frontpage/share-data-banner';
import CatalogsBanner from '../components/frontpage/catalogs-banner';

export type FrontpageProps = {
    params: Promise<{
        lang: Locale['code'];
    }>;
};

const Frontpage = async (props: FrontpageProps) => {
    const params = await props.params;
    // Opt-in dynamic rendering
    await noStore();

    const {
        FDK_LLM_SEARCH_BASE_URI: llmSearchBaseUri = ''
    } = process.env;

    const commonDictionary = await getDictionary(params.lang, 'common');
    const frontpageDictionary = await getDictionary(params.lang, 'frontpage');

    return (
        <>
            <Header
                dictionary={commonDictionary}
                locale={params.lang}
                frontpage
            />
            <main id='main'>
                <FrontpageBanner
                    dictionary={frontpageDictionary}
                    locale={params.lang}
                    endpoint={`${llmSearchBaseUri}/llm`}
                />
                <div className='main-content'>
                    <ShareDataBanner
                        dictionary={frontpageDictionary}
                        locale={params.lang}
                    />
                    <CatalogsBanner
                        frontpageDictionary={frontpageDictionary}
                        commonDictionary={commonDictionary}
                        locale={params.lang}
                    />
                </div>
            </main>
            <Footer
                dictionary={commonDictionary}
                locale={params.lang}
            />
        </>
    );
};

export const generateMetadata = async (props: FrontpageProps): Promise<Metadata> => {
    const params = await props.params;
    const frontpageDictionary = await getDictionary(params.lang, 'frontpage');

    return {
        title: `${frontpageDictionary.metadata.title} - data.norge.no`,
        description: frontpageDictionary.metadata.description,
        alternates: {
            canonical: `https://data.norge.no/${params.lang}`,
        },
    };
};

export default Frontpage;
