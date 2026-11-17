import { Tag, Paragraph, type TagProps } from "@digdir/designsystemet-react";
import { HelpText } from "@fellesdatakatalog/ui";
import { type LocaleCodes, getLocalization } from "@fdk-frontend/localization";

import { DCAT_PROFILE_HVD } from "../search-form/dcat-profile";
import { isHighValueDatasetType } from "../search-form/dataset-type";

type HighValueTagProps = {
  locale: LocaleCodes;
  nonInteractive?: boolean;
};

export const isHighValue = (
  dcatProfiles: string[] | undefined,
  datasetTypes: { uri?: string | null }[] | undefined,
): boolean =>
  (dcatProfiles?.includes(DCAT_PROFILE_HVD) ?? false) ||
  (datasetTypes?.some(({ uri }) => isHighValueDatasetType(uri)) ?? false);

const HighValueTag = ({ locale, nonInteractive, ...props }: HighValueTagProps & TagProps) => {
  const dictionary = getLocalization(locale).common.highValueTag;
  return (
    <Tag
      data-color="success"
      style={{ display: "inline-flex" }}
      {...props}
    >
      {dictionary.label}
      {!nonInteractive && (
        <>
          &nbsp;
          <HelpText aria-label={dictionary.helpTextTitle}>
            <Paragraph data-size="sm">{dictionary.helpText}</Paragraph>
          </HelpText>
        </>
      )}
    </Tag>
  );
};

export default HighValueTag;
