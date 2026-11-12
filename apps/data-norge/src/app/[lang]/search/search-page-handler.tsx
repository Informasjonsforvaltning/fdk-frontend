import { type Metadata } from "next";
import { getLocalization, type LocaleCodes, i18n } from "@fdk-frontend/localization";
import { isSearchSetPathSegment } from "@fdk-frontend/utils";
import { absoluteUrl, getSite } from "../../../utils/site";

export type SearchPageHandlerProps = {
  params: Promise<{
    lang: LocaleCodes;
    set?: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const getSearchPageMetadata = async function (props: SearchPageHandlerProps): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = params.lang ?? i18n.defaultLocale;
  const dictionary = getLocalization(locale).searchPage;
  const site = await getSite();
  const segmentPath = params.set && isSearchSetPathSegment(params.set) ? `/${params.set}` : "";
  const query = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const qs = query ? `?q=${encodeURIComponent(query)}` : "";
  const searchPath = (lang: string) => absoluteUrl(site.origin, `/${lang}/search${segmentPath}${qs}`);

  return {
    title: `${dictionary.metadata.title} - ${site.name}`,
    description:
      site.profile === "transportportal"
        ? dictionary.metadata.transportportalDescription
        : dictionary.metadata.description,
    alternates: {
      canonical: searchPath(locale),
      languages: {
        nb: searchPath("nb"),
        en: searchPath("en"),
        nn: searchPath("nn"),
      },
    },
  };
};
