import { getMediaTypeLabel } from "./index";

describe("getMediaTypeLabel", () => {
  it("shows the full title for structured syntax suffix types", () => {
    expect(getMediaTypeLabel({ code: "application/rdf+xml", name: "rdf+xml" })).toBe("rdf+xml");
    expect(getMediaTypeLabel({ code: "application/ld+json", name: "ld+json" })).toBe("ld+json");
  });

  it("shows the title for regular types", () => {
    expect(getMediaTypeLabel({ code: "application/json", name: "json" })).toBe("json");
    expect(getMediaTypeLabel({ code: "text/turtle", name: "turtle" })).toBe("turtle");
  });

  it("shows the title for vendor types", () => {
    expect(
      getMediaTypeLabel({
        code: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        name: "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
    ).toBe("vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  });

  it("falls back to extension, then code, when the title is missing", () => {
    expect(getMediaTypeLabel({ code: "application/rdf+xml" })).toBe("rdf");
    expect(getMediaTypeLabel({ code: "SOME_CODE" })).toBe("some_code");
  });

  it("lowercases file type names", () => {
    expect(getMediaTypeLabel({ code: "RDF_XML", name: "RDF/XML" })).toBe("rdf/xml");
  });
});
