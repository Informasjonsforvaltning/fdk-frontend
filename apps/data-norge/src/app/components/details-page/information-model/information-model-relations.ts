import { type InformationModel } from "@fellesdatakatalog/types";

export const INFORMATION_MODEL_RELATION_TYPE_URIS = {
  replaces: "http://purl.org/dc/terms/replaces",
  isReplacedBy: "http://purl.org/dc/terms/isReplacedBy",
  isPartOf: "http://purl.org/dc/terms/isPartOf",
  hasPart: "http://purl.org/dc/terms/hasPart",
} as const;

export type InformationModelRelationTypeUri =
  (typeof INFORMATION_MODEL_RELATION_TYPE_URIS)[keyof typeof INFORMATION_MODEL_RELATION_TYPE_URIS];

export type InformationModelRelation = {
  type: InformationModelRelationTypeUri;
  source: string;
};

const toUriList = (listField?: string[], singularField?: string): string[] => {
  if (listField && listField.length > 0) {
    return listField.filter(Boolean);
  }
  return singularField ? [singularField] : [];
};

/**
 * Collects ModellDCAT-AP-NO relations, preferring the list fields from fdk-types
 * 1.0.34+ and falling back to the deprecated singular URI fields.
 */
export const getInformationModelRelations = (
  resource: InformationModel,
): InformationModelRelation[] => {
  const byType: [InformationModelRelationTypeUri, string[]][] = [
    [
      INFORMATION_MODEL_RELATION_TYPE_URIS.replaces,
      toUriList(resource.replacesList, resource.replaces),
    ],
    [
      INFORMATION_MODEL_RELATION_TYPE_URIS.isReplacedBy,
      toUriList(resource.isReplacedByList, resource.isReplacedBy),
    ],
    [
      INFORMATION_MODEL_RELATION_TYPE_URIS.isPartOf,
      toUriList(resource.isPartOfList, resource.isPartOf),
    ],
    [
      INFORMATION_MODEL_RELATION_TYPE_URIS.hasPart,
      toUriList(resource.hasPartList, resource.hasPart),
    ],
  ];

  return byType.flatMap(([type, sources]) =>
    sources.map((source) => ({ type, source })),
  );
};

export const getInformationModelRelationUris = (resource: InformationModel): string[] =>
  [...new Set(getInformationModelRelations(resource).map((relation) => relation.source))];
