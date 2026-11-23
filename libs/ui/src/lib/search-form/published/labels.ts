import { interpolate } from "@fdk-frontend/localization";

export type PublishedFilterDictionary = {
  today: string;
  last7Days: string;
  last30Days: string;
  lastXDays: string;
};

export const formatPublishedLabel = (key: string, dict: PublishedFilterDictionary): string => {
  switch (key) {
    case "1":
      return dict.today;
    case "7":
      return dict.last7Days;
    case "30":
      return dict.last30Days;
    default:
      return interpolate(dict.lastXDays, { count: key });
  }
};

export const getPublishedLabels = (keys: string[], dict: PublishedFilterDictionary): Record<string, string> =>
  Object.fromEntries(keys.map((key) => [key, formatPublishedLabel(key, dict)]));
