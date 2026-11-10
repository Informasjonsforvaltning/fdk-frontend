import "server-only";
import { type Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { type Locale, getLocalization } from "@fdk-frontend/localization";
import { Header, Footer } from "@fdk-frontend/ui";
import { getProfile } from "@fdk-frontend/utils/server";
import { absoluteUrl, getSite } from "../../utils/site";
import { FrontpageBanner } from "../components/frontpage/frontpage-banner";
import { ShareDataBanner } from "../components/frontpage/share-data-banner";
import CatalogsBanner from "../components/frontpage/catalogs-banner";
import { TransportportalFrontpage } from "../components/frontpage/transportportal-frontpage";

export type FrontpageProps = {
  params: Promise<{
    lang: Locale["code"];
  }>;
};

const Frontpage = async (props: FrontpageProps) => {
  const params = await props.params;

  // Opt-in dynamic rendering
  await noStore();

  const searchPrototypeEnabled = process.env.SEARCH_PROTOTYPE_ENABLED === "true";
  const { FDK_LLM_SEARCH_BASE_URI: llmSearchBaseUri = "" } = process.env;

  const loc = getLocalization(params.lang);
  const frontpageDictionary = loc.frontpage;
  const profile = await getProfile();

  return (
    <>
      <Header
        locale={params.lang}
        frontpage
        profile={profile}
        showFindDataButton={!searchPrototypeEnabled}
      />
      <main id="main">
        {profile === "transportportal" ? (
          <TransportportalFrontpage
            dictionary={loc.common}
            locale={params.lang}
          />
        ) : (
          <>
            <FrontpageBanner
              dictionary={frontpageDictionary}
              locale={params.lang}
              endpoint={`${llmSearchBaseUri}/llm`}
              searchPrototypeEnabled={searchPrototypeEnabled}
            />
            <div className="main-content">
              <ShareDataBanner
                dictionary={frontpageDictionary}
                locale={params.lang}
              />
              <CatalogsBanner
                frontpageDictionary={frontpageDictionary}
                commonDictionary={loc.common}
                locale={params.lang}
              />
            </div>
          </>
        )}
      </main>
      <Footer
        locale={params.lang}
        profile={profile}
      />
    </>
  );
};

export const generateMetadata = async (props: FrontpageProps): Promise<Metadata> => {
  const params = await props.params;
  const frontpageDictionary = getLocalization(params.lang).frontpage;
  const site = await getSite();
  const metadata =
    site.profile === "transportportal" ? frontpageDictionary.metadata.transportportal : frontpageDictionary.metadata;

  return {
    title: `${metadata.title} - ${site.name}`,
    description: metadata.description,
    alternates: {
      canonical: absoluteUrl(site.origin, `/${params.lang}`),
    },
  };
};

export default Frontpage;
