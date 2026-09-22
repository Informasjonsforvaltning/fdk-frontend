"use client";

import { useState } from "react";
import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { type InformationModel } from "@fellesdatakatalog/types";
import { printLocaleValue } from "@fdk-frontend/utils";
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

type InformationModelDetailsTabProps = {
  resource: InformationModel;
  locale: LocaleCodes;
  dictionary: Localization;
  baseUri: string;
};

export default function InformationModelDetailsTab({
  resource,
  locale,
  dictionary,
  baseUri,
}: InformationModelDetailsTabProps) {
  const [showEmptyRows, setShowEmptyRows] = useState(true);

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
          {!resource.identifier && !showEmptyRows ? null : (
            <>
              <dt>{dictionary.details.general.identifier}:</dt>
              <dd>{resource.identifier || <PlaceholderText>{dictionary.details.noData}</PlaceholderText>}</dd>
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
