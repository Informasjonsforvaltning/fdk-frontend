import { getDataNorgePublicOrigin } from "@fdk-frontend/utils/data-norge-origin";
import { hostnameFromHeaderValue, isTransportportalHost } from "@fdk-frontend/utils/transportportal-host";

/** Documentation articles. The search set `/{lang}/search/docs` is not one of them. */
const isSharedDocsPath = (pathname: string): boolean => {
  const segments = pathname.split("/").filter(Boolean);
  return segments.some((segment, index) => segment === "docs" && segments[index - 1] !== "search");
};

/**
 * Absolute URL on the public data.norge origin when this request is for shared docs
 * on a transportportal host. Null when the request should stay on the current host.
 */
export const sharedDocsRedirectUrl = (
  pathname: string,
  search: string,
  hostHeader: string | null,
  profileHeader: string | null,
): URL | null => {
  const host = hostnameFromHeaderValue(hostHeader);
  const devTransportportal = process.env.NODE_ENV !== "production" && profileHeader === "transportportal";

  if (!(isTransportportalHost(host) || devTransportportal) || !isSharedDocsPath(pathname)) {
    return null;
  }

  const destination = new URL(`${pathname}${search}`, getDataNorgePublicOrigin());
  if (destination.hostname === host) return null;
  return destination;
};
