import SiteLayout from "../../components/site-layout";
import { PropsWithChildren } from "react";
import { LocaleCodes } from "@fdk-frontend/localization";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const DataHunterLayout = async ({
  children,
  params,
}: PropsWithChildren & {
  params: Promise<{ lang: string }>;
}) => {
  const typedParams = params as Promise<{ lang: LocaleCodes }>;
  return <SiteLayout params={typedParams}>{children}</SiteLayout>;
};

export default DataHunterLayout;
