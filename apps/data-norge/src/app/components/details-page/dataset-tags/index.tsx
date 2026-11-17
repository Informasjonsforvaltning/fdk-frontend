import React from "react";
import { type Dataset, type LosTheme } from "@fellesdatakatalog/types";
import { printLocaleValue } from "@fdk-frontend/utils";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { TagList, TagLink } from "@fdk-frontend/ui";
import { Tag } from "@digdir/designsystemet-react";

type DatasetTagsProps = {
  locale: LocaleCodes;
  dataset: Dataset;
};

const datasetLosThemeHref = (locale: LocaleCodes, theme: LosTheme): string | undefined => {
  const paths = (theme.losPaths ?? []).filter((path) => path.length > 0);
  if (paths.length === 0) return undefined;

  return `/${locale}/search/datasets?losTheme=${paths.map((path) => encodeURIComponent(path)).join(",")}`;
};

const DatasetTags = ({ locale, dataset }: DatasetTagsProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <TagList>
      {dataset.theme?.map((theme: any) => (
        <TagLink
          key={theme.code}
          href={`/${locale}/search/datasets?dataTheme=${theme.code}`}
        >
          {printLocaleValue(locale, theme.title) || theme.code}
        </TagLink>
      ))}
      {dataset.losTheme?.map((theme) => {
        const href = datasetLosThemeHref(locale, theme);
        const label = printLocaleValue(locale, theme.name) || theme.code;

        if (!href) {
          return <Tag key={theme.uri}>{label}</Tag>;
        }

        return (
          <TagLink
            key={theme.uri}
            href={href}
          >
            {label}
          </TagLink>
        );
      })}
    </TagList>
  );
};

export default DatasetTags;
