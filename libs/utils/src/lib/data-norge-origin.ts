export const DEFAULT_DATA_NORGE_PUBLIC_ORIGIN = "https://data.norge.no";

/**
 * Public origin of the data.norge site for this environment.
 * Distinct from FDK_BASE_URI, which is the API base and can be the transportportal host.
 */
export const getDataNorgePublicOrigin = (): string => {
  const raw = process.env.DATA_NORGE_PUBLIC_ORIGIN?.trim().replace(/\/+$/, "");
  if (!raw) return DEFAULT_DATA_NORGE_PUBLIC_ORIGIN;

  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return DEFAULT_DATA_NORGE_PUBLIC_ORIGIN;
    return url.origin;
  } catch {
    return DEFAULT_DATA_NORGE_PUBLIC_ORIGIN;
  }
};
