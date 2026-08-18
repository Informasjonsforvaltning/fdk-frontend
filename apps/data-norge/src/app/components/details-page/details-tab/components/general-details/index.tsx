import { useContext } from "react";
import { Heading, Link, type TagProps, Paragraph } from "@digdir/designsystemet-react";
import {
  Hstack,
  PlaceholderText,
  ExternalLink,
  SmartList,
  Dlist,
  InputWithCopyButton,
  TagLink,
} from "@fdk-frontend/ui";
import { calculateMetadataScore, printLocaleValue } from "@fdk-frontend/utils";
import { HelpText } from "@fellesdatakatalog/ui";
import { DatasetDetailsProps, DatasetDetailsTabContext } from "../../";
import { i18n } from "@fdk-frontend/localization";
import InternalLink from "@fdk-frontend/libs/ui/src/lib/internal-link";

const GeneralDetails = ({ dataset, locale, dictionary, metadataScore, profile, baseUri }: DatasetDetailsProps) => {
  const { showEmptyRows } = useContext(DatasetDetailsTabContext);

  // dctType may be a single object (not-yet-reparsed datasets) or a list — normalize to a list.
  const dctTypes = [dataset.dctType ?? []].flat();

  const getMetadataQuality = (value: number) => {
    if (value < 25)
      return { color: "danger", label: `${dictionary.details.general.metadataQuality.labels.poor} (${value}%)` };
    if (value < 50)
      return {
        color: "warning",
        label: `${dictionary.details.general.metadataQuality.labels.sufficient} (${value}%)`,
      };
    if (value < 75)
      return { color: "success", label: `${dictionary.details.general.metadataQuality.labels.good} (${value}%)` };
    return {
      color: "success",
      label: `${dictionary.details.general.metadataQuality.labels.excellent} (${value}%)`,
    };
  };

  const metadataQualityScore = calculateMetadataScore(metadataScore?.dataset);
  const metadataQuality = getMetadataQuality(metadataQualityScore);

  return (
    <section>
      <Heading
        level={2}
        data-size="xs"
      >
        {dictionary.details.general.title}
      </Heading>
      <Dlist>
        <dt>{dictionary.details.general.publisher}:</dt>
        <dd>
          {dataset.publisher ? (
            <Link href={`/organizations/${dataset.publisher?.id}`}>
              {dataset.publisher?.prefLabel?.[locale] || dataset.publisher?.prefLabel?.[i18n.defaultLocale]}
            </Link>
          ) : (
            <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
          )}
        </dd>
        <dt>
          <Hstack>
            <span>{dictionary.details.general.firstHarvested}:</span>
            <HelpText aria-label={dictionary.details.general.firstHarvestedHelpTextTitle}>
              <div style={{ whiteSpace: "normal" }}>
                <Paragraph data-size="sm">{dictionary.details.general.firstHarvestedHelpText}</Paragraph>
                <Paragraph data-size="sm">
                  <InternalLink
                    href="/docs/sharing-data/publishing-data-descriptions/4-triggering-harvest"
                    profile={profile}
                    baseUri={baseUri}
                  >
                    {dictionary.details.general.firstHarvestedHelpTextLink}
                  </InternalLink>
                </Paragraph>
              </div>
            </HelpText>
          </Hstack>
        </dt>
        <dd>
          {dataset.harvest?.firstHarvested ? (
            new Date(dataset.harvest.firstHarvested).toLocaleString(locale, { dateStyle: "long" })
          ) : (
            <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
          )}
        </dd>
        <dt>
          <span>{dictionary.details.general.modified}:</span>
        </dt>
        <dd>
          {dataset.harvest?.modified ? (
            new Date(dataset.harvest.modified).toLocaleString(locale, { dateStyle: "long" })
          ) : (
            <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
          )}
        </dd>
        {!dataset.landingPage && !showEmptyRows ? null : (
          <>
            <dt>{dictionary.details.general.landingPage}:</dt>
            <dd className="article">
              {dataset.landingPage?.length ? (
                <SmartList
                  items={dataset.landingPage}
                  renderItem={(page) => (
                    <ExternalLink
                      href={page}
                      locale={locale}
                      gateway
                    >
                      {page}
                    </ExternalLink>
                  )}
                />
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        {!dataset.page && !showEmptyRows ? null : (
          <>
            <dt>{dictionary.details.general.page}:</dt>
            <dd>
              {dataset.page?.length ? (
                <SmartList
                  items={dataset.page}
                  renderItem={(page) => (
                    <ExternalLink
                      href={page}
                      locale={locale}
                      gateway
                    >
                      {page}
                    </ExternalLink>
                  )}
                />
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        {!dctTypes.length && !showEmptyRows ? null : (
          <>
            <dt>{dictionary.details.general.type}:</dt>
            <dd>
              {dctTypes.length ? (
                dctTypes
                  .map((type) => printLocaleValue(locale, typeof type === "string" ? type : type.prefLabel))
                  .join(", ")
              ) : (
                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
              )}
            </dd>
          </>
        )}
        <dt>
          <Hstack>
            {dictionary.details.general.metadataQuality.title}:
            <HelpText aria-label={dictionary.details.general.metadataQuality.helpTextTitle}>
              <div style={{ whiteSpace: "normal" }}>
                <Paragraph data-size="sm">{dictionary.details.general.metadataQuality.helpText}</Paragraph>
                <Paragraph data-size="sm">
                  <InternalLink
                    href="/nb/docs/metadata-quality"
                    profile={profile}
                    baseUri={baseUri}
                  >
                    {dictionary.details.general.metadataQuality.helpTextLink}
                  </InternalLink>
                </Paragraph>
              </div>
            </HelpText>
          </Hstack>
        </dt>
        <dd>
          <TagLink
            href={`/organizations/${dataset.publisher?.id}/datasets/${dataset.id}`}
            data-size="sm"
            data-color={metadataQuality.color as TagProps["color"]}
          >
            {metadataQuality.label}
          </TagLink>
        </dd>
        <dt>URI:</dt>
        <dd>
          <Hstack>
            <InputWithCopyButton
              value={dataset.uri}
              inputLabel="uri"
              copyLabel={dictionary.details.general.copyButton[0]}
              copiedLabel={dictionary.details.general.copyButton[1]}
            />
          </Hstack>
        </dd>
      </Dlist>
    </section>
  );
};

export default GeneralDetails;
