import { notFound, redirect } from "next/navigation";
import { i18n, type LocaleCodes } from "@fdk-frontend/localization";
import { getSlug } from "@fdk-frontend/utils";
import { getInformationModel } from "@fdk-frontend/data-access/server";
import { buildQueryString } from "../build-query-string";

export type DetailsPageWrapperProps = {
  params: Promise<{
    lang: LocaleCodes;
    id: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = params.lang ?? i18n.defaultLocale;

  let redirectUrl = null;
  try {
    const informationModel = await getInformationModel(params.id);
    const canonicalSlug = getSlug(informationModel, locale);
    const queryString = buildQueryString(searchParams);
    const path = `/${locale}/information-models/${params.id}/${canonicalSlug}`;
    redirectUrl = queryString ? `${path}?${queryString}` : path;
  } catch (err) {
    console.error(`Failed to get information model with ID ${params.id}`, JSON.stringify(err));
    notFound();
  }

  if (redirectUrl) {
    redirect(redirectUrl);
  }
};

export default DetailsPageWrapper;
