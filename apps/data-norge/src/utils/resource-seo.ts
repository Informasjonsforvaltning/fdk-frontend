import { type Metadata } from "next";

export type ResourceLanguageUrls = {
  nb: string;
  en: string;
  nn: string;
};

export type ResourceAlternatesOptions = {
  canonical: string;
  languages: ResourceLanguageUrls;
  isRemovedFromFDK?: boolean;
};

/**
 * Returns robots metadata for unpublished resources so search engines keep
 * direct links working but drop the page from the index.
 */
export const getResourceRobots = (isRemovedFromFDK?: boolean): Metadata["robots"] | undefined => {
  if (!isRemovedFromFDK) return undefined;
  return { index: false, follow: true };
};

/**
 * Builds alternates for resource detail pages. Self-canonical is always kept.
 * Hreflang is omitted for unpublished resources so they are not part of a hreflang cluster.
 */
export const getResourceAlternates = ({
  canonical,
  languages,
  isRemovedFromFDK,
}: ResourceAlternatesOptions): NonNullable<Metadata["alternates"]> => {
  if (isRemovedFromFDK) {
    return { canonical };
  }

  return {
    canonical,
    languages: {
      ...languages,
      "x-default": languages.nb,
    },
  };
};
