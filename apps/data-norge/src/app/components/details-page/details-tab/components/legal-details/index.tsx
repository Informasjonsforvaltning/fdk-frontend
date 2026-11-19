import React, { useContext } from "react";
import { Heading } from "@digdir/designsystemet-react";
import { PlaceholderText, PlaceholderBox, ExternalLink, SmartList, Dlist, Article } from "@fdk-frontend/ui";
import { DatasetDetailsProps } from "../../";
import { HVD_REGULATION_TITLE, HVD_REGULATION_URI, printLocaleValue } from "@fdk-frontend/utils";
import { Dataset, LegalResource } from "@fellesdatakatalog/types";
import { type LocaleCodes, type Localization } from "@fdk-frontend/localization";

const getLegislationTitle = (
  locale: LocaleCodes,
  dictionary: Localization,
  legislation: LegalResource,
): string | undefined =>
  printLocaleValue(locale, legislation.title) ||
  (legislation.uri === HVD_REGULATION_URI
    ? `${HVD_REGULATION_TITLE} ${dictionary.details.legal.hvdRegulationSubtitle}`
    : undefined);

const getLegislationLinks = (legislation: LegalResource): string[] => {
  if (legislation.references?.length) return legislation.references;
  return legislation.uri ? [legislation.uri] : [];
};

export const hasLegalBasis = (dataset: Dataset) =>
  (dataset.applicableLegislation && dataset?.applicableLegislation.length) ||
  (dataset.legalBasisForAccess && dataset?.legalBasisForAccess.length) ||
  (dataset.legalBasisForProcessing && dataset?.legalBasisForProcessing.length) ||
  (dataset.legalBasisForRestriction && dataset?.legalBasisForRestriction.length);

const LegalDetails = ({ dataset, locale, dictionary }: Omit<DatasetDetailsProps, "baseUri" | "profile">) => {
  const printLegalBasis = (legalBasis?: any[], description?: string) => {
    if (!legalBasis) return <PlaceholderText>{dictionary.details.noData}</PlaceholderText>;
    return legalBasis.map((legal, i) => {
      const externalLink = legal.uri as string;
      return (
        <React.Fragment key={`legal-basis-${i}`}>
          <dt>{printLocaleValue(locale, legal.prefLabel)}</dt>
          <dd className="article">
            <Article>{description}</Article>
            {externalLink && (
              <ExternalLink
                href={externalLink}
                locale={locale}
                gateway
              >
                {printLocaleValue(locale, legal.prefLabel)}
              </ExternalLink>
            )}
          </dd>
        </React.Fragment>
      );
    });
  };

  return (
    <section>
      <Heading
        level={2}
        data-size="xs"
      >
        {dictionary.details.legal.title}
      </Heading>
      {hasLegalBasis(dataset) ? (
        <Dlist>
          {dataset.applicableLegislation && dataset.applicableLegislation.length > 0 && (
            <>
              {dataset.applicableLegislation.map((legislation, i) => {
                if (!legislation)
                  return <PlaceholderText key={`legislation-${i}`}>{dictionary.details.noData}</PlaceholderText>;
                const title = getLegislationTitle(locale, dictionary, legislation);
                const links = getLegislationLinks(legislation);
                return (
                  <React.Fragment key={`legislation-${i}`}>
                    <dt>{title ? title : <PlaceholderText>{dictionary.details.legal.noTitle}</PlaceholderText>}</dt>
                    <dd className="article">
                      <div>
                        {legislation.type && (
                          <div>
                            {dictionary.details.legal.type}:{" "}
                            {printLocaleValue(locale, legislation.type.prefLabel) || legislation.type.code}
                          </div>
                        )}
                        <Article>{printLocaleValue(locale, legislation.description)}</Article>
                      </div>
                      {links.length > 0 && (
                        <SmartList
                          items={links}
                          renderItem={(reference, j) => (
                            <ExternalLink
                              href={reference}
                              key={`legislation-${i}-ref-${j}`}
                            >
                              {reference}
                            </ExternalLink>
                          )}
                        />
                      )}
                    </dd>
                  </React.Fragment>
                );
              })}
            </>
          )}
          {dataset.legalBasisForAccess &&
            printLegalBasis(dataset.legalBasisForAccess, dictionary.details.legal.legalBasisForAccess)}
          {dataset.legalBasisForProcessing &&
            printLegalBasis(dataset.legalBasisForProcessing, dictionary.details.legal.legalBasisForProcessing)}
          {dataset.legalBasisForRestriction &&
            printLegalBasis(dataset.legalBasisForRestriction, dictionary.details.legal.legalBasisForRestriction)}
        </Dlist>
      ) : (
        <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
      )}
    </section>
  );
};

export default LegalDetails;
