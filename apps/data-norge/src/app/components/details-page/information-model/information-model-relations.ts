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

export const getInformationModelRelations = (
  resource: InformationModel,
): InformationModelRelation[] => {
  const candidates: [InformationModelRelationTypeUri, string | undefined][] = [
    [INFORMATION_MODEL_RELATION_TYPE_URIS.replaces, resource.replaces],
    [INFORMATION_MODEL_RELATION_TYPE_URIS.isReplacedBy, resource.isReplacedBy],
    [INFORMATION_MODEL_RELATION_TYPE_URIS.isPartOf, resource.isPartOf],
    [INFORMATION_MODEL_RELATION_TYPE_URIS.hasPart, resource.hasPart],
  ];

  return candidates
    .filter((entry): entry is [InformationModelRelationTypeUri, string] => Boolean(entry[1]))
    .map(([type, source]) => ({ type, source }));
};

export const getInformationModelRelationUris = (resource: InformationModel): string[] =>
  getInformationModelRelations(resource).map((relation) => relation.source);
