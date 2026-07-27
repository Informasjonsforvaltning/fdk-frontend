import SiteLayout from "../../components/site-layout";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { getProfile } from "@fdk-frontend/utils/server";
import SearchPageClient from "../../components/search-page/search-page-client";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const SearchLayout = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const resolved = await params;
  const locale = (resolved.lang ?? "nb") as LocaleCodes;
  const profile = await getProfile();
  return (
    <SiteLayout params={Promise.resolve({ lang: locale })}>
      <SearchPageClient
        lang={locale}
        profile={profile}
      />
    </SiteLayout>
  );
};

export default SearchLayout;
