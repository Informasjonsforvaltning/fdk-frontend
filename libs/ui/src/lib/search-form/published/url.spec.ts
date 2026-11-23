import { buildLastXDaysSearchFilter, lastXDaysKeysToQueryParam, parseLastXDaysQueryParam } from "./url";

describe("lastXDays url helpers", () => {
  it("parses a positive integer", () => {
    expect(parseLastXDaysQueryParam("7")).toEqual(["7"]);
    expect(parseLastXDaysQueryParam(" 14 ")).toEqual(["14"]);
    expect(parseLastXDaysQueryParam("007")).toEqual(["7"]);
  });

  it("ignores missing or invalid values", () => {
    expect(parseLastXDaysQueryParam(null)).toEqual([]);
    expect(parseLastXDaysQueryParam("")).toEqual([]);
    expect(parseLastXDaysQueryParam("0")).toEqual([]);
    expect(parseLastXDaysQueryParam("-3")).toEqual([]);
    expect(parseLastXDaysQueryParam("1.5")).toEqual([]);
    expect(parseLastXDaysQueryParam("abc")).toEqual([]);
  });

  it("builds the search-service filter", () => {
    expect(buildLastXDaysSearchFilter("7")).toEqual({ lastXDays: { value: 7 } });
    expect(buildLastXDaysSearchFilter(null)).toBeUndefined();
    expect(buildLastXDaysSearchFilter("x")).toBeUndefined();
  });

  it("serializes keys to a query param", () => {
    expect(lastXDaysKeysToQueryParam(["30"])).toBe("30");
    expect(lastXDaysKeysToQueryParam([])).toBe("");
  });
});
