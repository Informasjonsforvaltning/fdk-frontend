"use client";

import React, { useState } from "react";
import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { type InformationModel, type SearchObject } from "@fellesdatakatalog/types";
import { getSlug, printLocaleValue } from "@fdk-frontend/utils";
import {
  PlaceholderText,
  PlaceholderBox,
  ExternalLink,
  Dlist,
  Hstack,
  InputWithCopyButton,
  InternalLink,
} from "@fdk-frontend/ui";
import { Heading, Link, Button, Paragraph } from "@digdir/designsystemet-react";
import { HelpText } from "@fellesdatakatalog/ui";
import { EyeIcon, EyeSlashIcon } from "@navikt/aksel-icons";
import styles from "./information-model.module.scss";
import { getInformationModelRelations } from "./information-model-relations";

type InformationModelDetailsTabProps = {
  resource: InformationModel;
  containedConcepts?: SearchObject[];
  relatedInformationModels?: SearchObject[];
  locale: LocaleCodes;
  dictionary: Localization;
  baseUri: string;
};

export default function InformationModelDetailsTab({
  resource,
  containedConcepts,
  relatedInformationModels,
  locale,
  dictionary,
  baseUri,
}: InformationModelDetailsTabProps) {
  const [showEmptyRows, setShowEmptyRows] = useState(true);
  const relations = getInformationModelRelations(resource);

  return (
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

      {!resource.containsSubjects?.length && !showEmptyRows ? null : (
        <section>
          <Heading
            level={2}
            data-size="xs"
          >
            {dictionary.details.subjects.title}
          </Heading>
          {containedConcepts && containedConcepts.length > 0 ? (
            <Dlist>
              {containedConcepts.map((concept) => (
                <React.Fragment key={concept.uri}>
                  <dt>
                    <Link href={`/concepts/${concept.id}`}>
                      {printLocaleValue(locale, concept.title) || concept.uri}
                    </Link>
                  </dt>
                  <dd>{printLocaleValue(locale, concept.description)}</dd>
                </React.Fragment>
              ))}
            </Dlist>
          ) : (
            <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
          )}
        </section>
      )}

      {!relations.length && !showEmptyRows ? null : (
        <section>
          <Heading
            level={2}
            data-size="xs"
          >
            {dictionary.details.references.title}
          </Heading>
          {relations.length > 0 ? (
            <Dlist>
              {relations.map((relation) => {
                const relatedModel = relatedInformationModels?.find(
                  (model) => model.uri === relation.source,
                );
                return (
                  <React.Fragment key={`${relation.type}-${relation.source}`}>
                    <dt>
                      {dictionary.details.references.relationLabels[relation.type] ||
                        dictionary.details.references.relationLabels.unknown}
                      :
                    </dt>
                    <dd>
                      {relatedModel?.id ? (
                        <InternalLink
                          href={`/${locale}/information-models/${relatedModel.id}/${getSlug(relatedModel, locale)}`}
                          entity={relatedModel}
                          profile="data.norge"
                          baseUri={baseUri}
                          locale={locale}
                        >
                          {printLocaleValue(locale, relatedModel.title) || relatedModel.uri}
                        </InternalLink>
                      ) : (
                        <ExternalLink
                          href={relation.source}
                          locale={locale}
                          gateway
                        >
                          {relation.source}
                        </ExternalLink>
                      )}
                    </dd>
                  </React.Fragment>
                );
              })}
            </Dlist>
          ) : (
            <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
          )}
        </section>
      )}

      {!resource.hasFormat?.length && !showEmptyRows ? null : (
        <section>
          <Heading
            level={2}
            data-size="xs"
          >
            {dictionary.details.hasFormat.title}
          </Heading>
          {resource.hasFormat && resource.hasFormat.length > 0 ? (
            resource.hasFormat.map((document, index) => {
              const title = printLocaleValue(locale, document.title);
              const language =
                printLocaleValue(locale, document.language?.prefLabel) || document.language?.code;
              const format = document.format?.split("/").pop() || document.format;
              const seeAlso = document.seeAlso;

              if (!showEmptyRows && !title && !language && !format && !seeAlso) {
                return null;
              }

              return (
                <Dlist key={document.uri || index}>
                  {!title && !showEmptyRows ? null : (
                    <>
                      <dt>{dictionary.details.hasFormat.documentTitle}:</dt>
                      <dd>{title || <PlaceholderText>{dictionary.details.noData}</PlaceholderText>}</dd>
                    </>
                  )}
                  {!language && !showEmptyRows ? null : (
                    <>
                      <dt>{dictionary.details.hasFormat.language}:</dt>
                      <dd>{language || <PlaceholderText>{dictionary.details.noData}</PlaceholderText>}</dd>
                    </>
                  )}
                  {!format && !showEmptyRows ? null : (
                    <>
                      <dt>{dictionary.details.hasFormat.format}:</dt>
                      <dd>{format || <PlaceholderText>{dictionary.details.noData}</PlaceholderText>}</dd>
                    </>
                  )}
                  {!seeAlso && !showEmptyRows ? null : (
                    <>
                      <dt>{dictionary.details.hasFormat.url}:</dt>
                      <dd>
                        {seeAlso ? (
                          <ExternalLink
                            href={seeAlso}
                            locale={locale}
                            gateway
                          >
                            {seeAlso}
                          </ExternalLink>
                        ) : (
                          <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                        )}
                      </dd>
                    </>
                  )}
                </Dlist>
              );
            })
          ) : (
            <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
          )}
        </section>
      )}

      {!resource.contactPoint?.length && !showEmptyRows ? null : (
        <section>
          <Heading
            level={2}
            data-size="xs"
          >
            {dictionary.details.contactPoint.title}
          </Heading>
          {resource.contactPoint && resource.contactPoint.length > 0 ? (
            resource.contactPoint.map((contactPoint, index) => (
              <Dlist key={index}>
                {!contactPoint.formattedName && !contactPoint.fullname && !showEmptyRows ? null : (
                  <>
                    <dt>{dictionary.details.contactPoint.formattedName}:</dt>
                    <dd>
                      {printLocaleValue(locale, contactPoint.formattedName) ||
                        contactPoint.fullname || <PlaceholderText>{dictionary.details.noData}</PlaceholderText>}
                    </dd>
                  </>
                )}
                {!contactPoint.hasURL && !showEmptyRows ? null : (
                  <>
                    <dt>{dictionary.details.contactPoint.uri}:</dt>
                    <dd>
                      {contactPoint.hasURL ? (
                        <ExternalLink
                          href={contactPoint.hasURL}
                          locale={locale}
                          gateway
                        >
                          {contactPoint.hasURL}
                        </ExternalLink>
                      ) : (
                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                      )}
                    </dd>
                  </>
                )}
                {!contactPoint.email && !showEmptyRows ? null : (
                  <>
                    <dt>{dictionary.details.contactPoint.email}:</dt>
                    <dd>
                      {contactPoint.email ? (
                        <Link href={`mailto:${contactPoint.email}`}>{contactPoint.email}</Link>
                      ) : (
                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                      )}
                    </dd>
                  </>
                )}
                {!contactPoint.hasTelephone && !showEmptyRows ? null : (
                  <>
                    <dt>{dictionary.details.contactPoint.telephone}:</dt>
                    <dd>
                      {contactPoint.hasTelephone || <PlaceholderText>{dictionary.details.noData}</PlaceholderText>}
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

      <section>
        <Heading
          level={2}
          data-size="xs"
        >
          {dictionary.details.general.informationModelTitle}
        </Heading>
        <Dlist>
          <dt>{dictionary.details.general.publisher}:</dt>
          <dd>
            {resource.publisher?.id ? (
              <Link href={`/organizations/${resource.publisher.id}`}>
                {printLocaleValue(locale, resource.publisher?.prefLabel) || dictionary.header.namelessOrganization}
              </Link>
            ) : (
              printLocaleValue(locale, resource.publisher?.prefLabel) || (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )
            )}
          </dd>
          <dt>{dictionary.details.general.creator}:</dt>
          <dd>
            {resource.creator?.id ? (
              <Link href={`/organizations/${resource.creator.id}`}>
                {printLocaleValue(locale, resource.creator?.prefLabel) || dictionary.header.namelessOrganization}
              </Link>
            ) : (
              printLocaleValue(locale, resource.creator?.prefLabel) || (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )
            )}
          </dd>
          {!resource.identifier && !showEmptyRows ? null : (
            <>
              <dt>{dictionary.details.general.identifier}:</dt>
              <dd>{resource.identifier || <PlaceholderText>{dictionary.details.noData}</PlaceholderText>}</dd>
            </>
          )}
          {!resource.versionInfo && !showEmptyRows ? null : (
            <>
              <dt>{dictionary.details.general.version}:</dt>
              <dd>{resource.versionInfo || <PlaceholderText>{dictionary.details.noData}</PlaceholderText>}</dd>
            </>
          )}
          {!resource.homepage && !showEmptyRows ? null : (
            <>
              <dt>{dictionary.details.general.homepage}:</dt>
              <dd>
                {resource.homepage ? (
                  <ExternalLink
                    href={resource.homepage}
                    locale={locale}
                    gateway
                  >
                    {resource.homepage}
                  </ExternalLink>
                ) : (
                  <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                )}
              </dd>
            </>
          )}
          {!resource.modified && !showEmptyRows ? null : (
            <>
              <dt>{dictionary.details.general.changeDate}:</dt>
              <dd>
                {resource.modified ? (
                  new Date(resource.modified).toLocaleString(locale, { dateStyle: "long" })
                ) : (
                  <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                )}
              </dd>
            </>
          )}
          <dt>
            <Hstack>
              <span>{dictionary.details.general.firstHarvested}:</span>
              <HelpText aria-label={dictionary.details.general.firstHarvestedHelpTextTitle}>
                <div style={{ whiteSpace: "normal" }}>
                  <Paragraph data-size="sm">
                    {dictionary.details.general.firstHarvestedInformationModelHelpText}
                  </Paragraph>
                  <Paragraph data-size="sm">
                    <InternalLink
                      href={`/${locale}/docs/sharing-data/publishing-data-descriptions/4-triggering-harvest`}
                      profile="data.norge"
                      baseUri={baseUri}
                      locale={locale}
                    >
                      {dictionary.details.general.firstHarvestedHelpTextLink}
                    </InternalLink>
                  </Paragraph>
                </div>
              </HelpText>
            </Hstack>
          </dt>
          <dd>
            {resource.harvest?.firstHarvested ? (
              new Date(resource.harvest.firstHarvested).toLocaleString(locale, {
                dateStyle: "long",
              })
            ) : (
              <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
            )}
          </dd>
          <dt>{dictionary.details.general.modified}:</dt>
          <dd>
            {resource.harvest?.modified ? (
              new Date(resource.harvest.modified).toLocaleString(locale, {
                dateStyle: "long",
              })
            ) : (
              <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
            )}
          </dd>
          <dt>{dictionary.details.general.uri}:</dt>
          <dd>
            <Hstack>
              <InputWithCopyButton
                value={resource.uri}
                inputLabel="uri"
                copyLabel={dictionary.details.general.copyButton[0]}
                copiedLabel={dictionary.details.general.copyButton[1]}
              />
            </Hstack>
          </dd>
        </Dlist>
      </section>
    </div>
  );
}
