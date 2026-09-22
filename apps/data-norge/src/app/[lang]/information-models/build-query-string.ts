export type SearchParamsRecord = Record<string, string | string[] | undefined>;

export const buildQueryString = (searchParams: SearchParamsRecord): string => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, item);
      }
    } else {
      params.append(key, value);
    }
  }

  return params.toString();
};
