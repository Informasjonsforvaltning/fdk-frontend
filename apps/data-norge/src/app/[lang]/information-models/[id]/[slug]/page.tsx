import { notFound, redirect } from "next/navigation";
import { i18n, getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import { getSlug, printLocaleValue } from "@fdk-frontend/utils";
import { type InformationModel, type CommunityTopic } from "@fellesdatakatalog/types";
import InformationModelDetailsPage from "../../../../components/details-page/information-model";
import { getOrgLogo, getInformationModel, getAllCommunityTopics } from "@fdk-frontend/data-access/server";
import { buildQueryString } from "../../build-query-string";

export type DetailsPageWrapperProps = {
  params: Promise<{
    lang: LocaleCodes;
    id: string;
    slug: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const generateMetadata = async (props: DetailsPageWrapperProps) => {
  const params = await props.params;
  const locale = params.lang ?? i18n.defaultLocale;
  const dictionary = getLocalization(locale).detailsPage;

  try {
    const informationModel = await getInformationModel(params.id);
    const title =
      printLocaleValue(locale, informationModel.title) || dictionary.header.namelessInformationModel;
    const description =
      printLocaleValue(locale, informationModel.description) ?? dictionary.breadcrumbs.informationModels;

    return {
      title: `${title} - ${dictionary.breadcrumbs.informationModels} - data.norge.no`,
      description: description,
      openGraph: {
        title: title,
        description: description,
        type: "website",
        url: `https://data.norge.no/${locale}/information-models/${informationModel.id}/${getSlug(informationModel, locale)}`,
        siteName: "data.norge.no",
        locale: locale,
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
      },
      alternates: {
        canonical: `https://data.norge.no/${locale}/information-models/${informationModel.id}/${getSlug(informationModel, locale)}`,
        languages: {
          nb: `https://data.norge.no/nb/information-models/${informationModel.id}/${getSlug(informationModel, "nb")}`,
          en: `https://data.norge.no/en/information-models/${informationModel.id}/${getSlug(informationModel, "en")}`,
          nn: `https://data.norge.no/nn/information-models/${informationModel.id}/${getSlug(informationModel, "nn")}`,
        },
      },
    };
  } catch (err) {
    console.error(`Failed generate metadata for information model with ID ${params.id}`, JSON.stringify(err));
    notFound();
  }
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {
  const { FDK_BASE_URI, FDK_COMMUNITY_BASE_URI } = process.env;

  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = params.lang ?? i18n.defaultLocale;
  const activeTab = typeof searchParams?.tab === "string" ? searchParams.tab : "overview";

  let informationModel: InformationModel;
  let orgLogo: string | null = null;
  let communityTopics: CommunityTopic[] = [];

  try {
    informationModel = await getInformationModel(params.id);
  } catch (err) {
    console.error(`Failed to get information model with ID ${params.id}`, JSON.stringify(err));
    notFound();
  }

  const canonicalSlug = getSlug(informationModel, locale);
  if (params.slug !== canonicalSlug) {
    const queryString = buildQueryString(searchParams);
    const path = `/${locale}/information-models/${params.id}/${canonicalSlug}`;
    redirect(queryString ? `${path}?${queryString}` : path);
  }

  [orgLogo, communityTopics] = await Promise.all([
    getOrgLogo(informationModel.publisher?.id).catch(() => null),
    getAllCommunityTopics(informationModel.id).catch((): CommunityTopic[] => []),
  ]);

  return (
    <InformationModelDetailsPage
      baseUri={FDK_BASE_URI as string}
      resource={informationModel}
      orgLogo={orgLogo}
      communityTopics={communityTopics}
      communityBaseUri={FDK_COMMUNITY_BASE_URI as string}
      locale={locale}
      dictionaries={{
        detailsPage: getLocalization(locale).detailsPage,
      }}
      defaultActiveTab={activeTab}
    />
  );
};

export default DetailsPageWrapper;
