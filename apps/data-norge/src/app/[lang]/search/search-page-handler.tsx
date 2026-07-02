import { type Metadata } from "next";
import { getLocalization, type LocaleCodes, i18n } from "@fdk-frontend/localization";
import { isValidEntityTab } from "@fdk-frontend/ui/search-tabs/search-tab-config";

export type SearchPageHandlerProps = {
  params: Promise<{
    lang: LocaleCodes;
    tab?: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const getSearchPageMetadata = async function (props: SearchPageHandlerProps): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = params.lang ?? i18n.defaultLocale;
  const dictionary = getLocalization(locale).searchPage;
  const segmentPath = params.tab && isValidEntityTab(params.tab) ? `/${params.tab}` : "";
  const query = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const qs = query ? `?q=${encodeURIComponent(query)}` : "";

  return {
    title: `${dictionary.metadata.title} - data.norge.no`,
    description: dictionary.metadata.description,
    alternates: {
      canonical: `https://data.norge.no/${locale}/search${segmentPath}${qs}`,
      languages: {
        nb: `https://data.norge.no/nb/search${segmentPath}${qs}`,
        en: `https://data.norge.no/en/search${segmentPath}${qs}`,
        nn: `https://data.norge.no/nn/search${segmentPath}${qs}`,
      },
    },
  };
};
