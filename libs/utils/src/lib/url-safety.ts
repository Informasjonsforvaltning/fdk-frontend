/**
 * Pure helpers for validating externally-supplied URLs. Used to block dangerous
 * schemes (javascript:, data:, …) on redirect/link targets and to guard server-side
 * fetches against SSRF to internal addresses.
 */

/**
 * Parse a string as an absolute URL using the http or https protocol.
 * Returns the parsed URL, or `null` for anything that is not an absolute http(s) URL
 * (relative paths, `javascript:`, `data:`, `mailto:`, malformed input, …).
 */
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
 * True if the hostname is a loopback, private, link-local or otherwise non-routable
 * address that a server-side fetch should not be allowed to reach (SSRF guard).
 *
 * Note: this is a literal-address check. It does not resolve DNS, so a public hostname
 * that resolves to a private IP (DNS rebinding) is not covered here — the downstream
 * service should apply its own egress controls as defence in depth.
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

/**
 * True if the value is safe for a server-side fetch: an absolute http(s) URL whose host
 * is not a private/internal address.
 */
export const isFetchableExternalUrl = (raw: string | undefined | null): boolean => {
  const url = parseHttpUrl(raw);
  return url !== null && !isPrivateHostname(url.hostname);
};
