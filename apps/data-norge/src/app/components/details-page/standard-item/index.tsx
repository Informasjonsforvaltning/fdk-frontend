import { type ReactNode } from "react";
import { type ConformsTo, type SearchObject } from "@fellesdatakatalog/types";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { type Profile } from "@fdk-frontend/types";
import { ExternalLink, InternalLink, SmartList } from "@fdk-frontend/ui";
import { getStandardLinks, printLocaleValue } from "@fdk-frontend/utils";

export type ResolvedInformationModels = {
  informationModels: SearchObject[];
  profile: Profile;
  baseUri: string;
};

type StandardItemProps = {
  standard: ConformsTo;
  locale: LocaleCodes;
  renderLink?: (url: string, label: string) => ReactNode;
  resolved?: ResolvedInformationModels;
};

const StandardItem = ({ standard, locale, renderLink, resolved }: StandardItemProps) => {
  const title = printLocaleValue(locale, standard.prefLabel);
  const links = getStandardLinks(standard);

  const defaultLink = (url: string, label: string) => {
    const informationModel = resolved?.informationModels.find((model) => model.uri === url);

    if (resolved && informationModel) {
      return (
        <InternalLink
          href={`/information-models/${informationModel.id}`}
          entity={informationModel}
          profile={resolved.profile}
          baseUri={resolved.baseUri}
          locale={locale}
        >
          {printLocaleValue(locale, informationModel.title) || label}
        </InternalLink>
      );
    }

    return (
      <ExternalLink
        href={url}
        locale={locale}
        gateway
      >
        {label}
      </ExternalLink>
    );
  };

  const link = renderLink ?? defaultLink;

  const [firstLink, ...otherLinks] = links;

  if (!firstLink) {
    return <span>{title}</span>;
  }

  if (!otherLinks.length) {
    return link(firstLink, title || firstLink);
  }

  return (
    <>
      {title && <div>{title}</div>}
      <SmartList
        items={links}
        renderItem={(url) => link(url, url)}
      />
    </>
  );
};

export default StandardItem;
