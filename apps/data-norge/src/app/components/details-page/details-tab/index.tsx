import React, { useState, createContext } from "react";
import { Heading, Tag, Button } from "@digdir/designsystemet-react";
import { EyeSlashIcon, EyeIcon } from "@navikt/aksel-icons";
import {
  type DatasetWithIdentifier,
  type DatasetScore,
  type SearchObject,
  type ReferenceDataCode,
} from "@fellesdatakatalog/types";
import { type PopulatedDatasetReference, type Profile } from "@fdk-frontend/types";
import { type LocaleCodes, type Localization } from "@fdk-frontend/localization";
import { PlaceholderBox, PlaceholderText, TagList, Dlist, ExternalLink, SmartList, TagLink } from "@fdk-frontend/ui";
import GeneralDetails from "./components/general-details";
import ContactDetails from "./components/contact-details";
import ContentDetails from "./components/content-details";
import LegalDetails, { hasLegalBasis } from "./components/legal-details";
import ConceptDetails from "./components/concept-details";
import ReferencesDetails from "./components/references-details";
import DatasetTags from "../dataset-tags";
import styles from "./details-tab.module.scss";
import { printLocaleValue } from "@fdk-frontend/utils";

const DatasetDetailsTabContext = createContext<{ showEmptyRows: boolean }>({ showEmptyRows: true });

export type DatasetDetailsProps = {
  dataset: DatasetWithIdentifier;
  locale: LocaleCodes;
  dictionary: Localization;
  metadataScore?: DatasetScore;
  related?: DatasetWithIdentifier[];
  concepts?: SearchObject[];
  populatedReferences?: PopulatedDatasetReference[];
  internalRelatedDatasets?: DatasetWithIdentifier[];
  profile: Profile;
  baseUri: string;
};

const DatasetDetailsTab = ({
  dataset,
  related,
  locale,
  dictionary,
  metadataScore,
  concepts,
  populatedReferences,
  internalRelatedDatasets,
  profile,
  baseUri,
}: DatasetDetailsProps) => {
  const [showEmptyRows, setShowEmptyRows] = useState<boolean>(true);

  return (
    <DatasetDetailsTabContext.Provider value={{ showEmptyRows }}>
      <div className={styles.details}>
        <Button
          className={styles.toggleButton}
          variant="tertiary"
          data-size="sm"
          onClick={() => setShowEmptyRows(!showEmptyRows)}
        >
          {showEmptyRows ? (
            <>
              <EyeSlashIcon aria-hidden />
              {dictionary.details.hideEmptyRows}
            </>
          ) : (
            <>
              <EyeIcon aria-hidden />
              {dictionary.details.showEmptyRows}
            </>
          )}
        </Button>
        {!dataset.contactPoint && !showEmptyRows ? null : (
          <ContactDetails
            dataset={dataset}
            locale={locale}
            dictionary={dictionary}
          />
        )}
        <ContentDetails
          dataset={dataset}
          locale={locale}
          dictionary={dictionary}
        />
        {!hasLegalBasis(dataset) && !showEmptyRows ? null : (
          <LegalDetails
            dataset={dataset}
            locale={locale}
            dictionary={dictionary}
          />
        )}
        {!dataset.subject && !showEmptyRows ? null : (
          <ConceptDetails
            dataset={dataset}
            concepts={concepts}
            locale={locale}
            dictionary={dictionary}
            profile={profile}
            baseUri={baseUri}
          />
        )}
        {!populatedReferences?.length && !showEmptyRows ? null : (
          <ReferencesDetails
            populatedReferences={populatedReferences}
            locale={locale}
            dictionary={dictionary}
            profile={profile}
            baseUri={baseUri}
          />
        )}
        {!dataset.costs?.length && !showEmptyRows ? null : (
          <section>
            <Heading
              level={2}
              data-size="xs"
            >
              {dictionary.details.costs.title}
            </Heading>
            {dataset.costs && dataset.costs.length > 0 ? (
              dataset.costs.map((cost, index) => (
                <Dlist key={index}>
                  {!cost.hasValue && !showEmptyRows ? null : (
                    <>
                      <dt>{dictionary.details.costs.value}:</dt>
                      <dd>
                        {cost.hasValue ? (
                          `${cost.hasValue} ${cost.currency?.code || cost.currency?.uri?.split("/").pop() || ""}`
                        ) : (
                          <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                        )}
                      </dd>
                    </>
                  )}
                  {!printLocaleValue(locale, cost.description) && !showEmptyRows ? null : (
                    <>
                      <dt>{dictionary.details.costs.description}:</dt>
                      <dd>
                        {printLocaleValue(locale, cost.description) || (
                          <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                        )}
                      </dd>
                    </>
                  )}
                  {!cost.documentation?.length && !showEmptyRows ? null : (
                    <>
                      <dt>{dictionary.details.costs.documentation}:</dt>
                      <dd>
                        {cost.documentation?.length ? (
                          <SmartList
                            items={cost.documentation}
                            renderItem={(url) => (
                              <ExternalLink
                                href={url}
                                locale={locale}
                                gateway
                              >
                                {url}
                              </ExternalLink>
                            )}
                          />
                        ) : (
                          <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                        )}
                      </dd>
                    </>
                  )}
                </Dlist>
              ))
            ) : (
              <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            )}
          </section>
        )}
        <GeneralDetails
          dataset={dataset}
          locale={locale}
          dictionary={dictionary}
          metadataScore={metadataScore}
          profile={profile}
          baseUri={baseUri}
        />
        {!dataset.theme?.length && !showEmptyRows ? null : (
          <section>
            <Heading
              level={2}
              data-size="xs"
            >
              {dictionary.details.themes}
            </Heading>
            {[...(dataset.theme ?? []), ...(dataset.losTheme ?? [])].length ? (
              <DatasetTags
                dataset={dataset}
                locale={locale}
              />
            ) : (
              <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            )}
          </section>
        )}
        {!dataset.isRelatedToTransportportal ? null : (
          <section>
            <Heading
              level={2}
              data-size="xs"
            >
              {dictionary.details.mobilityThemes}
            </Heading>
            <TagList>
              {dataset.mobilityTheme?.map((theme: ReferenceDataCode) => (
                <Tag
                  key={theme.code}
                  data-size="sm"
                >
                  {printLocaleValue(locale, theme.prefLabel) || theme.code}
                </Tag>
              ))}
            </TagList>
          </section>
        )}
        {!dataset.keyword?.length && !showEmptyRows ? null : (
          <section>
            <Heading
              level={2}
              data-size="xs"
            >
              {dictionary.details.keywords}
            </Heading>
            {dataset.keyword && dataset.keyword.filter((keyword: any) => keyword[locale]).length ? (
              <TagList>
                {dataset.keyword
                  .filter((keyword: any) => keyword[locale])
                  .map((keyword: any, i: number) => (
                    <TagLink
                      key={`keyword-${i}`}
                      href={`/datasets?q=${keyword[locale]}`}
                    >
                      {keyword[locale]}
                    </TagLink>
                  ))}
              </TagList>
            ) : (
              <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
            )}
          </section>
        )}
      </div>
    </DatasetDetailsTabContext.Provider>
  );
};

export default DatasetDetailsTab;
export { DatasetDetailsTabContext };
