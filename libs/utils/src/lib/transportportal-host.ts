const DEFAULT_TRANSPORTPORTAL_HOSTS = "data.transportportal.no,transportportal.no";

export const getTransportportalHosts = (): string[] =>
  (process.env.TRANSPORTPORTAL_HOSTS ?? DEFAULT_TRANSPORTPORTAL_HOSTS)
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

/** Hostname without port. Accepts a Host or X-Forwarded-Host value, including a comma-separated chain. */
export const hostnameFromHeaderValue = (value: string | null | undefined): string => {
  const first = value?.split(",")[0]?.trim() ?? "";
  return first.replace(/:\d+$/, "").toLowerCase();
};

export const isTransportportalHost = (host: string): boolean =>
  getTransportportalHosts().includes(hostnameFromHeaderValue(host));
