import { sharedDocsRedirectUrl } from "./shared-docs-redirect";

describe("sharedDocsRedirectUrl", () => {
  const originalOrigin = process.env.DATA_NORGE_PUBLIC_ORIGIN;
  const originalHosts = process.env.TRANSPORTPORTAL_HOSTS;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    process.env.DATA_NORGE_PUBLIC_ORIGIN = "https://data.norge.no";
    process.env.TRANSPORTPORTAL_HOSTS = "transportportal.no,data.transportportal.no";
    process.env.NODE_ENV = "production";
  });

  afterEach(() => {
    if (originalOrigin === undefined) delete process.env.DATA_NORGE_PUBLIC_ORIGIN;
    else process.env.DATA_NORGE_PUBLIC_ORIGIN = originalOrigin;

    if (originalHosts === undefined) delete process.env.TRANSPORTPORTAL_HOSTS;
    else process.env.TRANSPORTPORTAL_HOSTS = originalHosts;

    process.env.NODE_ENV = originalNodeEnv;
  });

  it("redirects /docs on a transportportal host to the data.norge origin", () => {
    const destination = sharedDocsRedirectUrl(
      "/nb/docs/metadata-quality",
      "?source=help",
      "transportportal.no",
      null,
    );

    expect(destination?.toString()).toBe("https://data.norge.no/nb/docs/metadata-quality?source=help");
  });

  it("keeps om-transportportal on the transportportal host", () => {
    expect(sharedDocsRedirectUrl("/nb/om-transportportal", "", "transportportal.no", null)).toBeNull();
  });

  it("does not redirect /docs on the data.norge host", () => {
    expect(sharedDocsRedirectUrl("/nb/docs/metadata-quality", "", "data.norge.no", null)).toBeNull();
  });

  it("does not redirect when the public origin is the current host", () => {
    process.env.DATA_NORGE_PUBLIC_ORIGIN = "https://transportportal.no";

    expect(sharedDocsRedirectUrl("/nb/docs/metadata-quality", "", "transportportal.no", null)).toBeNull();
  });

  it("follows the local profile header outside production", () => {
    process.env.NODE_ENV = "development";

    const destination = sharedDocsRedirectUrl("/nb/docs/metadata-quality", "", "localhost:3000", "transportportal");

    expect(destination?.toString()).toBe("https://data.norge.no/nb/docs/metadata-quality");
  });

  it("ignores the local profile header in production", () => {
    expect(sharedDocsRedirectUrl("/docs/metadata-quality", "", "localhost", "transportportal")).toBeNull();
  });
});
