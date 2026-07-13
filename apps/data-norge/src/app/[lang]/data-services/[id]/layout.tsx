import SiteLayout from "../../../components/site-layout";
import { PropsWithChildren } from "react";
import { LocaleCodes } from "@fdk-frontend/localization";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const DataServiceLayout = async ({
  children,
  params,
}: PropsWithChildren & {
  params: Promise<{ lang: string; id: string }>;
}) => {
  const typedParams = params as Promise<{ lang: LocaleCodes; id: string }>;
  return <SiteLayout params={typedParams}>{children}</SiteLayout>;
};

export default DataServiceLayout;
