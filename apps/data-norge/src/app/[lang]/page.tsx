import 'server-only';
import { type Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import { LocaleCodes, getLocalization } from '@fdk-frontend/localization';
import { Header, Footer } from '@fdk-frontend/ui';
import { FrontpageBanner } from '../components/frontpage/frontpage-banner';
import { ShareDataBanner } from '../components/frontpage/share-data-banner';
import CatalogsBanner from '../components/frontpage/catalogs-banner';

type FrontpageProps = PageProps<'/[lang]'>;

const Frontpage = async (props: FrontpageProps) => {
    const params = await props.params;
    const locale = params.lang as LocaleCodes;

    // Opt-in dynamic rendering
    await noStore();

    const { FDK_LLM_SEARCH_BASE_URI: llmSearchBaseUri = '' } = process.env;

    const loc = getLocalization(locale);
    const frontpageDictionary = loc.frontpage;

    return (
        <>
            <Header
                locale={locale}
                frontpage
            />
            <main id='main'>
                <FrontpageBanner
                    dictionary={frontpageDictionary}
                    locale={locale}
                    endpoint={`${llmSearchBaseUri}/llm`}
                />
                <div className='main-content'>
                    <ShareDataBanner
                        dictionary={frontpageDictionary}
                        locale={locale}
                    />
                    <CatalogsBanner
                        frontpageDictionary={frontpageDictionary}
                        commonDictionary={loc.common}
                        locale={locale}
                    />
                </div>
            </main>
            <Footer locale={locale} />
        </>
    );
};

export const generateMetadata = async (props: FrontpageProps): Promise<Metadata> => {
    const params = await props.params;
    const locale = params.lang as LocaleCodes;
    const frontpageDictionary = getLocalization(locale).frontpage;

    return {
        title: `${frontpageDictionary.metadata.title} - data.norge.no`,
        description: frontpageDictionary.metadata.description,
        alternates: {
            canonical: `https://data.norge.no/${locale}`,
        },
    };
};

export default Frontpage;
