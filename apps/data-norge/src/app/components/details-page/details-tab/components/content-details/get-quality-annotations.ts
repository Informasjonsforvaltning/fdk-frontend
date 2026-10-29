import { type DatasetWithIdentifier } from "@fellesdatakatalog/types";
import { type LocaleCodes, type Localization } from "@fdk-frontend/localization";
import { printLocaleValue } from "@fdk-frontend/utils";

type QualityAnnotationItem = {
  body: DatasetWithIdentifier["qualityAnnotations"][number]["hasBody"];
  dimensions: string[];
};

type LegacyAnnotationField =
  | "hasAccuracyAnnotation"
  | "hasAvailabilityAnnotation"
  | "hasCompletenessAnnotation"
  | "hasCurrentnessAnnotation"
  | "hasRelevanceAnnotation";

type QualityLabelKey =
  | "accuracyAnnotation"
  | "availabilityAnnotation"
  | "completenessAnnotation"
  | "currentnessAnnotation"
  | "relevanceAnnotation";

/**
 * @deprecated Legacy field values will be missing dimension label, dictionary label is used as fallback.
 */
const legacyAnnotationFields: { field: LegacyAnnotationField; uri: string; labelKey: QualityLabelKey }[] = [
  {
    field: "hasAccuracyAnnotation",
    uri: "http://iso.org/25012/2008/dataquality/Accuracy",
    labelKey: "accuracyAnnotation",
  },
  {
    field: "hasAvailabilityAnnotation",
    uri: "http://iso.org/25012/2008/dataquality/Availability",
    labelKey: "availabilityAnnotation",
  },
  {
    field: "hasCompletenessAnnotation",
    uri: "http://iso.org/25012/2008/dataquality/Completeness",
    labelKey: "completenessAnnotation",
  },
  {
    field: "hasCurrentnessAnnotation",
    uri: "http://iso.org/25012/2008/dataquality/Currentness",
    labelKey: "currentnessAnnotation",
  },
  {
    field: "hasRelevanceAnnotation",
    uri: "http://iso.org/25012/2008/dataquality/Relevance",
    labelKey: "relevanceAnnotation",
  },
];

const getDimensionLabel = (
  dimension: DatasetWithIdentifier["qualityAnnotations"][number]["qualityDimensions"][number],
  locale: LocaleCodes,
  dictionary: Localization,
) => {
  const uriOrCode = dimension.uri ?? dimension.code;
  const legacyLabelKey = legacyAnnotationFields.find((legacy) => legacy.uri === uriOrCode)?.labelKey;
  const legacyLabel = legacyLabelKey ? dictionary.details.quality[legacyLabelKey] : undefined;
  return printLocaleValue(locale, dimension.prefLabel) || legacyLabel || uriOrCode;
};

const getLegacyQualityAnnotations = (
  dataset: DatasetWithIdentifier,
  dictionary: Localization,
): QualityAnnotationItem[] =>
  legacyAnnotationFields.flatMap(({ field, labelKey }) => {
    const body = dataset[field]?.hasBody;
    return body ? [{ body, dimensions: [dictionary.details.quality[labelKey]] }] : [];
  });

export const getQualityAnnotations = (
  dataset: DatasetWithIdentifier,
  locale: LocaleCodes,
  dictionary: Localization,
): QualityAnnotationItem[] => {
  const qualityAnnotations = (dataset.qualityAnnotations ?? []).filter((annotation) => annotation.hasBody);

  if (qualityAnnotations.length > 0) {
    return qualityAnnotations.map((annotation) => ({
      body: annotation.hasBody,
      dimensions: (annotation.qualityDimensions ?? [])
        .map((dimension) => getDimensionLabel(dimension, locale, dictionary))
        .filter((label): label is string => Boolean(label)),
    }));
  }

  return getLegacyQualityAnnotations(dataset, dictionary);
};
