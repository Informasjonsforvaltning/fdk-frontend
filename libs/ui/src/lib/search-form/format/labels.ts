const FILE_TYPE_PREFIX = "FILE_TYPE ";
const MEDIA_TYPE_PREFIX = "MEDIA_TYPE ";
const APPLICATION_PREFIX = "application/";

export const formatFileTypeLabel = (key: string): string => {
  if (key.startsWith(FILE_TYPE_PREFIX)) {
    return key.slice(FILE_TYPE_PREFIX.length);
  }
  return key;
};

export const formatMediaFormatLabel = (key: string): string => {
  if (!key.startsWith(MEDIA_TYPE_PREFIX)) return key;

  const mediaType = key.slice(MEDIA_TYPE_PREFIX.length);
  return mediaType.startsWith(APPLICATION_PREFIX) ? mediaType.slice(APPLICATION_PREFIX.length) : mediaType;
};

export const formatFileTypeCheckboxLabel = (key: string, count: number): string =>
  `${formatFileTypeLabel(key)} (${count})`;

export const formatMediaFormatCheckboxLabel = (key: string, count: number): string =>
  `${formatMediaFormatLabel(key)} (${count})`;
