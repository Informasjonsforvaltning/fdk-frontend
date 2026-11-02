import { type ReactNode } from "react";
import { type ConformsTo } from "@fellesdatakatalog/types";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { ExternalLink, SmartList } from "@fdk-frontend/ui";
import { getStandardLinks, printLocaleValue } from "@fdk-frontend/utils";

type StandardItemProps = {
  standard: ConformsTo;
  locale: LocaleCodes;
  renderLink?: (url: string, label: string) => ReactNode;
};

const StandardItem = ({ standard, locale, renderLink }: StandardItemProps) => {
  const title = printLocaleValue(locale, standard.prefLabel);
  const links = getStandardLinks(standard);
  const link =
    renderLink ??
    ((url: string, label: string) => (
      <ExternalLink
        href={url}
        locale={locale}
        gateway
      >
        {label}
      </ExternalLink>
    ));

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
