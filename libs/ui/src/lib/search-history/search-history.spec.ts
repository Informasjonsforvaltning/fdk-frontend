import { rememberSearchUrl, searchHistorySuffix } from "./search-history";

describe("searchHistorySuffix", () => {
  it("keeps the set and the full query string", () => {
    expect(searchHistorySuffix("/nb/search/datasets", "q=kart&page=2&orgPath=%2FSTAT")).toBe(
      "/datasets?q=kart&page=2&orgPath=%2FSTAT",
    );
  });

  it("keeps a query on all-catalogs", () => {
    expect(searchHistorySuffix("/en/search", "?q=maps")).toBe("?q=maps");
  });

  it("ignores a bare search page", () => {
    expect(searchHistorySuffix("/nb/search", "")).toBeUndefined();
  });
});

describe("rememberSearchUrl", () => {
  it("ignores a suffix with no query", () => {
    const history = ["?q=kart"];
    expect(rememberSearchUrl(history, "   ")).toBe(history);
    expect(rememberSearchUrl(history, "/datasets")).toBe(history);
  });

  it("adds a new url at the front", () => {
    expect(rememberSearchUrl(["?q=kart"], "/datasets?q=vær")).toEqual(["/datasets?q=vær", "?q=kart"]);
  });

  it("replaces the older url for the same query", () => {
    expect(rememberSearchUrl(["?q=kart"], "/datasets?q=kart")).toEqual(["/datasets?q=kart"]);
  });

  it("moves a repeat to the front and keeps the latest spelling", () => {
    expect(rememberSearchUrl(["?q=Kart", "?q=vær"], "?q=kart")).toEqual(["?q=kart", "?q=vær"]);
  });

  it("leaves the list untouched when the newest entry is already the same spelling", () => {
    const history = ["?q=kart", "?q=vær"];
    expect(rememberSearchUrl(history, "?q=kart")).toBe(history);
  });

  it("keeps at most five urls and drops the oldest", () => {
    const history = ["?q=one", "?q=two", "?q=three", "?q=four", "?q=five"];
    expect(rememberSearchUrl(history, "?q=six")).toEqual(["?q=six", "?q=one", "?q=two", "?q=three", "?q=four"]);
  });
});
