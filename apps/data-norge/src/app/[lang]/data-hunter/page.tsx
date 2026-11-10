import "server-only";
import React from "react";
import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { Heading, Paragraph } from "@digdir/designsystemet-react";
import { getLocalization, type Locale } from "@fdk-frontend/localization";
import { absoluteUrl, getSite } from "../../../utils/site";
import { Breadcrumbs } from "@fdk-frontend/ui";
import DataHunterForm from "./components/data-hunter-form";
import styles from "./page.module.css";

type DataHunterPageProps = {
  params: Promise<{
    lang: Locale["code"];
  }>;
};

const DataHunterPage = async (props: DataHunterPageProps) => {
  const params = await props.params;
  const { lang } = params;
  // Opt-in dynamic rendering
  await noStore();

  const loc = getLocalization(lang);
  const dictionary = loc.dataHunterPage;

  const breadcrumbList = [
    {
      href: `/${lang}/data-hunter`,
      text: dictionary.dataHunter,
    },
  ];

  return (
    <>
      <div style={{ margin: "0 2rem" }}>
        <Breadcrumbs
          breadcrumbList={breadcrumbList}
          locale={lang}
        />
      </div>
      <div className={styles.contentContainer}>
        <Heading data-size="xl">{dictionary.dataHunterForm.title}</Heading>
        <Paragraph data-size="lg">{dictionary.dataHunterForm.description}</Paragraph>
        <DataHunterForm
          dictionary={dictionary}
          locale={lang}
        />
      </div>
    </>
  );
};

export const generateMetadata = async (props: DataHunterPageProps): Promise<Metadata> => {
  const params = await props.params;
  const dictionary = getLocalization(params.lang).dataHunterPage;
  const site = await getSite();

  return {
    title: dictionary.metadata.title.replace("data.norge.no", site.name),
    description: dictionary.metadata.description,
    alternates: {
      canonical: absoluteUrl(site.origin, `/${params.lang}/data-hunter`),
    },
  };
};

export default DataHunterPage;
