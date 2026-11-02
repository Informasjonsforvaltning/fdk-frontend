import { getStandardLinks } from ".";

describe("getStandardLinks", () => {
  it("returns all seeAlso links", () => {
    expect(getStandardLinks({ uri: "https://a.no", seeAlso: ["https://a.no", "https://b.no"] })).toEqual([
      "https://a.no",
      "https://b.no",
    ]);
  });

  it("falls back to uri when seeAlso is missing", () => {
    expect(getStandardLinks({ uri: "https://a.no" })).toEqual(["https://a.no"]);
    expect(getStandardLinks({ uri: "https://a.no", seeAlso: [] })).toEqual(["https://a.no"]);
  });

  it("returns no links when the standard only has a title", () => {
    expect(getStandardLinks({ uri: null, seeAlso: null })).toEqual([]);
  });
});
