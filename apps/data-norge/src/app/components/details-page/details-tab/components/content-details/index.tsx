import React, { useContext } from "react";
import { Heading, Paragraph, Table, Tag } from "@digdir/designsystemet-react";
import { Hstack, PlaceholderText, ExternalLink, SmartList, Dlist, TagList } from "@fdk-frontend/ui";
import { DatasetDetailsProps, DatasetDetailsTabContext } from "../../";
import { formatTemporalDate, printLocaleValue } from "@fdk-frontend/utils";
import { HelpText } from "@fellesdatakatalog/ui";
import { getQualityAnnotations } from "../quality-details";
import styles from '../../details-tab.module.scss';

const ContentDetails = ({ dataset, locale, dictionary }: Omit<DatasetDetailsProps, "baseUri" | "profile">) => {
  const { showEmptyRows } = useContext(DatasetDetailsTabContext);
  const qualityAnnotations = getQualityAnnotations(dataset, locale, dictionary);

  return (
    <section>
      <Heading
        level={2}
        data-size="xs"
      >
        {dictionary.details.content.title}
      </Heading>
      <Dlist>
        {!dataset.language && !showEmptyRows ? null : (
          <>
            <dt>{dictionary.details.content.language}:</dt>
            <dd>
              {dataset.language ? (
                dataset.language.map((language: any) => printLocaleValue(locale, language.prefLabel)).join(", ")
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        {!dataset.qualifiedAttributions && !showEmptyRows ? null : (
          <>
            <dt>{dictionary.details.content.qualifiedAttributions}:</dt>
            <dd>
              {dataset.qualifiedAttributions ? (
                dataset.qualifiedAttributions.map((attribution, index) => (
                  <span key={`attribution-${index}`}>
                    {attribution.agent.uri ? (
                      <ExternalLink
                        href={attribution.agent.uri}
                        locale={locale}
                        gateway
                      >
                        {printLocaleValue(locale, attribution.agent.prefLabel)}
                      </ExternalLink>
                    ) : (
                      printLocaleValue(locale, attribution.agent.prefLabel)
                    )}
                    {index < dataset.qualifiedAttributions.length - 1 && ", "}
                  </span>
                ))
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        {!dataset.provenance && !showEmptyRows ? null : (
          <>
            <dt>{dictionary.details.content.provenance}:</dt>
            <dd>
              {dataset.provenance ? (
                printLocaleValue(locale, dataset.provenance.prefLabel)
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        {!dataset?.accrualPeriodicity && !showEmptyRows ? null : (
          <>
            <dt>{dictionary.details.content.accrualPeriodicity}:</dt>
            <dd>
              {dataset.accrualPeriodicity ? (
                <span style={{ textTransform: "capitalize" }}>
                  {printLocaleValue(locale, dataset.accrualPeriodicity.prefLabel)}
                </span>
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        {!dataset?.issued && !showEmptyRows ? null : (
          <>
            <dt>
              <Hstack>
                <span>{dictionary.details.content.issued}:</span>
                <HelpText aria-label={dictionary.details.general.firstHarvestedHelpTextTitle}>
                  <Paragraph>{dictionary.details.content.issuedHelpText}</Paragraph>
                </HelpText>
              </Hstack>
            </dt>
            <dd>
              {dataset.issued ? (
                new Date(dataset.issued).toLocaleString(locale, { dateStyle: "long" })
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        {!dataset?.modified && !showEmptyRows ? null : (
          <>
            <dt>{dictionary.details.content.modified}:</dt>
            <dd>
              {dataset?.modified ? (
                new Date(dataset.modified).toLocaleString(locale, { dateStyle: "long" })
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        {!dataset?.spatial && !showEmptyRows ? null : (
          <>
            <dt>{dictionary.details.content.spatial}:</dt>
            <dd className="article">
              {dataset?.spatial ? (
                <SmartList
                  listType="ol"
                  items={dataset.spatial}
                  renderItem={(spatial) =>
                    spatial.uri ? (
                      <ExternalLink
                        href={spatial.uri}
                        locale={locale}
                        gateway
                      >
                        {spatial.prefLabel ? printLocaleValue(locale, spatial.prefLabel) : spatial.uri}
                      </ExternalLink>
                    ) : (
                      printLocaleValue(locale, spatial?.prefLabel)
                    )
                  }
                />
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        {!dataset?.temporal && !showEmptyRows ? null : (
          <>
            <dt>{dictionary.details.content.temporal}:</dt>
            <dd>
              {dataset?.temporal ? (
                <SmartList
                  items={dataset.temporal}
                  className={styles.spacialList}
                  renderItem={(temporal) => (
                    <Dlist>
                      {temporal.startDate && (
                        <>
                          <dt>{dictionary.details.content.temporalFrom}:</dt>
                          <dd>{formatTemporalDate(temporal.startDate, locale)}</dd>
                        </>
                      )}
                      {temporal.endDate && (
                        <>
                          <dt>{dictionary.details.content.temporalTo}:</dt>
                          <dd>{formatTemporalDate(temporal.endDate, locale)}</dd>
                        </>
                      )}
                    </Dlist>
                  )}
                />
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        {!dataset?.conformsTo && !showEmptyRows ? null : (
          <>
            <dt>
              <Hstack>
                {dictionary.details.content.conformsTo}:
                <HelpText aria-label={dictionary.details.content.conformsToHelpText}>
                  <Paragraph>{dictionary.details.content.conformsToHelpText}</Paragraph>
                </HelpText>
              </Hstack>
            </dt>
            <dd className="article">
              {dataset?.conformsTo ? (
                <SmartList
                  listType="ol"
                  items={dataset.conformsTo}
                  renderItem={(item) => (
                    <ExternalLink
                      href={item.uri}
                      locale={locale}
                      gateway
                    >
                      {printLocaleValue(locale, item?.prefLabel) || item.uri}
                    </ExternalLink>
                  )}
                />
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        {!qualityAnnotations.length && !showEmptyRows ? null : (
          <>
            <dt>{dictionary.details.quality.title}:</dt>
            <dd className="article">
              {qualityAnnotations.length > 0 ? (
                <Table border>
                  <Table.Body>
                    {qualityAnnotations.map((annotation, index) => (
                      <Table.Row key={`quality-annotation-${index}`}>
                        <Table.Cell>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <Paragraph>{printLocaleValue(locale, annotation.body)}</Paragraph>
                            {annotation.dimensions.length > 0 && (
                              <TagList>
                                {annotation.dimensions.map((dimension) => (
                                  <Tag
                                    key={dimension}
                                    data-size="sm"
                                  >
                                    {dimension}
                                  </Tag>
                                ))}
                              </TagList>
                            )}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
      </Dlist>
    </section>
  );
};

export default ContentDetails;
