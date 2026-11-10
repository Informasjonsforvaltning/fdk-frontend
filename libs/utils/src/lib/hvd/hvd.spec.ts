import { HVD_REGULATION_URI, isHvdRegulated } from ".";

describe("isHvdRegulated", () => {
  it("is true when the HVD regulation is among the applicable legislation", () => {
    expect(isHvdRegulated([{ uri: "http://data.europa.eu/eli/reg/2016/679/oj" }, { uri: HVD_REGULATION_URI }])).toBe(
      true,
    );
  });

  it("is false for other legislation", () => {
    expect(isHvdRegulated([{ uri: "http://data.europa.eu/eli/reg/2016/679/oj" }, {}])).toBe(false);
  });

  it("is false when no legislation is given", () => {
    expect(isHvdRegulated(undefined)).toBe(false);
    expect(isHvdRegulated([])).toBe(false);
  });
});
