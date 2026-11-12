import { hostnameFromHeaderValue, isTransportportalHost } from "./transportportal-host";
import { getDataNorgePublicOrigin } from "./data-norge-origin";

describe("isTransportportalHost", () => {
  const originalHosts = process.env.TRANSPORTPORTAL_HOSTS;

  afterEach(() => {
    if (originalHosts === undefined) {
      delete process.env.TRANSPORTPORTAL_HOSTS;
    } else {
      process.env.TRANSPORTPORTAL_HOSTS = originalHosts;
    }
  });

  it("matches the default transportportal hosts", () => {
    delete process.env.TRANSPORTPORTAL_HOSTS;

    expect(isTransportportalHost("transportportal.no")).toBe(true);
    expect(isTransportportalHost("data.transportportal.no")).toBe(true);
    expect(isTransportportalHost("data.norge.no")).toBe(false);
  });

  it("matches a configured host, ignoring case and port", () => {
    process.env.TRANSPORTPORTAL_HOSTS = "nap.staging.fellesdatakatalog.digdir.no";

    expect(isTransportportalHost("NAP.staging.fellesdatakatalog.digdir.no:443")).toBe(true);
    expect(isTransportportalHost("staging.fellesdatakatalog.digdir.no")).toBe(false);
  });

  it("uses the first host in an X-Forwarded-Host chain", () => {
    delete process.env.TRANSPORTPORTAL_HOSTS;

    expect(hostnameFromHeaderValue("transportportal.no, internal.svc")).toBe("transportportal.no");
    expect(isTransportportalHost("transportportal.no, internal.svc")).toBe(true);
  });
});

describe("getDataNorgePublicOrigin", () => {
  const originalOrigin = process.env.DATA_NORGE_PUBLIC_ORIGIN;

  afterEach(() => {
    if (originalOrigin === undefined) {
      delete process.env.DATA_NORGE_PUBLIC_ORIGIN;
    } else {
      process.env.DATA_NORGE_PUBLIC_ORIGIN = originalOrigin;
    }
  });

  it("defaults to the production data.norge origin", () => {
    delete process.env.DATA_NORGE_PUBLIC_ORIGIN;

    expect(getDataNorgePublicOrigin()).toBe("https://data.norge.no");
  });

  it("returns a configured origin without a trailing slash", () => {
    process.env.DATA_NORGE_PUBLIC_ORIGIN = "https://staging.fellesdatakatalog.digdir.no/";

    expect(getDataNorgePublicOrigin()).toBe("https://staging.fellesdatakatalog.digdir.no");
  });

  it("falls back when the configured value is not an http(s) origin", () => {
    process.env.DATA_NORGE_PUBLIC_ORIGIN = "not a url";

    expect(getDataNorgePublicOrigin()).toBe("https://data.norge.no");
  });
});
