import { legacySearchRedirectUrl } from "./legacy-search-params";

const redirect = (path: string): string | null => {
  const result = legacySearchRedirectUrl(new URL(path, "https://data.norge.no"));
  return result ? `${result.pathname}${decodeURIComponent(result.search)}` : null;
};

describe("legacySearchRedirectUrl", () => {
  it("returns null without legacy params", () => {
    expect(redirect("/nb/search/datasets?q=skole&dataTheme=EDUC")).toBeNull();
  });

  it("returns null for other pages", () => {
    expect(redirect("/nb/datasets/123?theme=EDUC")).toBeNull();
    expect(redirect("/about?theme=EDUC")).toBeNull();
  });

  it("moves portal search paths to the new search", () => {
    expect(redirect("/datasets?losTheme=naring")).toBe("/nb/search/datasets?losTheme=naring");
    expect(redirect("/search-all?q=skole")).toBe("/nb/search?q=skole");
    expect(redirect("/data-services")).toBe("/nb/search/data-services");
    expect(redirect("/concepts/")).toBe("/nb/search/concepts");
    expect(redirect("/information-models")).toBe("/nb/search/information-models");
    expect(redirect("/public-services-and-events")).toBe("/nb/search/services-and-events");
  });

  it("keeps the locale on locale-prefixed portal search paths", () => {
    expect(redirect("/en/datasets?q=skole")).toBe("/en/search/datasets?q=skole");
  });

  it("moves the path and maps legacy params in one redirect", () => {
    expect(redirect("/datasets?theme=EDUC&opendata=true")).toBe("/nb/search/datasets?dataTheme=EDUC&access=true");
  });

  it("maps theme to dataTheme and keeps other params", () => {
    expect(redirect("/nb/search/datasets?q=skole&theme=EDUC,GOVE&orgPath=/STAT&page=2")).toBe(
      "/nb/search/datasets?q=skole&orgPath=/STAT&page=2&dataTheme=EDUC,GOVE",
    );
  });

  it("merges theme into an existing dataTheme", () => {
    expect(redirect("/en/search?dataTheme=EDUC&theme=EDUC,GOVE")).toBe("/en/search?dataTheme=EDUC,GOVE");
  });

  it("maps opendata and accessrights to access", () => {
    expect(redirect("/nb/search/datasets?opendata=true&accessrights=PUBLIC,restricted")).toBe(
      "/nb/search/datasets?access=true,PUBLIC,RESTRICTED",
    );
  });

  it("drops opendata=false", () => {
    expect(redirect("/nb/search/datasets?opendata=false")).toBe("/nb/search/datasets");
  });

  it("maps sortfield FIRST_HARVESTED to sort", () => {
    expect(redirect("/nn/search/datasets?sortfield=FIRST_HARVESTED")).toBe(
      "/nn/search/datasets?sort=firstHarvestedDesc",
    );
  });

  it("drops unsupported sortfield values", () => {
    expect(redirect("/nb/search/datasets?sortfield=modified")).toBe("/nb/search/datasets");
  });

  it("does not override an existing sort", () => {
    expect(redirect("/nb/search?sort=firstHarvestedAsc&sortfield=FIRST_HARVESTED")).toBe(
      "/nb/search?sort=firstHarvestedAsc",
    );
  });

  it("matches legacy param names case-insensitively", () => {
    expect(redirect("/nb/search?Theme=EDUC&openData=TRUE")).toBe("/nb/search?dataTheme=EDUC&access=true");
  });
});
