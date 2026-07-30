// URL-validation helpers: block dangerous schemes (javascript:, data:, …) on link
// targets, and guard server-side fetches against SSRF to internal addresses.

/** Absolute http(s) URL, or null for other schemes / relative / malformed input. */
export const parseHttpUrl = (raw: string | undefined | null): URL | null => {
  if (!raw) {
    return null;
  }

  try {
    const url = new URL(raw);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
};

/**
 * True for loopback/private/link-local hosts a server-side fetch must not reach.
 * Literal-address check only — a public hostname resolving to a private IP (DNS
 * rebinding) is not covered; downstream egress controls remain the backstop.
 */
export const isPrivateHostname = (hostname: string): boolean => {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, ""); // strip IPv6 brackets

  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) {
    return true;
  }
  if (host === "::" || host === "::1" || host === "0.0.0.0") {
    return true;
  }
  // IPv4 loopback / private / link-local (incl. cloud metadata 169.254.169.254)
  if (/^127\./.test(host)) return true;
  if (/^10\./.test(host)) return true;
  if (/^192\.168\./.test(host)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return true;
  if (/^169\.254\./.test(host)) return true;
  // IPv6 unique-local (fc00::/7) and link-local (fe80::/10)
  if (/^f[cd][0-9a-f]{2}:/.test(host)) return true;
  if (/^fe80:/.test(host)) return true;

  return false;
};

/** True when safe for a server-side fetch: absolute http(s) to a non-internal host. */
export const isFetchableExternalUrl = (raw: string | undefined | null): boolean => {
  const url = parseHttpUrl(raw);
  return url !== null && !isPrivateHostname(url.hostname);
};
