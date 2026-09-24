"use client";

import { useState } from "react";
import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { type InformationModel, type CommunityTopic } from "@fellesdatakatalog/types";
import { printLocaleValue } from "@fdk-frontend/utils";
import { Badge, Breadcrumbs, ScrollShadows, OrgButton, TagList, TagLink } from "@fdk-frontend/ui";
import { Heading, Tabs, TabsList, TabsTab, TabsPanel, Tag } from "@digdir/designsystemet-react";
import MetadataTab from "../metadata-tab";
import CommunityTab from "../community-tab";
import InformationModelDetailsTab from "./information-model-details-tab";
import InformationModelOverviewTab from "./information-model-overview-tab";
import styles from "../details-page.module.scss";
import headerStyles from "../dataset-header/dataset-header.module.scss";

export type InformationModelDetailsPageType = {
  baseUri: string;
  resource: InformationModel;
  communityTopics?: CommunityTopic[];
  communityBaseUri: string;
  defaultActiveTab?: string;
  orgLogo?: string | null;
  locale: LocaleCodes;
  dictionaries: {
    detailsPage: Localization;
  };
};

export default function InformationModelDetailsPage({
  baseUri,
  resource,
  communityTopics,
  communityBaseUri,
  orgLogo,
  defaultActiveTab = "overview",
  locale,
  dictionaries,
}: InformationModelDetailsPageType) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const publisherId = resource.publisher?.id;

  const breadcrumbList = [
    {
      href: `/information-models`,
      text: dictionaries.detailsPage.breadcrumbs.informationModels,
    },
    {
      text: printLocaleValue(locale, resource.title),
    },
  ];

  const updateUri = (tab: string) => {
    window.history.pushState(null, "", `?tab=${tab}`);
  };

  const statusLabel =
    (resource.statusCode?.code ? dictionaries.detailsPage.statusCodes[resource.statusCode.code] : undefined) ??
    printLocaleValue(locale, resource.statusCode?.prefLabel) ??
    dictionaries.detailsPage.unknownStatusLabel;

  return (
    <div className={styles.detailsPage}>
      <Breadcrumbs
        locale={locale}
        breadcrumbList={breadcrumbList}
      />
      <div className={styles.mainContent}>
        <div className={headerStyles.header}>
          {publisherId && (
            <OrgButton
              href={`/organizations/${publisherId}`}
              orgLogoSrc={orgLogo}
              className={headerStyles.orgBtn}
            >
              {printLocaleValue(locale, resource.publisher?.prefLabel) ??
                dictionaries.detailsPage.header.namelessOrganization}
            </OrgButton>
          )}
          <Heading
            level={1}
            data-size="lg"
            className={headerStyles.title}
          >
            {printLocaleValue(locale, resource.title) || dictionaries.detailsPage.header.namelessInformationModel}
          </Heading>
          <TagList className={headerStyles.headerTags}>
            <TagLink
              data-color="info"
              data-size="md"
              href="/information-models"
            >
              {dictionaries.detailsPage.header.informationModelsTagLink}
            </TagLink>
            <Tag style={{ textTransform: "capitalize" }}>{statusLabel}</Tag>
          </TagList>
        </div>
        <Tabs
          className={styles.tabs}
          defaultValue="overview"
          data-size="sm"
          value={activeTab}
          onChange={(value) => {
            setActiveTab(value);
          }}
        >
          <ScrollShadows className={styles.tabsScrollShadows}>
            <TabsList>
              <TabsTab
                value="overview"
                onClick={() => updateUri("overview")}
              >
                {dictionaries.detailsPage.tabs.overview}
              </TabsTab>
              <TabsTab
                value="details"
                onClick={() => updateUri("details")}
              >
                {dictionaries.detailsPage.tabs.details}
              </TabsTab>
              <TabsTab
                value="community"
                onClick={() => updateUri("community")}
              >
                {dictionaries.detailsPage.tabs.community}
                &nbsp;<Badge>{communityTopics?.length || 0}</Badge>
              </TabsTab>
              <TabsTab
                value="rdf"
                onClick={() => updateUri("rdf")}
              >
                {dictionaries.detailsPage.tabs.rdf}
              </TabsTab>
            </TabsList>
          </ScrollShadows>
          <TabsPanel
            className={styles.tabPanel}
            value="overview"
          >
            <InformationModelOverviewTab
              resource={resource}
              locale={locale}
              dictionary={dictionaries.detailsPage}
            />
          </TabsPanel>
          <TabsPanel
            className={styles.tabPanel}
            value="details"
          >
            <InformationModelDetailsTab
              resource={resource}
              locale={locale}
              dictionary={dictionaries.detailsPage}
              baseUri={baseUri}
            />
          </TabsPanel>
          <TabsPanel
            className={styles.tabPanel}
            value="community"
          >
            <CommunityTab
              topics={communityTopics}
              communityBaseUri={communityBaseUri}
              dictionary={dictionaries.detailsPage}
              locale={locale}
              baseUri={baseUri}
            />
          </TabsPanel>
          <TabsPanel
            className={styles.tabPanel}
            value="rdf"
          >
            <MetadataTab
              uri={`${baseUri}/information-models/${resource.id}`}
              dictionary={dictionaries.detailsPage}
              locale={locale}
              baseUri={baseUri}
            />
          </TabsPanel>
        </Tabs>
      </div>
    </div>
  );
}
