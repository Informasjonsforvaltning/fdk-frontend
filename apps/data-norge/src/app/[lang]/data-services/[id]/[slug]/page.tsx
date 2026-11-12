import { notFound, redirect } from "next/navigation";
import { i18n, getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import { getSlug, printLocaleValue } from "@fdk-frontend/utils";
import { type DataService, type CommunityTopic, type SearchObject } from "@fellesdatakatalog/types";
import DataServiceDetailsPage from "../../../../components/details-page/data-service";
import { getOrgLogo, getApi, getAllCommunityTopics, searchDatasets } from "@fdk-frontend/data-access/server";
import { getResourceAlternates, getResourceRobots } from "../../../../../utils/resource-seo";
import { absoluteUrl, getSite } from "../../../../../utils/site";

export type DetailsPageWrapperProps = {
  params: Promise<{
    lang: LocaleCodes;
    id: string;
    slug: string;
  }>;
  searchParams: Promise<any>;
};

export const generateMetadata = async (props: DetailsPageWrapperProps) => {
  const params = await props.params;
  const locale = params.lang ?? i18n.defaultLocale;
  const dictionary = getLocalization(locale).detailsPage;
  const site = await getSite();

  try {
    const dataService = await getApi(params.id);
    const title = printLocaleValue(locale, dataService.title) || dictionary.header.namelessDataService;
    const description = printLocaleValue(locale, dataService.description) ?? dictionary.breadcrumbs.dataServices;
    const pageUrl = absoluteUrl(
      site.origin,
      `/${locale}/data-services/${dataService.id}/${getSlug(dataService, locale)}`,
    );
    const isRemovedFromFDK = dataService.isRemovedFromFDK;

    return {
      title: `${title} - ${dictionary.breadcrumbs.dataServices} - ${site.name}`,
      description: description,
      robots: getResourceRobots(isRemovedFromFDK),
      openGraph: {
        title: title,
        description: description,
        type: "website",
        url: pageUrl,
        siteName: site.name,
        locale: locale,
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
      },
      alternates: getResourceAlternates({
        canonical: pageUrl,
        languages: {
          nb: absoluteUrl(site.origin, `/nb/data-services/${dataService.id}/${getSlug(dataService, "nb")}`),
          en: absoluteUrl(site.origin, `/en/data-services/${dataService.id}/${getSlug(dataService, "en")}`),
          nn: absoluteUrl(site.origin, `/nn/data-services/${dataService.id}/${getSlug(dataService, "nn")}`),
        },
        isRemovedFromFDK,
      }),
    };
  } catch (err) {
    console.error(`Failed generate metadata for data service with ID ${params.id}`, JSON.stringify(err));
    notFound();
  }
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {
  const { FDK_BASE_URI, FDK_COMMUNITY_BASE_URI } = process.env;

  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = params.lang ?? i18n.defaultLocale;
  const activeTab = searchParams?.tab ?? "overview";

  const loc = getLocalization(locale);
  const dictionaries = {
    common: loc.common,
    detailsPage: loc.detailsPage,
  };

  let dataService: DataService;
  let orgLogo: string | null = null;
  let communityTopics: CommunityTopic[] = [];
  let resolvedDatasets: SearchObject[] = [];

  try {
    dataService = await getApi(params.id);
  } catch (err) {
    console.error(`Failed to get data service with ID ${params.id}`, JSON.stringify(err));
    notFound();
  }

  // Redirect to canonical slug if needed
  const canonicalSlug = getSlug(dataService, locale);
  if (params.slug !== canonicalSlug) {
    const queryString = new URLSearchParams(searchParams as Record<string, string>).toString();
    const redirectUrl = queryString
      ? `/${locale}/data-services/${params.id}/${canonicalSlug}?${queryString}`
      : `/${locale}/data-services/${params.id}/${canonicalSlug}`;

    redirect(redirectUrl);
  }

  // Fetch publisher logo, community topics, and resolved datasets
  [orgLogo, communityTopics, resolvedDatasets] = await Promise.all([
    getOrgLogo(dataService.publisher?.id).catch(() => null),
    getAllCommunityTopics(dataService.id).catch((): CommunityTopic[] => []),
    searchDatasets(dataService.servesDataset)
      .then(({ hits = [] }) => hits)
      .catch((): SearchObject[] => []),
  ]);

  return (
    <DataServiceDetailsPage
      baseUri={FDK_BASE_URI as string}
      resource={dataService}
      orgLogo={orgLogo}
      communityTopics={communityTopics}
      communityBaseUri={FDK_COMMUNITY_BASE_URI as string}
      locale={locale}
      dictionaries={dictionaries}
      defaultActiveTab={activeTab}
      resolvedDatasets={resolvedDatasets}
    />
  );
};

export default DetailsPageWrapper;
