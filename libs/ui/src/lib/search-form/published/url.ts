export const LAST_X_DAYS_QUERY_PARAM = "lastXDays";

export const PUBLISHED_DAY_OPTIONS = [1, 7, 30] as const;

const parseDays = (value: string): number | undefined => {
  if (!/^\d+$/.test(value)) return undefined;
  const days = Number.parseInt(value, 10);
  return Number.isSafeInteger(days) && days > 0 ? days : undefined;
};

export const parseLastXDaysQueryParam = (value: string | null): string[] => {
  if (!value) return [];
  const days = parseDays(value.trim());
  return days === undefined ? [] : [String(days)];
};

export const lastXDaysKeysToQueryParam = (keys: string[]): string => {
  const days = keys.map(parseDays).find((d) => d !== undefined);
  return days === undefined ? "" : String(days);
};

export type LastXDaysSearchFilter = {
  lastXDays: {
    value: number;
  };
};

export const buildLastXDaysSearchFilter = (lastXDaysParam: string | null): LastXDaysSearchFilter | undefined => {
  const [days] = parseLastXDaysQueryParam(lastXDaysParam);
  if (days === undefined) return undefined;
  return { lastXDays: { value: Number(days) } };
};
