import React from "react";
import { type Dataset } from "@fellesdatakatalog/types";
import { printLocaleValue } from "@fdk-frontend/utils";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { TagList, TagLink } from "@fdk-frontend/ui";

type DatasetTagsProps = {
  locale: LocaleCodes;
  dataset: Dataset;
};

const DatasetTags = ({ locale, dataset }: DatasetTagsProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <TagList>
      {dataset.theme?.map((theme: any) => (
        <TagLink
          key={theme.code}
          href={`/datasets?theme=${theme.code}`}
        >
          {printLocaleValue(locale, theme.title) || theme.code}
        </TagLink>
      ))}
      {dataset.losTheme?.map((theme: any) => (
        <TagLink
          key={theme.code}
          href={`/datasets?losTheme=${theme.code}`}
        >
          {printLocaleValue(locale, theme.name) || theme.code}
        </TagLink>
      ))}
    </TagList>
  );
};

export default DatasetTags;
