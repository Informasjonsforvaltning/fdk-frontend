import { getDataNorgePublicOrigin } from "@fdk-frontend/utils/data-norge-origin";
import { hostnameFromHeaderValue, isTransportportalHost } from "@fdk-frontend/utils/transportportal-host";

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

  if (!(isTransportportalHost(host) || devTransportportal) || !pathname.includes("/docs")) {
    return null;
  }

  const destination = new URL(`${pathname}${search}`, getDataNorgePublicOrigin());
  if (destination.hostname === host) return null;
  return destination;
};
